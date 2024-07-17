"use client";
import { gql, useQuery } from "@apollo/client";

const SelectOrganization = () => {
  return (
    <div className="container">
      <h1>Select Organization</h1>
      <button className="button" onClick={() => window.location.href = "/org_home"}>Place Holder Org</button>
    </div>
  );
};

export default SelectOrganization;
