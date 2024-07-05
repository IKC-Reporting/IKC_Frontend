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

const Add_Item = () => {

  const [currentDate] = useState(getDate());

  return (
    <div>
      <div>
        <p><a href="/org">Organizations</a> {"<"} <a href="/org_home">Organization Home</a> {"<"} <a href="/project_home">Project Home</a> {"<"} <a href="/project_options">Project Options</a> {"<"} <a href="/add_contribution">Add Contribution</a></p>
      </div>
      <div>
        <h1>Contribute An Item</h1>
        <form action='/thanks_page'>
          <div>
            <label>Item: 
              <input required type="text"/>
            </label>
          </div>
          <br/>
          <div>
            <label>Quantity: 
              <input required type="number" min="1"/>
            </label>
          </div>
          <br/>
          <div>
          <label>Value per piece(CAD): 
            <input required type="number" min="0" step="0.01"/>
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

export default Add_Item