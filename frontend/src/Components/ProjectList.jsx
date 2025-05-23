import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProjects } from "../api/ProjectsAPI";
import Pagination from "./pagination";

function ProjectList({selectedCategories, searchInput}) {
  const [projects, setProjects] = useState([]); //default is blank array, and then end up with Project Array
  const [pageSize, setPageSize] = useState(10); //sets default page size and allows us to retain what the page size was set to when a page has been switched
  const [pageNum, setPageNum] = useState(1); //set default pagenumber to 1
  const [totalPages, setTotalPages] = useState(0); //total number of pages
  const navigate = useNavigate(); //imported from react router dom to change pages
  const [error, setError] = useState(null); //look for errors, default null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //goes and grabs the data when we need to. Only looks for changes in the dom, not the server
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects(pageSize, pageNum, selectedCategories);

        setProjects(data.projects); //setting our projects list to display
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize)); //getting hte total number of pages we need by dividing the number of items by the page size and raise it to the next whole number with Math.ceil so 20 items / 5 pageSize (items per page) = 4 pages
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [pageSize, pageNum, selectedCategories]); //[pageSize] & [pageNum] updates as we change the page size selection box

  if (loading) return <p>Loading Projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const filteredProjects = projects.filter((p) => { //filtering the list of projects if they contain the following: (this is client side)
  const filteredCategory = //
    selectedCategories.length === 0 || //display all if we dont have a selected category, or only if the selected category is included in the project type field
    selectedCategories.includes(p.projectType);

  const filteredSearch =
    !searchInput || p.projectName.toLowerCase().includes(searchInput.toLowerCase()); //set matches search to whatever we input in the searchbar, or leave it blank if we don't have an input

  return filteredCategory && filteredSearch; //return both the category filter and the search filter
});

  return (
    <>
      {filteredProjects.map((p) => (
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
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/donation/${p.projectName}/${p.projectId}`)
              }
            >
              Donate
            </button>
          </div>
        </div>
      ))}
      <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPageNum}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPageNum(1);
            }}
          />
    </>
  );
}

export default ProjectList;
