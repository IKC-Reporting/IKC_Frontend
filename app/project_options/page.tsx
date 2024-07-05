"use client";

const Project_Options = () => {
  return (
    <div>
      <div>
        <p><a href="/org">Organizations</a> {"<"} <a href="/org_home">Organization Home</a> {"<"} <a href="/project_home">Project Home</a></p>
      </div>
      <div className="container">
        <h1>Project Options</h1>
        <a href="/add_contribution"><button className="button">Add A Contribution</button></a>
        <br/><br/>
        <a href="/my_contributions"><button className="button">View Your Contributions</button></a>
        <br/>
      </div>
    </div>
  )
}

export default Project_Options