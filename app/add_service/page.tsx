"use client";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
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
  const [contributorId, setContributorId] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [createHourContribution, { loading, error, data }] = useMutation(HOURLY_CONTRIBUTION);
  const router = useRouter();

  useEffect(() => {
    const storedContributorId = localStorage.getItem("contributorId");
    const storedProjectId = localStorage.getItem("projectId");
    setContributorId(storedContributorId);
    setProjectId(storedProjectId);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contributorId && projectId) {
      createHourContribution({
        variables: {
          contributorId,
          date: new Date().toISOString(),
          details,
          hours
        }
      });
      router.push('/thanks_page', { scroll: false });
    } else {
      console.error("Contributor ID or Project ID not found in local storage.");
    }
  };

  const printLocalStorage = () => {
    const keys = Object.keys(localStorage);
    const data = keys.map(key => `${key}: ${localStorage.getItem(key)}`).join(", ");
    return data;
  };

  return (
    <div>
      <div>
        <p><a href="/org">Organizations</a> {"<"} <a href="/org_home">Organization Home</a> {"<"} <a href="/project_home">Project Home</a> {"<"} <a href="/project_options">Project Options</a> {"<"} <a href="/add_contribution">Add Contribution</a></p>
      </div>
      <div>
        <h1>Contribute A Service</h1>
        <form onSubmit={handleSubmit}>
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
      <div className="localStorageData">
        <h2>LocalStorage Data:</h2>
        <p>{printLocalStorage()}</p>
      </div>
    </div>
  );
}
