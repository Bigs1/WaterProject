import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Project from "../../types/Project";
import { fetchProjects } from "../api/ProjectsAPI";


//this page will look similar to the projects page in code, the difference on the frontend is that it will have more details and options as well as the projects will be laid out in a table with more functions such as
// adding and deleting data entries

const AdminProjectPage = () => {
  const [projects, setProjects] = useState([]); //default is blank array, and then end up with Project Array
  const [pageSize, setPageSize] = useState(10); //sets default page size and allows us to retain what the page size was set to when a page has been switched
  const [pageNum, setPageNum] = useState(1); //set default pagenumber to 1
  const [totalPages, setTotalPages] = useState(0); //total number of pages
  const navigate = useNavigate(); //imported from react router dom to change pages
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(null); //look for errors, default null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects(pageSize, pageNum, selectedCategories);
        setProjects(data.projects);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading Projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1>Admin - Projects</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Regional Program</th>
            <th>Impact</th>
            <th>Phase</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.projectId}>
              <td>{p.projectId}</td>
              <td>{p.projectName}</td>
              <td>{p.projectType}</td>
              <td>{p.projectRegionalProgram}</td>
              <td>{p.projectImpact}</td>
              <td>{p.projectPhase}</td>
              <td>{p.projectFunctionalityStatus}</td>
              <td>
                <button
                  onClick={() => console.log(`Edit project ${p.projectId}`)}
                >
                  Edit
                </button>
                <button
                  onClick={() => console.log(`Edit project ${p.projectId}`)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProjectPage;
