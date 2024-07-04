import React from 'react'

const Add_Service = () => {
  return (
    <div>
      <div>
        <p><a href="/org">Organizations</a> {"<"} <a href="/org_home">Organization Home</a> {"<"} <a href="/project_home">Project Home</a> {"<"} <a href="/project_options">Project Options</a> {"<"} <a href="/add_contribution">Add Contribution</a></p>
      </div>
      <div>
        <h1>Contribute A Service</h1>
        <form action='/thanks_page'>
          <div>
            <label>Service: 
              <input required type="text"/>
            </label>
          </div>
          <br/>
          <div>
            <label>Number of Hours(to the closest 0.25hrs): 
              <input required type="number" min="1"/>
            </label>
          </div>
          <br/>
          <div>
            <label>Description(optional): 
              <input type="text"/>
            </label>
          </div>
          <br/><br/>
          <input type="Submit"></input>
        </form>
      </div>
    </div>
  )
}

export default Add_Service