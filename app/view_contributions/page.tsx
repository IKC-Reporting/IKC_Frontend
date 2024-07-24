"use client";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import Layout from "../components/Layout";

const fakeContributions = [
  {
    name: "service1",
    type: "service",
    quantity: "1.5",
    worth: "20",
    details: "test item 1",
  },
  {
    name: "item1",
    type: "item",
    quantity: "2",
    worth: "2500",
    details: "test item 2",
  },
  {
    name: "service2",
    type: "service",
    quantity: "2.0",
    worth: "18",
    details: "test item 3",
  },
];

const MyContributions = () => {
  return (
    <div>
      <p>
        <a href="/org">Organizations</a> {"<"}{" "}
        <a href="/org_home">Organization Home</a> {"<"}{" "}
        <a href="/org_options">Organization Options</a>
      </p>
      <h1>All Contributions</h1>
      <div>
        <table
          style={{
            border: "2px solid forestgreen",
            width: "800px",
            height: "200px",
          }}
        >
          <tr>
            <th style={{ borderBottom: "1px solid black" }}>Name</th>
            <th style={{ borderBottom: "1px solid black" }}>Type</th>
            <th style={{ borderBottom: "1px solid black" }}>Hours/Items</th>
            <th style={{ borderBottom: "1px solid black" }}>Value Per</th>
            <th style={{ borderBottom: "1px solid black" }}>Total Value</th>
            <th style={{ borderBottom: "1px solid black" }}>Details</th>
          </tr>
          {fakeContributions.map((val, key) => {
            let value = parseFloat(val.quantity) * parseFloat(val.worth);
            return (
              <tr key={key}>
                <td style={{ textAlign: "center" }}>{val.name}</td>
                <td style={{ textAlign: "center" }}>{val.type}</td>
                <td style={{ textAlign: "center" }}>$ {val.worth}</td>
                <td style={{ textAlign: "center" }}>{value}</td>
                <td style={{ textAlign: "center" }}>{val.quantity}</td>
                <td style={{ textAlign: "center" }}>{val.details}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default MyContributions;
