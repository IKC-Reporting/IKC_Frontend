"use client";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ResearchProject } from "../../utils/graphql";

const GET_ALL_PROJ_FOR_ORGS = gql`
  query ExampleQuery($orgId: string) {
    getAllProjForOrgs(orgId: $orgId) {
      id
      projectTitle
      startDate
      endDate
      admins
      projectPartners {
        id
        name
        contributors {
          id
          userId
          partnerOrgId
          researchProjectId
          hourlyRate
          benRatePer
        }
      }
      ikcReports {
        id
        partnerOrgId
        researchProjectId
        reportStartDate
        contributions {
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
        submitterId
        submissionDate
        isApproved
        approverId
        approvalDate
      }
      
    }
  }
`;

export default function Project_Home() {
  const { loading, error, data } = useQuery(GET_ALL_PROJ_FOR_ORGS, {
    variables: { userId: "24a7cf8c-feca-4863-87e8-1952a18a6973" },
  });
  console.log(data?.getAllProjForOrgs);

  return (
    <div>
      <div>
        <p>
          <a href="/org">Organizations</a> {"<"}{" "}
          <a href="/org_home">Organization Home</a>
        </p>
      </div>
      <div className="titleStyle">
        <h1>Select a Project</h1>
        <a href="/project_options">
        <button className="button">Project A</button>
        </a>
      </div>
      <div>
        {data?.getAllProjForOrgs?.map(
          (val: ResearchProject, key: number) => {
            return (
              <tbody>
                <tr key={key}>
                  <td>
                    <a href="/project_options">
                      <button className="button">{val.projectTitle}</button>
                    </a>
                  </td>
                </tr>
              </tbody>
            )
          }
        )}
      </div>
    </div>
  )
}

