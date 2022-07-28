import 'regenerator-runtime/runtime'
import React, { useState, useCallback, useEffect } from 'react'

import './assets/css/global.css'

import { login, logout, add_song_info, get_song_catalog, accountBalance } from './assets/js/near/utils';
import Header from './assets/js/Header.js';
import SongList from './assets/js/SongList.js';
import AddSong from './assets/js/AddSong';
import TopBar from './assets/js/TopBar';

export default function App() {
  const [songCatalog, setSongCatalog] = useState([]);
  const [balance, setBalance] = useState("0");

  //@ts-ignore
  const getBalance = useCallback(async () => {
    if (window.walletConnection.account().accountId) {
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
      <TopBar balance={balance} logout={logout}/>
      <main>
        
        <Header />
        <AddSong add_song_info={add_song_info} get_song_catalog={get_song_catalog} addSongInfo={addSongInfo} />
        <hr />
        <SongList song_catalog={songCatalog} />
      </main>
    </>
  )
}


