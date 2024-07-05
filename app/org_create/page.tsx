"use client";

import React from 'react';

const Org_Create = () => {
  return (
    <div className="container">
      <h1>Create an Organization</h1>
      <form>
        <div>
          <label htmlFor="orgName">Organization Name:</label>
          <input type="text" id="orgName" name="orgName" required />
        </div>
        <div>
          <label htmlFor="orgDescription">Description:</label>
          <textarea id="orgDescription" name="orgDescription" required></textarea>
        </div>
        <button type="submit" className="button">Create</button>
      </form>
    </div>
  );
};

export default Org_Create;
