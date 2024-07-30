"use client";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Contribution, ProjContrib, MonthlyContrib } from "../../utils/graphql";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";

const GET_ALL_APPROVED_CONTRIB_BY_ORG = gql`
  query GetAllApprovedContribByOrg($orgId: ID!) {
    getAllApprovedContribByOrg(orgId: $orgId) {
      projectName
      contributions {
        month
        total
      }
    }
  }
`;

export default function MyContributions() {
  const [orgId, setOrgId] = useState<string | null>(null);

  useEffect(() => {
    const storedOrgId = localStorage.getItem("orgId");
    console.log("Retrieved orgId:", storedOrgId); // Debugging log
    if (storedOrgId) {
      setOrgId(storedOrgId);
    } else {
      console.error("No organization ID found in localStorage");
      // Redirect or handle the missing organization ID case appropriately
    }
  }, []);

  const { loading, error, data } = useQuery(GET_ALL_APPROVED_CONTRIB_BY_ORG, {
    variables: { orgId },
    skip: !orgId, // Skip the query if orgId is not set
  });

  const printLocalStorage = () => {
    const keys = Object.keys(localStorage);
    const data = keys
      .map((key) => `${key}: ${localStorage.getItem(key)}`)
      .join(", ");
    return data;
  };

  useEffect(() => {
    console.log("LocalStorage Data:", printLocalStorage());
  }, []);

  console.log(data?.getAllApprovedContribByOrg);

  return (
    <div>
      <div>
        <p>
          <a href="/org">Organizations</a> {"<"}{" "}
          <a href="/org_home">Organization Home</a> {"<"}{" "}
          <a href="/org_options">Organization Options</a>
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
          {data?.getAllApprovedContribByOrg?.map(
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

      {/* below is for charts, only above table needs to have getAllApprovedContribByOrg removed... */}
      <div>


        {data?.getAllApprovedContribByOrg.map(
          (project: ProjContrib, key: number) => {
            console.log(project)

            const projContributions: MonthlyContrib[] = project.contributions;

            return (
              <div key={key}>
                <BarChart width={1000} height={300} data={projContributions}>
                  <Bar dataKey={project.projectName} fill="green" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="month" />
                  <YAxis dataKey="total" />
                </BarChart>
              </div>
            );
          }
        )}
      </div>

      <div className="localStorageData">
        <h2>LocalStorage Data:</h2>
        <p>{printLocalStorage()}</p>
      </div>
    </div >
  );
}
