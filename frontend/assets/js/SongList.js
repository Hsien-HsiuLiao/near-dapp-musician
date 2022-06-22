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
                     {/*    <th>Song Number</th> */}
                        <th>Song Name</th>
                        <th>Price (NEAR)</th>
                    </tr>
                </thead>
                <tbody>
                    {song_catalog.map(catalog => (
                        <tr>
                            <td>{catalog[0]}</td>
                            <td>{catalog[1].songs.map(songinfo =>(
                                <tr>
                                {songinfo.song_name}
                                </tr>
                            ))}</td>
                            <td>{catalog[1].songs.map(songinfo => (
                                <tr>{songinfo.price}</tr>
                            ))}</td>
                            <td>{catalog[1].songs.map(songinfo => (
                                <tr><button>Buy</button></tr>
                                
                            ))}</td>
                            <td>{catalog[1].songs.map(songinfo => (
                                <tr>{window.accountId == catalog[0] && <button>delete</button>}</tr>
                            ))}</td>
                            {/* 
                            delete button only for song owner
                            {
                                window.accountId == catalog[0]
                                &&<button>delete</button>
                            }
                            catalog[0] = accountId (key)
                            catalog[1] = songList   (value)
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