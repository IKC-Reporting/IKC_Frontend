import './globals.css';
import ApolloClientProvider from '../../app/apollo-client';
import { ReactNode } from "react";

export const metadata = {
  title: 'IKC - In-Kind Contribution Reporting',
  description: 'Webapp for submission of Inkind contributions for research projects',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ApolloClientProvider>
          {children}
        </ApolloClientProvider>
      </body>
    </html>
  );
}
