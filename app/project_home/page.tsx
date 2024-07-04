import React from 'react'

const Project_Home = () => {
  return (
    <div>
      <div>
        <p><a href="/org">Organizations</a></p>
      </div>
      <div style={titleStyle}>
        <h1>Select a Project</h1>
      </div>
      <a href="/project_options">
        <button type="button">Project A</button>
      </a>
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