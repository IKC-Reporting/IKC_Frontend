"use client";

import React from 'react';

const SelectOrganization = () =>  {
  return (
    <div className="page-container">
      <header className="header">
        <h1>Organizations</h1>
        <button className="button" onClick={() => window.location.href = "/org_create"}>
          Create an Organization
        </button>
      </header>
      <div className="container">
        <p>Select Organization</p>
        <button className="button" onClick={() => window.location.href = "/org_home"}>Place Holder Org</button>
      </div>
    </div>
  );
};

export default SelectOrganization;


