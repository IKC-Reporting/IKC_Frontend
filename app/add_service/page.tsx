"use client";
import React, {useState} from 'react'

function getDate()
{
  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

const Add_Service = () => {

  const [currentDate] = useState(getDate());

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
              <br/>
              <input required type="text"/>
            </label>
          </div>
          <br/>
          <div>
            <label>Number of Hours(to the closest 0.25hrs):
              <br/>
              <input required type="number" min="1"/>
            </label>
          </div>
          <br/>
          <div>
            <label>Description(optional):
              <br/>
              <input type="text"/>
            </label>
          </div>
          <br/><br/>
          <input className="button" type="Submit"></input>
        </form>
      </div>
    </div>
  )
}

export default Add_Service