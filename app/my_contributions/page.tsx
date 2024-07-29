"use client";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Contribution } from "../../utils/graphql";

const GET_CONTRIBUTIONS_FOR_USER = gql`
  query UserContributions($userId: ID!) {
    getAllContributionsForUser(userId: $userId) {
      id
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
  const { loading, error, data } = useQuery(GET_CONTRIBUTIONS_FOR_USER, {
    variables: { userId: "d38cbf18-ac04-4517-96d5-289c2b6222c0" },
  });
  console.log(data?.getAllContributionsForUser);

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
          {data?.getAllContributionsForUser?.map(
            (val: Contribution, key: number) => {
              const date = new Date(val.date).toDateString();
              return (
                <tbody>
                  <tr key={key}>
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
                        <td style={{ textAlign: "center" }}>{`${val?.hourContribution?.hourlyRate *
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
                        <td style={{ textAlign: "center" }}>{`${val?.otherContribution?.value *
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
    </div>
  );
}
