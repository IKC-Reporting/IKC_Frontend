"use client";

const Project_Options = () => {
  return (
    <div>
      <div>
        <p><a href="/org">Organizations</a> {"<"} <a href="/project_home">Project Home</a></p>
      </div>
      <div>
        <h1>Project Options</h1>
        <a href="/add_contribution"><button type="button">Add A Contribution</button></a>
        <br/><br/>
        <a href="/my_contributions"><button type="button">View Your Contributions</button></a>
        <br/>
      </div>
    </div>
  )
}

export default Project_Options