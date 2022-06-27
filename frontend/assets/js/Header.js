import React from 'react';

function Header() {
    return (
        <header style={headerstyle}>
           <h1>
          Hello, 
          {' '/* React trims whitespace around tags; insert literal space character when needed */}
          {window.accountId}!
        </h1>
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