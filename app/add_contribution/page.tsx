"use client";
import React, { useEffect, useState } from "react";

const Submit_Contribution = () => {
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    const storedProjectId = localStorage.getItem("projectId");
    if (storedProjectId) {
      setProjectId(storedProjectId);
    } else {
      console.error("No project ID found in localStorage");
      // Redirect or handle the missing project ID case appropriately
    }
  }, []);

  const handleNavigation = (url: string) => {
    if (projectId) {
      window.location.href = `${url}?projectId=${projectId}`;
    } else {
      window.location.href = url;
    }
  };

  return (
    <div>
      <div>
        <p>
          <a href="/org">Organizations</a> {"<"}{" "}
          <a href="/org_home">Organization Home</a> {"<"}{" "}
          <a href="/project_home">Project Home</a> {"<"}{" "}
          <a href="/project_options">Project Options</a>
        </p>
      </div>
      <div className="container">
        <h1>Submit Contribution</h1>
        <p>Current Project ID: {projectId}</p>
        <button
          className="button"
          onClick={() => handleNavigation("/add_item")}
        >
          Add A Item
        </button>
        <br />
        <br />
        <button
          className="button"
          onClick={() => handleNavigation("/add_service")}
        >
          Add A Service
        </button>
      </div>
    </div>
  );
};

export default Submit_Contribution;
