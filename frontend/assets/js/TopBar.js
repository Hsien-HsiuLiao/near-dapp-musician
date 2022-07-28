import React from 'react';

function TopBar({balance, logout}) {
    return (
        <div style={barstyle}>
            <div>wallet balance: {balance} (NEAR)
            <button className="link" style={{ float: 'right' }} onClick={logout}>
                Sign out
            </button>
            </div>
        </div>
    );
}
const barstyle = {
    color: '#fff',
    textAlign: 'left',
    padding: '10px'
}

export default TopBar;