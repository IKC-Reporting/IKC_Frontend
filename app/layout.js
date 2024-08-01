import React from 'react';
import Layout from './components/Layout';
import './globals.css';
import ApolloClientProvider from './apollo-client';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ApolloClientProvider>
                    <div id="root">
                        <Layout>
                            {children}
                        </Layout>
                    </div>
                </ApolloClientProvider>
            </body>
        </html>
    );
}
