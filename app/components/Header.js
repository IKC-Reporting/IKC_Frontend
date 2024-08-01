import React from 'react';
import Link from 'next/link';

const Header = () => (
    <header style={headerStyle}>
        <Link href="/org">org home</Link>
    </header>
);

const headerStyle = {
    backgroundColor: '#f8f8f8',
    padding: '20px',
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: 'bold'
};

export default Header;
