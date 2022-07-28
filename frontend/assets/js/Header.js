import React from 'react';
import SongsPurchased from './SongsPurchased';

function Header() {
    return (
        <header style={headerstyle}>
            <h1>
                Hello,
                {' '/* React trims whitespace around tags; insert literal space character when needed */}
                {window.accountId}!
            </h1>
            <SongsPurchased />
        </header>

    );
}
const headerstyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'left',
    padding: '10px'
}

export default Header;