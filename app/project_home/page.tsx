"use client";

import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import {
  Contributor,
  PartnerOrgItem,
  ResearchProject,
} from "../../utils/graphql";

export const GET_ALL_PROJ_FOR_ORGS = gql`
  query getAllProjForOrgs($orgId: ID!) {
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

const Project_Home = () => {
  const orgId = localStorage.getItem("orgId");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (!orgId) {
      window.location.href = "/select_organization"; // Redirect if orgId is not found
    }
    // Clear the projectId from local storage when component mounts
    localStorage.removeItem("projectId");
  }, []);

  const { loading, error, data } = useQuery(GET_ALL_PROJ_FOR_ORGS, {
    variables: { orgId },
    skip: !orgId, // Skip query if orgId is not yet set
  });

  const handleProjectSelect = (
    projectId: string,
    projectPartners: PartnerOrgItem[]
  ) => {
    const partnerOrg = projectPartners.find(
      (project: PartnerOrgItem) => project.id === orgId
    );

    const contributor = partnerOrg?.contributors.find(
      (contributor: Contributor) => contributor.userId === userId
    );

    const constributorId = contributor?.id ? contributor?.id : "";
    localStorage.setItem("contributorId", constributorId);
    localStorage.setItem("projectId", projectId);
    window.location.href = `/project_options`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <p>
        <a href="/org_home">Organization Home</a>
      </p>
      <div className="container">
        <p>
          Projects for{" "}
          {data?.getAllProjForOrgs?.[0]?.projectPartners?.[0]?.name}
        </p>
        {data?.getAllProjForOrgs?.map((project: ResearchProject) => (
          <div key={project.id}>
            <h3>{project.projectTitle}</h3>
            <p>Start Date: {new Date(project.startDate).toDateString()}</p>
            <p>End Date: {new Date(project.endDate).toDateString()}</p>
            <button
              className="button"
              onClick={() => {
                handleProjectSelect(project.id, project?.projectPartners);
              }}
            >
              View Project
            </button>
            <br />
            <br />
          </div>
        ))}
        <button
          className="buttonback"
          onClick={() => (window.location.href = "/org_home")}
        >
          Back to Organization Home
        </button>
      </div>
    </div>
  );
};

export default Project_Home;
