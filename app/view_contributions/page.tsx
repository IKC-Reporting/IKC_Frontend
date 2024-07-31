"use client";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Contribution, ProjContrib, MonthlyContrib } from "../../utils/graphql";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

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

const MyContributions = () => {
  const [orgId, setOrgId] = useState<string | null>(null);
  const [projectChartData, setProjectChartData] = useState<ProjContrib[]>([]);

  useEffect(() => {
    const storedOrgId = localStorage.getItem("orgId");
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

  useEffect(() => {
    const tempData = data?.getAllApprovedContribByOrg
      ? data?.getAllApprovedContribByOrg
      : [];

    setProjectChartData(tempData);
  }, [data?.getAllApprovedContribByOrg]);

  return (
    <div>
      <div>
        <p>
          <a href="/org">Organizations</a> {"<"}{" "}
          <a href="/org_home">Organization Home</a> {"<"}{" "}
          <a href="/org_options">Organization Options</a>
        </p>
      </div>
      <h1>Project Contributions</h1>
      <div>
        {data?.getAllApprovedContribByOrg?.map(
          (project: ProjContrib, key: number) => {
            return (
              <div key={key}>
                <h2>{`${project.projectName} Contributions`}</h2>
                <table
                  style={{
                    border: "2px solid forestgreen",
                    width: "400px",
                    height: "200px",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ borderBottom: "1px solid black" }}>Month</th>
                      <th style={{ borderBottom: "1px solid black" }}>Total</th>
                    </tr>
                  </thead>
                  {project?.contributions.map(
                    (val: MonthlyContrib, key: number) => {
                      return (
                        <tbody key={key}>
                          <tr>
                            <td style={{ textAlign: "center" }}>{val.month}</td>
                            <td
                              style={{ textAlign: "center" }}
                            >{`$${val.total}`}</td>
                          </tr>
                        </tbody>
                      );
                    }
                  )}
                </table>
              </div>
            );
          }
        )}
      </div>

      {/* below is for charts, only above table needs to have getAllApprovedContribByOrg removed... */}
      <div>
        {projectChartData?.map((project: ProjContrib, key: number) => {
          const projContributions: MonthlyContrib[] = project.contributions;

          return (
            <div key={key}>
              <h2 style={{ textAlign: "center" }}>{project.projectName}</h2>
              <BarChart width={600} height={600} data={projContributions}>
                <Bar dataKey="total" fill="green" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => `$${v}`} />
              </BarChart>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyContributions;
