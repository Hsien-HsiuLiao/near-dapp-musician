import React from 'react';


function SongList({song_catalog}) {
   // let song_catalog= await get_song_catalog();
   console.log("song_catalog passsed to SongList component", song_catalog);
   //console.log(song_catalog[0][1].songs[0].song_name);
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
                    {song_catalog.map(catalog => (
                        <tr>
                            <td>{catalog[0]}</td>
                            {catalog[1].songs.map(songinfo =>(
                                <tr>
                                <td>{songinfo.song_name}</td>
                                <td>{songinfo.price}</td>
                                </tr>
                            ))}
                            {/* 
                            <td>{catalog[1].songs[0].song_name}</td>
                            <td>{catalog[1].songs[0].price}</td>
                            */}
                        </tr>
                    ))}
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