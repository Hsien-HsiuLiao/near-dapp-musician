import React from 'react';
import { add_song } from './near/utils';
import getConfig from './near/config';

function AddSong () {
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [song, setSong] = React.useState();
    const [showNotification, setShowNotification] = React.useState(false);



    return (
        <>
        <form onSubmit={async event => {
            event.preventDefault()
  
            // get elements from the form using their id attribute
            //const { fieldset, greeting } = event.target.elements
            const { fieldset, song } = event.target.elements
  
  
            // hold onto new user-entered value from React's SynthenticEvent for use after `await` call
            //const newGreeting = greeting.value
            const newSong = song.value
  
            // disable the form while the value gets updated on-chain
            fieldset.disabled = true
  
            try {
              // make an update call to the smart contract
              // pass the value that the user entered in the greeting field
              //await set_greeting(newGreeting)
              await add_song(newSong)
            } catch (e) {
              alert(
                'Something went wrong! ' +
                'Maybe you need to sign out and back in? ' +
                'Check your browser console for more info.'
              )
              throw e
            } finally {
              // re-enable the form, whether the call succeeded or failed
              fieldset.disabled = false
            }
  
            // update local `greeting` variable to match persisted value
            //setGreeting(newGreeting)
            setSong(newSong)
  
            // show Notification
            setShowNotification(true)
  
            // remove Notification again after css animation completes
            // this allows it to be shown again next time the form is submitted
            setTimeout(() => {
              setShowNotification(false)
            }, 11000)
          }}>
            <fieldset id="fieldset">
              <label
                htmlFor="greeting"
                style={{
                  display: 'block',
                  color: 'var(--gray)',
                  marginBottom: '0.5em'
                }}
              >
                Enter song for sale
              </label>
              <div style={{ display: 'flex' }}>
                <input
                  autoComplete="off"
                  defaultValue="enter song name here"
                  id="song"
                  onChange={e => setButtonDisabled(e.target.value === "greeting")}
                  style={{ flex: 1 }}
                />
                <button
                  disabled={buttonDisabled}
                  style={{ borderRadius: '0 5px 5px 0' }}
                >
                  Submit
                </button>
              </div>
            </fieldset>
          </form>
            {showNotification && <Notification />}
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
        
export default AddSong;