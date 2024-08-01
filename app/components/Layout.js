import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div style={layoutStyle}>
    <Header />
    <main style={contentStyle}>{children}</main>
    <Footer />
  </div>
);

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  overflow: "hidden",
};

const contentStyle = {
  flex: "1",
  overflowY: "auto", 
  padding: "20px",
};

export default Layout;
