"use client";

import { useEffect } from "react";

const Org_Options = () => {
  const printLocalStorage = () => {
    const keys = Object.keys(localStorage);
    const data = keys.map(key => `${key}: ${localStorage.getItem(key)}`).join(", ");
    return data;
  };

  useEffect(() => {
    console.log("LocalStorage Data:", printLocalStorage());
  }, []);

  return (
    <div>
      <p><a href="/org">Organizations</a> {"<"} <a href="/org_home">Organization Home</a></p>
      
      <div className="container">
        <p>Organization Options</p>
        <button className="button" onClick={() => window.location.href = "/org_submissions"}>Review Submissions</button>
        <br />
        <button className="button" onClick={() => window.location.href = "/view_contributions"}>View Contributions</button>
        <br />
        <button className="button" onClick={() => window.location.href = "/org_home"}>Organization Home</button>
      </div>
      <div className="localStorageData">
        <h2>LocalStorage Data:</h2>
        <p>{printLocalStorage()}</p>
      </div>
    </div>
  );
};

export default Org_Options;
