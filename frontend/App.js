import 'regenerator-runtime/runtime'
import React from 'react'

import './assets/css/global.css'

import {login, logout, get_greeting, set_greeting, add_song} from './assets/js/near/utils'
import getConfig from './assets/js/near/config'
import Header from './assets/js/Header.js';
import SongList from './assets/js/SongList.js';
import AddSong from './assets/js/AddSong';


export default function App() {
  // use React Hooks to store greeting in component state
  const [greeting, setGreeting] = React.useState()
  //use React Hooks to store song in component state
//  const [song, setSong] = React.useState()

  // when the user has not yet interacted with the form, disable the button
  //const [buttonDisabled, setButtonDisabled] = React.useState(true)

  // after submitting the form, we want to show Notification
  //const [showNotification, setShowNotification] = React.useState(false)

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  React.useEffect(
    () => {
      // get_greeting is in near/utils.js
  /*
      get_greeting()
        .then(greetingFromContract => {
          setGreeting(greetingFromContract)
        })
        lsndlsnvdsl
  */
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  )

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <h1>
          <label
            htmlFor="greeting"
            style={{
              color: 'var(--secondary)',
              borderBottom: '2px solid var(--secondary)'
            }}
          >
            {greeting}
          </label>!
          Welcome to NEAR!
        </h1>
        <p>
         Please sign in using the NEAR Wallet. Click the button below.
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

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
      
      <main>
      <Header greeting={greeting} />
      <SongList />
        
        <div>
      {/* 
          song name: {song}
      */}
        </div>
      <AddSong add_song={add_song}/>
      
        
        
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

// this component gets rendered by App after the form is submitted
function Notification() {
  const { networkId } = getConfig(process.env.NODE_ENV || 'development')
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`

  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags; insert literal space character when needed */}
      called method in contract:
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}
