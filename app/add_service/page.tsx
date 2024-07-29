"use client";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const HOURLY_CONTRIBUTION = gql`
  mutation Mutation(
    $contributorId: ID!,
    $date: DateTime!,
    $details: String!,
    $hours: Float!
    ) 
    {
    createHourContribution(
      contributorId: $contributorId,
      date: $date,
      details: $details,
      hours: $hours
    )
}
`;


export default function Add_Service() {

  const [hours, setHours] = useState(0);
  const [details, setDetails] = useState("");
  const [createHourContribution, { loading, error, data }] = useMutation(HOURLY_CONTRIBUTION);
  const contributorId = "fee9a62e-b403-4162-8e43-deb6b879ac9";

  const router = useRouter()

  return (
    <div>
      <div>
        <p><a href="/org">Organizations</a> {"<"} <a href="/org_home">Organization Home</a> {"<"} <a href="/project_home">Project Home</a> {"<"} <a href="/project_options">Project Options</a> {"<"} <a href="/add_contribution">Add Contribution</a></p>
      </div>
      <div>
        <h1>Contribute A Service</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            createHourContribution({ variables: { contributorId, hours, details, date: new Date().toLocaleString() } });
            router.push('/thanks_page', { scroll: false })
          }}>
          <div>
            <label>Number of Hours(to the closest 0.25hrs):
              <br />
              <input
                required type="number"
                min="0.25"
                step="0.25"
                value={hours}
                onChange={(e) => setHours(parseFloat(e.target.value))}
              />
            </label>
          </div>
          <div>
            <label>Description(optional):
              <br />
              <input
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </label>
          </div>
          <br /><br />
          <input className="button" type="Submit"></input>
        </form>
      </div>
    </div>
  )
}
