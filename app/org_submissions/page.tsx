"use client";

import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { IKCReport } from "../../utils/graphql";

export const GET_IKC_REPORTS_FOR_ORG = gql`
  query GetAllIKCByPartnerOrg($getAllIkcByPartnerOrgId: ID!) {
    getAllIKCByPartnerOrg(id: $getAllIkcByPartnerOrgId) {
      approvalDate
      approverId
      contributions {
        contributorId
        date
        details
        hourContribution {
          benRatePer
          hourlyRate
          hours
        }
        id
        otherContribution {
          itemName
          items
          value
        }
      }
      id
      isApproved
      partnerOrgId
      reportStartDate
      researchProjectId
      submissionDate
      submitterId
    }
  }
`;

const Submissions = () => {
  const [getAllIkcByPartnerOrgId, setOrgId] = useState<string | null>(null);

  useEffect(() => {
    const storedOrgId = localStorage.getItem("orgId");
    console.log("Retrieved orgId from localStorage:", storedOrgId); // Check what’s being retrieved

    if (storedOrgId) {
      setOrgId(storedOrgId);
    } else {
      console.warn("orgId not found in localStorage. Redirecting...");
      window.location.href = "/select_organization"; // Redirect if orgId is not found
    }
  }, []);

  const { loading, error, data } = useQuery(GET_IKC_REPORTS_FOR_ORG, {
    variables: { getAllIkcByPartnerOrgId },
    skip: !getAllIkcByPartnerOrgId,
  });

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

  const ikcReports: IKCReport[] = data?.getAllIKCByPartnerOrg || [];

  return (
    <div>
      <p>
        <a href="/org">Organizations</a> {"<"} <a href="/org_home">Organization Home</a> {"<"} <a href="/org_options">Organization Options</a>
      </p>
      <h1>Submissions Page</h1>

      {ikcReports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <>
          <h2>Reports</h2>
          <ul>
            {ikcReports.map((ikcReport) => (
              <li key={ikcReport.id}>
                <h3>Report ID: {ikcReport.id}</h3>
                <ul>
                  <li><strong>Partner Org ID:</strong> {ikcReport.partnerOrgId}</li>
                  <li><strong>Report Start Date:</strong> {ikcReport.reportStartDate}</li>
                  <li><strong>Submitter ID:</strong> {ikcReport.submitterId}</li>
                  <li><strong>Approval Status:</strong> {ikcReport.isApproved ? "Approved" : "Not Approved"}</li>
                  <li><strong>Approver ID:</strong> {ikcReport.approverId}</li>
                  <li><strong>Approval Date:</strong> {ikcReport.approvalDate}</li>
                </ul>

                <h4>Contributions</h4>
                <ul>
                  {ikcReport.contributions.map((contribution) => (
                    <li key={contribution.id}>
                      <h5>Contribution ID: {contribution.id}</h5>
                      <ul>
                        <li><strong>Contributor ID:</strong> {contribution.contributorId}</li>
                        <li><strong>Date:</strong> {contribution.date}</li>
                        <li><strong>Details:</strong> {contribution.details}</li>
                        <li><strong>Hours:</strong> {contribution.hourContribution?.hours}</li>
                        <li><strong>Hourly Rate:</strong> {contribution.hourContribution?.hourlyRate}</li>
                        <li><strong>Benefit Rate:</strong> {contribution.hourContribution?.benRatePer}</li>
                        <li><strong>Item Name:</strong> {contribution.otherContribution?.itemName}</li>
                        <li><strong>Item Value:</strong> {contribution.otherContribution?.value}</li>
                        <li><strong>Items:</strong> {contribution.otherContribution?.items}</li>
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="localStorageData">
        <h2>LocalStorage Data:</h2>
        <p>{printLocalStorage()}</p>
      </div>
    </div>
  );
};

export default Submissions;
