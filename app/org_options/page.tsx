"use client";

const Org_Options = () => {
  return (
    <div className="container">
      <p>Organization Options</p>
      <button className="button" onClick={() => window.location.href = "/org_submissions"}>Review Submissions</button>
      <br />
      <button className="button" onClick={() => window.location.href = "/view_contributions"}>View Contributions</button>
      <br />
      <button className="button" onClick={() => window.location.href = "/org_home"}>Organization Home</button>
    </div>
  );
};

export default Org_Options;
