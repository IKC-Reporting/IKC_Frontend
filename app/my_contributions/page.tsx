"use client";
import React from 'react'

const fakeContributions = [
  {name: "service1", quantity: "1.5", cost: "0", type: "service"},
  {name: "item1", quantity: "2", cost: "2500", type: "item"},
  {name: "service2", quantity: "2.0", cost: "0", type: "service"}
]
const my_contributions = () => {
  return (
    <div>
      <div>
        <p><a href="/org">Organizations</a> {"<"} <a href="/org_home">Organization Home</a> {"<"} <a href="/project_home">Project Home</a> {"<"} <a href="/project_options">Project Options</a></p>
      </div>
      <h1>My Contributions</h1>
      <div>
        <table style={{border: "2px solid forestgreen", width: "800px", height: "200px"}}>
          <tr>
            <th style={{borderBottom: "1px solid black"}}>Name</th>
            <th style={{borderBottom: "1px solid black"}}>Hours/Quantity</th>
            <th style={{borderBottom: "1px solid black"}}>Cost</th>
            <th style={{borderBottom: "1px solid black"}}>Value</th>
            <th style={{borderBottom: "1px solid black"}}>Type</th>
          </tr>
          {fakeContributions.map((val, key)=>{
            let value = parseFloat(val.quantity) * parseFloat(val.cost);
            if(val.type == "Service"){
              return (
                <tr key={key}>
                  <td style={{textAlign: "center"}}>{val.name}</td>
                  <td style={{textAlign: "center"}}>{val.quantity}</td>
                  <td style={{textAlign: "center"}}>{val.cost}</td>
                  <td style={{textAlign: "center"}}>{value}</td>
                  <td style={{textAlign: "center"}}>{val.type}</td>
                </tr>
              )
            }else{
              return (
                <tr key={key}>
                  <td style={{textAlign: "center"}}>{val.name}</td>
                  <td style={{textAlign: "center"}}>{val.quantity} hrs</td>
                  <td style={{textAlign: "center"}}>{val.cost}</td>
                  <td style={{textAlign: "center"}}>{value}</td>
                  <td style={{textAlign: "center"}}>{val.type}</td>
                </tr>
              )
            }
          })}
        </table>
      </div>
    </div>
  )
}


export default my_contributions