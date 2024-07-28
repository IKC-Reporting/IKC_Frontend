"use client"

import { gql, useQuery } from '@apollo/client';
import React from 'react';

type HourContribution = {
  hours: number;
  hourlyRate: number;
  benRatePer: number;
}

type OtherContribution = {
  itemName: string;
  value: number;
  items: number;
}

type Contribution = {
  id: string;
  contributorId: string;
  date: string;
  details: string;
  hourContribution: HourContribution;
  otherContribution: OtherContribution;
}

type IKCReport = {
  id: string;
  partnerOrgId: string;
  reportStartDate: string;
  reportEndDate: string;
  contributions: Contribution[];
  submitterId: string;
  isApproved: boolean;
  approverId: string;
  approvalDate: string;
}

export const GET_IKC_REPORTS_FOR_ORG = gql`
  query getIKCByPartnerOrg($partnerOrgId: ID!) {
    getIKCByPartnerOrg(partnerOrgId: $partnerOrgId) {
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
      reportEndDate
      reportStartDate
      submitterId
    }
  }
`;

const Submissions = () => {
  const { loading, error, data } = useQuery(GET_IKC_REPORTS_FOR_ORG, {
    variables: { partnerOrgId: "null" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  const ikcReport: IKCReport = data?.ikcReport;

  return (
    <div>
      <p><a href="/org">Organizations</a> {"<"} <a href="/org_home">Organization Home</a> {"<"} <a href="/org_options">Organization Options</a></p>
      <h1>Submissions Page</h1>
      <table>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Partner Org ID</th>
            <th>Report Start Date</th>
            <th>Report End Date</th>
            <th>Submitter ID</th>
            <th>Approval Status</th>
            <th>Approver ID</th>
            <th>Approval Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ikcReport.id}</td>
            <td>{ikcReport.partnerOrgId}</td>
            <td>{ikcReport.reportStartDate}</td>
            <td>{ikcReport.reportEndDate}</td>
            <td>{ikcReport.submitterId}</td>
            <td>{ikcReport.isApproved ? "Approved" : "Not Approved"}</td>
            <td>{ikcReport.approverId}</td>
            <td>{ikcReport.approvalDate}</td>
          </tr>
        </tbody>
      </table>
      <h2>Contributions</h2>
      <table>
        <thead>
          <tr>
            <th>Contribution ID</th>
            <th>Contributor ID</th>
            <th>Date</th>
            <th>Details</th>
            <th>Hours</th>
            <th>Hourly Rate</th>
            <th>Benefit Rate</th>
            <th>Item Name</th>
            <th>Item Value</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {ikcReport.contributions.map((contribution) => (
            <tr key={contribution.id}>
              <td>{contribution.id}</td>
              <td>{contribution.contributorId}</td>
              <td>{contribution.date}</td>
              <td>{contribution.details}</td>
              <td>{contribution.hourContribution?.hours}</td>
              <td>{contribution.hourContribution?.hourlyRate}</td>
              <td>{contribution.hourContribution?.benRatePer}</td>
              <td>{contribution.otherContribution?.itemName}</td>
              <td>{contribution.otherContribution?.value}</td>
              <td>{contribution.otherContribution?.items}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Submissions;
