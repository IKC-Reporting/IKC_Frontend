import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
    <div>
        <Header />
        <div style={contentStyle}>
            {children}
        </div>
        <Footer />
    </div>
);

const contentStyle = {
    padding: '20px'
};

export default Layout;
