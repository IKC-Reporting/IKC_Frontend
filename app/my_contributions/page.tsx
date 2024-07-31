"use client";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Contribution } from "../../utils/graphql";
import { Legend, Line, LineChart, XAxis, YAxis } from "recharts";

const GET_CONTRIBUTIONS_FOR_USER = gql`
  query GetAllContributionsForContributor($contributorId: ID!) {
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
  const [userId, setUserId] = useState<string | null>(null);
  const [contributorId, setContributorId] = useState<string | null>(null);
  const [contributionData, setContributionData] = useState<Contribution[]>([]);

  const { loading, error, data } = useQuery(GET_CONTRIBUTIONS_FOR_USER, {
    variables: { contributorId },
    skip: !userId, // Skip query if userId is not yet set
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("No user ID found in localStorage");
      // Redirect or handle the missing user ID case appropriately
    }
    if (storedContributorId) {
      setUserId(storedContributorId);
    } else {
      console.error("No contributor ID found in localStorage");
      // Redirect or handle the missing user ID case appropriately
    }

    const tempData = data?.getAllContributionsForContributor
      ? data.getAllContributionsForContributor
      : null;
    setContributionData(tempData);
  }, [data?.getAllContributionsForContributor]);

  const printLocalStorage = () => {
    const keys = Object.keys(localStorage);
    const data = keys
      .map((key) => `${key}: ${localStorage.getItem(key)}`)
      .join(", ");
    return data;
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  const formattedContributions = contributionData
    ?.toSorted((a: Contribution, b: Contribution) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate.getTime() - bDate.getTime();
    })
    ?.map((contribution: Contribution) => {
      let hourlyValue = 0;
      let otherValue = 0;
      if (!!contribution.hourContribution) {
        hourlyValue =
          contribution?.hourContribution?.hourlyRate *
          contribution?.hourContribution?.hours;
      } else if (!!contribution.otherContribution) {
        otherValue =
          contribution?.otherContribution?.value *
          contribution?.otherContribution?.items;
      }
      return {
        date: new Date(contribution.date).toLocaleString("default", {
          month: "short",
          year: "2-digit",
        }),
        hourlyValue,
        otherValue,
      };
    });

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
              <th style={{ borderBottom: "1px solid black" }}>
                Contribution ID
              </th>
              <th style={{ borderBottom: "1px solid black" }}>Date</th>
              <th style={{ borderBottom: "1px solid black" }}>Details</th>
              <th style={{ borderBottom: "1px solid black" }}>Type</th>
              <th style={{ borderBottom: "1px solid black" }}>Hours/Items</th>
              <th style={{ borderBottom: "1px solid black" }}>Value Per</th>
              <th style={{ borderBottom: "1px solid black" }}>Total Value</th>
            </tr>
          </thead>
          {data?.getAllContributionsForUser?.map(
            (val: Contribution, key: number) => {
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
                        <td
                          style={{ textAlign: "center" }}
                        >{`${val?.hourContribution?.hours}`}</td>
                        <td
                          style={{ textAlign: "center" }}
                        >{`${val?.hourContribution?.hourlyRate}`}</td>
                        <td style={{ textAlign: "center" }}>{`${
                          val?.hourContribution?.hourlyRate *
                          val?.hourContribution?.hours
                        }`}</td>
                      </>
                    )}
                    {!!val.otherContribution && (
                      <>
                        <td style={{ textAlign: "center" }}>
                          {val.otherContribution.itemName}
                        </td>
                        <td
                          style={{ textAlign: "center" }}
                        >{`${val?.otherContribution?.items}`}</td>
                        <td
                          style={{ textAlign: "center" }}
                        >{`${val?.otherContribution?.value}`}</td>
                        <td style={{ textAlign: "center" }}>{`${
                          val?.otherContribution?.value *
                          val?.otherContribution?.items
                        }`}</td>
                      </>
                    )}
                  </tr>
                </tbody>
              );
            }
          )}
        </table>
      </div>
      {/* Line Chart */}
      <div>
        <h2 style={{ textAlign: "center" }}>All Contributions</h2>
        <LineChart width={600} height={600} data={formattedContributions}>
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(v) => `$${v}`} />
          <Line type="monotone" stroke="#8884d8" dataKey="hourlyValue" />
          <Line type="monotone" stroke="#82ca9d" dataKey="otherValue" />
          <Legend />
        </LineChart>
      </div>
    </div>
  );
}
