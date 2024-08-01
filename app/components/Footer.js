import React from "react";

const Footer = () => (
  <footer style={footerStyle}>{new Date().toLocaleDateString()}</footer>
);

const footerStyle = {
  backgroundColor: "#e0e0e0",
  padding: "0px",
  textAlign: "center",
  width: "100%",
};

export default Footer;
