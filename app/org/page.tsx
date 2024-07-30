"use client";

import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { PartnerOrg } from "../../utils/graphql";

export const GET_PARTNER_ORGS_FOR_USER = gql`
  query getAllOrgsForUser($userId: ID!) {
    getAllOrgsForUser(userId: $userId) {
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

const SelectOrganization = () => {
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    localStorage.removeItem("orgId");
  }, []);

  const { loading, error, data } = useQuery(GET_PARTNER_ORGS_FOR_USER, {
    variables: { userId },
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

  const handleSelectOrg = (orgId: string) => {
    localStorage.setItem("orgId", orgId);
    window.location.href = "/org_home";
  };

  return (
    <div className="container">
      <h1>Select Organization</h1>
      {data?.getAllOrgsForUser?.map((partnerOrg: PartnerOrg) => (
        <button
          key={partnerOrg.id}
          className="button"
          onClick={() => handleSelectOrg(partnerOrg.id)}
        >
          {partnerOrg.name}
        </button>
      ))}
      <div className="localStorageData">
        <h2>LocalStorage Data:</h2>
        <p>{printLocalStorage()}</p>
      </div>
    </div>
  );
};

export default SelectOrganization;
