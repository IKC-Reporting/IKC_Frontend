"use client";

import { gql, useQuery } from '@apollo/client';
import React from 'react';

type Contributor = {
  id: string;
  userId: string;
  partnerOrgId: string;
  researchOrgId: string;
  hourlyRate: number;
  benRatePer: number;
};

type PartnerOrg = {
  id: string;
  name: string;
  admins: string[];
  contributors: Contributor[];
};

export const GET_PARTNER_ORG = gql`
  query partnerOrg($id: ID!) {
    partnerOrg(id: $id) {
      admins
      contributors {
        benRatePer
        hourlyRate
        id
        partnerOrgId
        researchOrgId
        userId
      }
      id
      name
    }
  }
`;

const Org_Home = () => {
  const { loading, error, data } = useQuery(GET_PARTNER_ORG, {
    variables: { id: "3ab3107d-09bc-44cd-b73b-0dfd17bd7576" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  console.log(data);

  return (
    <div>
      <p><a href="/org">Organizations</a></p>
      <div className="container">
        <p>{data?.partnerOrg?.name} Home</p>
        <button className="button" onClick={() => window.location.href = "/org_options"}>Organization Options</button>
        <br />
        <button className="button" onClick={() => window.location.href = "/project_home"}>View all Projects</button>
        <br />
        <button className="buttonback" onClick={() => window.location.href = "/org"}>View All Organizations</button>
      </div>
    </div>
  );
};

export default Org_Home;
