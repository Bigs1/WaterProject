import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProject, fetchProjects } from "../api/ProjectsAPI";
import Pagination from "../Components/pagination";
import NewProjectForm from "../Components/NewProjectForm";
import EditProjectForm from "../Components/EditProjectForm";

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
  const [showForm, setShowForm] = useState(false); //flag when to show form
  const [editingProject, setEditingProject] = useState(null); //flag when editing project

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects(pageSize, pageNum, selectedCategories);
        setProjects(data.projects);
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [pageSize, pageNum, selectedCategories]);

  //HANDLING DELETE HERE!
  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    ); //confirm the deletion (pops open a window)
    if (!confirmDelete) return; //just return if we cancel

    try {
      await deleteProject(projectId); //get the project ID
      setProjects(projects.filter((p) => p.projectId !== projectId)); //filter the list showing all projects except the one we want to delete and set that list to current list to remove the entry
    } catch (error) {
      alert("Failed to delete project. Please try again.");
    }
  };

  if (loading) return <p>Loading Projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  //If we are not showing the form to add a project, display the button, if we hit the button, then display the form to add a project. Also adds functionality to the edit and delete buttons.
  //If the object to edit is not null then we render the edit Project forum component
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
        }}
      >
        <button
          className="btn btn-outline-info btn-sm"
          onClick={() => navigate(`/projects`)}
        >
          User
        </button>
      </div>
      <h1>Admin - Projects</h1>

      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Project
        </button>
      )}

      {showForm && (
        <NewProjectForm
          onSuccess={() => {
            setShowForm(false);
            fetchProjects(pageSize, pageNum, []).then((data) => {
              setProjects(data.projects);
            });
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingProject && (
        <EditProjectForm
          project={editingProject}
          onSuccess={() => {
            setEditingProject(null);
            fetchProjects(pageSize, pageNum, []).then((data) =>
              setProjects(data.projects)
            );
          }}
          onCancel={() => setEditingProject(null)}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Regional Program</th>
            <th>Impact</th>
            <th>Phase</th>
            <th>Status</th>
            <th></th>
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
                  className="btn btn-primary btn-sm w-100 mb-1"
                  onClick={() => setEditingProject(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => handleDelete(p.projectId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};

export default AdminProjectPage;
