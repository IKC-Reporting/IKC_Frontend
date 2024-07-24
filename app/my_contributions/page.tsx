"use client";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

type HourContribution = {
  hours: number;
  hourlyRate: number;
  benRatePer: number;
};

type OtherContribution = {
  itemName: string;
  value: number;
  items: number;
};

type Contribution = {
  id: string;
  contributorId: string;
  date: string;
  details: string;

  hourContribution: HourContribution;
  otherContribution: OtherContribution;
};

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

// const fakeContributions = [
//   {name: "service1", type: "service", quantity: "1.5", worth: "20", details: "test item 1"},
//   {name: "item1", type: "item", quantity: "2", worth: "2500", details: "test item 2"},
//   {name: "service2", type: "service", quantity: "2.0", worth: "18", details: "test item 3"}
// ]
export default function MyContributions() {
  const { loading, error, data } = useQuery(GET_CONTRIBUTIONS_FOR_USER, {
    variables: { userId: "24a7cf8c-feca-4863-87e8-1952a18a6973" },
  });
  console.log(data?.getAllContributionsForUser);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: </p>;

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
          <tr>
            <th style={{ borderBottom: "1px solid black" }}>Contribution ID</th>
            <th style={{ borderBottom: "1px solid black" }}>Date</th>
            <th style={{ borderBottom: "1px solid black" }}>Details</th>
            <th style={{ borderBottom: "1px solid black" }}>Type</th>

            <th style={{ borderBottom: "1px solid black" }}>Hours/Items</th>
            <th style={{ borderBottom: "1px solid black" }}>Value Per</th>
            <th style={{ borderBottom: "1px solid black" }}>Total Value</th>
          </tr>
          {data?.getAllContributionsForUser?.map(
            (val: Contribution, key: number) => {
              const date = new Date(val.date).toDateString();
              return (
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
                  {/*                   
                  <td style={{textAlign: "center"}}>{val.type}</td>
                <td style={{textAlign: "center"}}>$ {val.worth}</td>
                <td style={{textAlign: "center"}}>{value}</td>
                <td style={{textAlign: "center"}}>{val.quantity}</td> */}
                </tr>
              );
            }
          )}
        </table>
      </div>
    </div>
  );
}
