"use client";

import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';

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
  const [orgId, setOrgId] = useState<string | null>(null);

  useEffect(() => {
    const storedOrgId = localStorage.getItem("orgId");
    console.log("Retrieved orgId:", storedOrgId); // Debugging log
    if (storedOrgId) {
      setOrgId(storedOrgId);
    } else {
      window.location.href = "/select_organization"; // Redirect if orgId is not found
    }

    // Clear the projectId from local storage when component mounts
    localStorage.removeItem("projectId");
  }, []);

  const { loading, error, data } = useQuery(GET_ALL_PROJ_FOR_ORGS, {
    variables: { orgId },
    skip: !orgId,  // Skip query if orgId is not yet set
  });

  const handleProjectSelect = (projectId: string) => {
    localStorage.setItem("projectId", projectId);
    window.location.href = `/project_options?projectId=${projectId}`;
  };

  const printLocalStorage = () => {
    const keys = Object.keys(localStorage);
    const data = keys.map(key => `${key}: ${localStorage.getItem(key)}`).join(", ");
    return data;
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <p><a href="/org_home">Organization Home</a></p>
      <div className="container">
        <p>Projects for {data?.getAllProjForOrgs?.[0]?.projectPartners?.[0]?.name}</p>
        {data?.getAllProjForOrgs?.map((project: { id: string; projectTitle: string; startDate: string; endDate: string; }) => (
          <div key={project.id}>
            <h3>{project.projectTitle}</h3>
            <p>Start Date: {new Date(project.startDate).toDateString()}</p>
            <p>End Date: {new Date(project.endDate).toDateString()}</p>
            <button className="button" onClick={() => handleProjectSelect(project.id)}>View Project</button>
            <br /><br />
          </div>
        ))}
        <button className="buttonback" onClick={() => window.location.href = "/org_home"}>Back to Organization Home</button>
      </div>
      <div className="localStorageData">
        <h2>LocalStorage Data:</h2>
        <p>{printLocalStorage()}</p>
      </div>
    </div>
  );
};

export default Project_Home;
