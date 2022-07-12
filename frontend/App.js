import 'regenerator-runtime/runtime'
import React, {useState, useCallback, useEffect} from 'react'

import './assets/css/global.css'

import {login, logout, add_song_info, get_song_catalog, accountBalance} from './assets/js/near/utils';
//import getConfig from './assets/js/near/config'
import Header from './assets/js/Header.js';
import SongList from './assets/js/SongList.js';
import AddSong from './assets/js/AddSong';

export default function App() {
  const[songCatalog, setSongCatalog] = useState([]);
  const [balance, setBalance] = useState("0");

  //@ts-ignore
  const getBalance = useCallback(async () => {
    if ( window.walletConnection.account().accountId){
      setBalance(await accountBalance());   
    }
  });

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  React.useEffect(
    () => {
      const init = async () => {
        try {
        let song_catalog = await get_song_catalog(window.accountId);
        setSongCatalog(song_catalog);
        } catch (e) {
          console.log(e)
        }
      };
      init()
    },

    []
  )

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <h1>
          Welcome to NEAR!
        </h1>
        <p>
         Please sign in using the NEAR Wallet. Click the Sign In button below.
        </p>
        <p>
        This app runs in the test network ("testnet").
        </p>
        <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
          <button onClick={login}>Sign in</button>
        </p>
      </main>
    )
  }

  const addSongInfo = async (songInfo) => {
    const newSong = songname.value
            const parsedPrice = parseFloat(songInfo.price)
            try {
              // make an update call to the smart contract
              await add_song_info(songInfo.songname, parsedPrice)
            } catch (e) {
              alert(
                'Something went wrong! ' +
                'Maybe you need to sign out and back in? ' +
                'Check your browser console for more info.'
              )
              throw e
            }       
            let song_catalog = await get_song_catalog(window.accountId);
            setSongCatalog(song_catalog);
  }

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <div>wallet balance: {balance} (NEAR)</div>
      <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
      
      <main>
        <Header />
        <SongList song_catalog={songCatalog}/>
        <AddSong add_song_info={add_song_info} get_song_catalog={get_song_catalog} addSongInfo={addSongInfo}/>
        <hr />
        <p>
          <a target="_blank" rel="noreferrer" href="https://docs.near.org">NEAR docs</a>
        </p>
      </main>
      {/* 
      {showNotification && <Notification />}
      */}
    </>
  )
}


