"use client";

import React from 'react'


const Org_Home = () => {
  return (
    <div>
        <p><a href="/org">Organizations</a></p>
      <div className="container">
        <p>Place Holder Organization Home</p>
        <button className="button" onClick={() => window.location.href = "/org_options"}>Organization Options</button>
        <br />
        <button className="button" onClick={() => window.location.href = "/project_home"}>View all Projects</button>
        <br />
        <button className="buttonback" onClick={() => window.location.href = "/org"}>View All Organizations</button>
      </div>
    </div>
  );
};

export default Org_Home;
