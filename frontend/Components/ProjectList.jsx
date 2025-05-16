import { useEffect, useState } from "react";
import Project from "../types/Project"

function ProjectList(){

    const [projects, setProjects] = useState([]); //default is blank array, and then end up with Project Array
    const [pageSize, setPageSize] = useState(10); //sets default page size and allows us to retain what the page size was set to when a page has been switched

    useEffect(() => {//goes and grabs the data when we need to. Only looks for changes in the dom, not the server
    const fetchProjects = async () => {
        const response = await fetch(
            `https://localhost:5000/Water/AllProjects?pageHowMany=${pageSize}` //using ` (on the tilda key) will allow us to grab the variable (indicated by the $ in the link) from our page size we selected and pass it to the server
        ); //goes and fetches the table. the "?" indicates additional information such as page size
        const data = await response.json(); //returns the data in the .json
        console.log("Fetched data:", data); //log the fetch data for debugging purposes
        const projectObjects = data.map(
            (item) =>
                new Project(
                    item.projectId,
                    item.projectName,
                    item.projectType,
                    item.projectRegionalProgram,
                    item.projectImpact,
                    item.projectPhase,
                    item.projectFunctionalityStatus
                )
        );
        setProjects(projectObjects);
    };
    fetchProjects();
}, [pageSize]);

    return (
      <>
        <h1>Water Projects</h1>
        <br />
        {projects.map((p) => (
          <div key={p.projectId} id="projectCard" className="card">
            <h3 className="card-title">{p.projectName}</h3>
            <div className="card-body">
              <ul className="list-unstyled">
                <li>
                  <strong>Project Type: </strong>
                  {p.projectType}
                </li>
                <li>
                  <strong>Regional Program: </strong>
                  {p.projectRegionalProgram}
                </li>
                <li>
                  <strong>Impact: </strong>
                  {p.projectImpact} Individuals Served
                </li>
                <li>
                  <strong>Project Phase: </strong>
                  {p.projectPhase}
                </li>
                <li>
                  <strong>Functionality Status: </strong>
                  {p.projectFunctionalityStatus}
                </li>
              </ul>
            </div>
          </div>
        ))}
        <div>
          <label>
            Results per page:
            <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </>
    );
}

export default ProjectList;