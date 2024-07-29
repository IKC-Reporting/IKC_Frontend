"use client";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const HOURLY_CONTRIBUTION = gql`
  query Query($contributionId: ID!) {
    contribution(id: $contributionId) {
      id
      contributorId
      date
      details
      hourContribution {
        hours
        hourlyRate
        benRatePer
      }
      otherContribution {
        itemName
        value
        items
      }
    }
  }
`;

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

export default function Add_Service() {

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
              <br />
              <input required type="text" />
            </label>
          </div>
          <br />
          <div>
            <label>Number of Hours(to the closest 0.25hrs):
              <br />
              <input required type="number" min="0.25" step="0.25" />
            </label>
          </div>
          <br />
          <div>
            <label>Hourly Rate($):
              <br />
              <input required type="number" min="0" />
            </label>
          </div>
          <br />
          <div>
            <label>Description(optional):
              <br />
              <input type="text" />
            </label>
          </div>
          <br /><br />
          <input className="button" type="Submit"></input>
        </form>
      </div>
    </div>
  )
}
