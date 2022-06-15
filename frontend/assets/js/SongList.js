import React from 'react';


function SongList({song_catalog}) {
   // let song_catalog= await get_song_catalog();
   console.log("song_catalog passsed to SongList component", song_catalog);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Artist</th>
                        <th>Song Number</th>
                        <th>Song Name</th>
                        <th>Price (NEAR)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>songcatbody</td>
                    </tr>
               
                </tbody>
            </table>
        </div>   
    );
}
const songListStyle = {
    background: '#333',
    color: '#fff',
    padding: '10px'
}

export default SongList;