import { useEffect, useState } from "react";
import Project from "../../types/Project";

function ProjectList({selectedCategories}) {
  const [projects, setProjects] = useState([]); //default is blank array, and then end up with Project Array
  const [pageSize, setPageSize] = useState(10); //sets default page size and allows us to retain what the page size was set to when a page has been switched
  const [pageNum, setPageNum] = useState(1); //set default pagenumber to 1
  const [totalItems, setTotalItems] = useState(0); //total items default is 0
  const [totalPages, setTotalPages] = useState(0); //total number of pages

  useEffect(() => {
    //goes and grabs the data when we need to. Only looks for changes in the dom, not the server
    const fetchProjects = async () => {
      const categoryParams = selectedCategories.map((cat)=>`projectTypes=${encodeURIComponent(cat)}`).join('&');//encodeURIComponent makes sure our data is put together correctly
      const response = await fetch(
        `https://localhost:5000/Water/AllProjects?pageHowMany=${pageSize}&pageNumber=${pageNum}${selectedCategories.length ? `&${categoryParams}`:``}` //using ` (on the tilda key) will allow us to grab the variable (indicated by the $ in the link) from our page size we selected and pass it to the server, 
                                                                                                                                                       //if we have selected categories, append the categoryParameters to the end, else leave it blank (add nothing)
      ); //goes and fetches the table. the "?" indicates additional information such as page size
      const data = await response.json(); //returns the data in the .json
      console.log("Fetched data:", data); //log the fetch data for debugging purposes
      const projectObjects = data.projects.map(
        //this maps out our array of projects to display
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
      setProjects(projectObjects); //setting our projects list to display
      setTotalItems(data.totalNumProjects); //getting our total number of projects
      setTotalPages(Math.ceil(data.totalNumProjects / pageSize)); //getting hte total number of pages we need by dividing the number of items by the page size and raise it to the next whole number with Math.ceil so 20 items / 5 pageSize (items per page) = 4 pages
    };
    fetchProjects();
  }, [pageSize, pageNum, totalItems, selectedCategories]); //[pageSize] & [pageNum] updates as we change the page size selection box

  return (
    <>
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

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)} //when we click the numbered buttons take us to that page
          disabled={pageNum === i + 1} //disables button for the page we are on
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
      <div>
        <label>
          Results per page:
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNum(1);
            }}
          >
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
