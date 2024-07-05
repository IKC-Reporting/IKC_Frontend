"use client";
import React from 'react'

const Submit_Contribution = () => {
  return (
    <div>
      <div>
        <p><a href="/org">Organizations</a> {"<"} <a href="/org_home">Organization Home</a> {"<"} <a href="/project_home">Project Home</a> {"<"} <a href="/project_options">Project Options</a></p>
      </div>
      <div className="container">
        <h1>Submit Contribution</h1>
        <a href="/add_item"><button className="button">Add A Item</button></a>
        <br/><br/>
        <a href="/add_service"><button className="button">Add A Service</button></a>
        </div>
    </div>
  )
}

export default Submit_Contribution