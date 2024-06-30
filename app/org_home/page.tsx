"use client";

import React from 'react'


const Org_Home = () => {
  return (
    <div className="container">
      <p>Organization Home</p>
      <button className="button" onClick={() => window.location.href = "/org_options"}>Organization Options</button>
      <br />
      <button className="button" onClick={() => window.location.href = "/project_home"}>View all Projects</button>
      <br />
      <button className="button" onClick={() => window.location.href = "/org"}>View All Organizations</button>
    </div>
  );
};

export default Org_Home;
