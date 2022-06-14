import React from 'react';


async function SongList({songList}) {
   // let song_catalog= await get_song_catalog();
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
                    
                </tbody>
            </table>
            <footer>
                {songList}
            </footer>
        </div>
        
    );
}
const songListStyle = {
    background: '#333',
    color: '#fff',
    padding: '10px'
}

export default SongList;