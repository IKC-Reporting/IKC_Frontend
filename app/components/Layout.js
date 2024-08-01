import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div style={layoutStyle}>
    <Header />
    <div className="wrapper">
      <main style={contentStyle}>{children}</main>
    </div>
    <Footer />
  </div>
);

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

const contentStyle = {
  flex: 1,
  padding: "20px",
  overflowY: "auto",
};

export default Layout;
