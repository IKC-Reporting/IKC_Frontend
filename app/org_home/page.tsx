"use client";

import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

export const GET_PARTNER_ORG = gql`
  query partnerOrg($id: ID!) {
    partnerOrg(id: $id) {
      admins
      contributors {
        benRatePer
        hourlyRate
        id
        partnerOrgId
        researchProjectId
        userId
      }
      id
      name
    }
  }
`;

const Org_Home = () => {
  const [orgId, setOrgId] = useState<string | null>(null);

  useEffect(() => {
    const storedOrgId = localStorage.getItem("orgId");
    if (storedOrgId) {
      setOrgId(storedOrgId);
    } else {
      window.location.href = "/select_organization"; // Redirect if orgId is not found
    }
  }, []);

  const { loading, error, data } = useQuery(GET_PARTNER_ORG, {
    variables: { id: orgId },
    skip: !orgId, // Skip query if orgId is not yet set
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <p>
        <a href="/select_organization">Organizations</a>
      </p>
      <div className="container">
        <p>{data?.partnerOrg?.name} Home</p>
        <button
          className="button"
          onClick={() => (window.location.href = "/org_options")}
        >
          Organization Options
        </button>
        <br />
        <button
          className="button"
          onClick={() => (window.location.href = "/project_home")}
        >
          View all Projects
        </button>
        <br />
        <button
          className="buttonback"
          onClick={() => (window.location.href = "/org")}
        >
          View All Organizations
        </button>
      </div>
    </div>
  );
};

export default Org_Home;
