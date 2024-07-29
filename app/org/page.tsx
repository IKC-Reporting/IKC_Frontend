"use client";

import { gql, useQuery } from "@apollo/client";
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

  const { loading, error, data } = useQuery(GET_PARTNER_ORGS_FOR_USER, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container">
      <h1>Select Organization</h1>
      {data?.getAllOrgsForUser?.map((partnerOrg: PartnerOrg) => (
        <button
          key={partnerOrg.id}
          className="button"
          onClick={() => (window.location.href = "/org_home")}
        >
          {partnerOrg.name}
        </button>
      ))}
    </div>
  );
};

export default SelectOrganization;
