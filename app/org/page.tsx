"use client";

const SelectOrganization = () => {
  return (
    <div className="container">
      <p>Select Organization</p>
      <button className="button" onClick={() => window.location.href = "/org_home"}>Place Holder Org</button>
    </div>
  );
};

export default SelectOrganization;
