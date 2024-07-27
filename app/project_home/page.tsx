"use client";
import React from 'react'

const Project_Home = () => {
  return (
    <div>
      <div>
        <p><a href="/org">Organizations</a> {"<"} <a href="/org_home">Organization Home</a></p>
      </div>
      <div className="container">
        <h1>Select a Project</h1>
        <a href="/project_options">
        <button className="button">Project A</button>
        </a>
      </div>
      <br />
    </div>
  )
}

const titleStyle = {
  textAlign: 'Center',
  fontSize: '18px',
  fontWeight: 'bold'
};

export default Project_Home