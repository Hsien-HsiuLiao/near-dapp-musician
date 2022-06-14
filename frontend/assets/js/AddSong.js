import React, {useState} from 'react';
//import { add_song } from './near/utils';
import getConfig from './near/config';

function AddSong ({add_song_info}) {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [song, setSong] = useState();
    const [songInfo, setSongInfo] = useState(undefined);
    const [showNotification, setShowNotification] = useState(false);

    const submit = async event => {
      event.preventDefault()
  
            // get elements from the form using their id attribute
            //const { fieldset, greeting } = event.target.elements
            const { fieldset, song } = event.target.elements
  
            // hold onto new user-entered value from React's SynthenticEvent for use after `await` call
            //const newGreeting = greeting.value
            const newSong = songname.value
            const parsedPrice = parseFloat(songInfo.price)
  
            // disable the form while the value gets updated on-chain
            fieldset.disabled = true
  
            try {
              // make an update call to the smart contract
              // pass the value that the user entered in the greeting field
              //await set_greeting(newGreeting)
              await add_song_info(songInfo.songname, parsedPrice)
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
    }

    const updateSongInfo = (e, field) => {
      setButtonDisabled(false);
      const value = e.target.value;
      setSongInfo({...songInfo, [field]: value});
    }

    return (
        <>
        <form onSubmit={(e) => submit(e)}>
{/*
            what is fieldset? allows disabling of form by calling fieldset.disabled

            htmlFor? 
                              
                  onChange= e => setButtonDisabled(e.target.value === "gre")
              
        */}
            <fieldset id="fieldset">
              <label
                htmlFor="songname"
                style={{
                  display: 'block',
                  color: 'var(--gray)',
                  marginBottom: '0.5em'
                }}
              >Enter song for sale</label>
              <div style={{ display: 'flex' }}>
                <input
                  autoComplete="off"
                  defaultValue="enter song info here"
                  id="songname"
                  onChange={e => updateSongInfo(e, 'songname')}
                  style={{ flex: 1 }}
                />
              <label htmlFor="price">Price</label>
                <input
                  autoComplete="off"
                  id="price"
                  type="text"
                  onChange={e => updateSongInfo(e, 'price')}
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