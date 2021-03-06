import React, {useState} from 'react';
import Notification from './Notification.js';

function AddSong ({addSongInfo}) {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [song, setSong] = useState();
    const [songInfo, setSongInfo] = useState(undefined);
    const [showNotification, setShowNotification] = useState(false);
    //const[songCatalog, setSongCatalog] = useState(undefined);

    const submit = async event => {
      event.preventDefault()
            // get elements from the form using their id attribute
            const { fieldset, song } = event.target.elements
            // hold onto new user-entered value from React's SynthenticEvent for use after `await` call
            // disable the form while the value gets updated on-chain
            fieldset.disabled = true
            await addSongInfo(songInfo)
           {/*  
             finally {}
             */}
              // re-enable the form, whether the call succeeded or failed
              fieldset.disabled = false;
              document.getElementById("songname").value = "";
              document.getElementById("price").value = "";

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
{/*        {songCatalog} */}
        <form onSubmit={(e) => submit(e)}>
            <fieldset id="fieldset">
            Musicians, input your song for sale
            <p></p>
              <div style={{ display: 'flex' }}>
              <label
                htmlFor="songname"
                style={{
                  display: 'block',
                  color: 'white',
                  marginBottom: '0.5em'
                }}
              >Song Name: </label>
                <input
                  autoComplete="off"
                  defaultValue=""
                  id="songname"
                  onChange={e => updateSongInfo(e, 'songname')}
                  style={{ flex: 1, backgroundColor: '#88AA88' }}
                />
              <label htmlFor="price">Price: </label>
                <input
                  autoComplete="off"
                  defaultValue=""
                  id="price"
                  type="text"
                  onChange={e => updateSongInfo(e, 'price')}
                  style={{ flex: 1, backgroundColor: '#88AA88' }}
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
        
export default AddSong;