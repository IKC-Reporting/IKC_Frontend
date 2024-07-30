"use client";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Contribution } from "../../utils/graphql";

const GET_ALL_CONTRIBUTIONS = gql`
  query Query($contributorId: ID!) {
    getAllContributionsForContributor(contributorId: $contributorId) {
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

export default function MyContributions() {
  const [contributorId, setContributorId] = useState<string | null>(null);

  useEffect(() => {
    const storedContributorId = localStorage.getItem("contributorId");
    console.log("Retrieved contributorId:", storedContributorId); // Debugging log
    if (storedContributorId) {
      setContributorId(storedContributorId);
    } else {
      console.error("No contributor ID found in localStorage");
      // Redirect or handle the missing contributor ID case appropriately
    }
  }, []);

  const { loading, error, data } = useQuery(GET_ALL_CONTRIBUTIONS, {
    variables: { contributorId: "fee9a62e-b403-4162-8e43-deb6b879ac9" },
  }); 

  const printLocalStorage = () => {
    const keys = Object.keys(localStorage);
    const data = keys.map(key => `${key}: ${localStorage.getItem(key)}`).join(", ");
    return data;
  };

  useEffect(() => {
    console.log("LocalStorage Data:", printLocalStorage());
  }, []);

  console.log(data?.getAllContributionsForContributor);

  return (
    <div>
      <div>
        <p>
          <a href="/org">Organizations</a> {"<"}{" "}
          <a href="/org_home">Organization Home</a> {"<"}{" "}
          <a href="/project_home">Project Home</a> {"<"}{" "}
          <a href="/project_options">Project Options</a>
        </p>
      </div>
      <h1>My Contributions</h1>
      <div>
        <table
          style={{
            border: "2px solid forestgreen",
            width: "800px",
            height: "200px",
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid black" }}>Contribution ID</th>
              <th style={{ borderBottom: "1px solid black" }}>Date</th>
              <th style={{ borderBottom: "1px solid black" }}>Details</th>
              <th style={{ borderBottom: "1px solid black" }}>Type</th>
              <th style={{ borderBottom: "1px solid black" }}>Hours/Items</th>
              <th style={{ borderBottom: "1px solid black" }}>Value Per</th>
              <th style={{ borderBottom: "1px solid black" }}>Total Value</th>
            </tr>
          </thead>
          {data?.getAllContributionsForContributor?.map((val: Contribution, key: number) => {
            const date = new Date(val.date).toDateString();
            return (
              <tbody key={key}>
                <tr>
                  <td style={{ textAlign: "center" }}>{val.id}</td>
                  <td style={{ textAlign: "center" }}>{date}</td>
                  <td style={{ textAlign: "center" }}>{val.details}</td>
                  {!!val.hourContribution && (
                    <>
                      <td style={{ textAlign: "center" }}>{"Hourly"}</td>
                      <td style={{ textAlign: "center" }}>{`${val?.hourContribution?.hours}`}</td>
                      <td style={{ textAlign: "center" }}>{`${val?.hourContribution?.hourlyRate}`}</td>
                      <td style={{ textAlign: "center" }}>{`${val?.hourContribution?.hourlyRate * val?.hourContribution?.hours}`}</td>
                    </>
                  )}
                  {!!val.otherContribution && (
                    <>
                      <td style={{ textAlign: "center" }}>{val.otherContribution.itemName}</td>
                      <td style={{ textAlign: "center" }}>{`${val?.otherContribution?.items}`}</td>
                      <td style={{ textAlign: "center" }}>{`${val?.otherContribution?.value}`}</td>
                      <td style={{ textAlign: "center" }}>{`${val?.otherContribution?.value * val?.otherContribution?.items}`}</td>
                    </>
                  )}
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div className="localStorageData">
        <h2>LocalStorage Data:</h2>
        <p>{printLocalStorage()}</p>
      </div>
    </div>
  );
}
