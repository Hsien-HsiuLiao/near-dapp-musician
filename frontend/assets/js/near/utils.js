import { connect, Contract, keyStores, WalletConnection } from 'near-api-js';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import getConfig from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['get_song_catalog'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['add_song_info', 'buy_song'],
  })
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

export async function add_song_info(songname, price) {
  let response = await window.contract.add_song_info({
    args:{song_name: songname, price}
  })
  return response
}

export async function get_song_catalog(account_id){
  let song_catalog = await window.contract.get_song_catalog({
    account_id: account_id
  });
  return song_catalog
}

export async function accountBalance() {
  return formatNearAmount(
    //@ts-ignore
    (await window.walletConnection.account().getAccountBalance()).total,
    6
  );
}

export async function buy_song(account_id, songname, price) {
  //let yoctoNEAR = 100000000000000000000000;
  let response = await window.contract.buy_song({
    artist: account_id, song_name: songname, price
  }, "300000000000000", // attached GAS
  parseNearAmount(price.toString()) // attached deposit in yoctoNEAR
  )
  return response
}