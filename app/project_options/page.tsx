"use client";
import { useEffect, useState } from "react";

const Project_Options = () => {
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
    window.location.href = url;
  };

  return (
    <div>
      <div>
        <p>
          <a href="/org">Organizations</a> {"<"}{" "}
          <a href="/org_home">Organization Home</a> {"<"}{" "}
          <a href="/project_home">Project Home</a>
        </p>
      </div>
      <div className="container">
        <h1>Project Options</h1>
        <p>Current Project ID: {projectId}</p>
        <button
          className="button"
          onClick={() => handleNavigation("/add_contribution")}
        >
          Add A Contribution
        </button>
        <br />
        <br />
        <button
          className="button"
          onClick={() => handleNavigation("/my_contributions")}
        >
          View Your Contributions
        </button>
        <br />
      </div>
    </div>
  );
};

export default Project_Options;
