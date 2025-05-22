import { useState } from "react";
import { updateProject } from "../api/ProjectsAPI"; // Make sure this function exists and is correctly imported

//Form to edit the data of all projects functions similarly to addProjects except we update the project overriding the data.
const EditProjectForm = ({ project, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState(
    {...project},
    {
    projectId: 0,
    projectName: '',
    projectType: '',
    projectRegionalProgram: '',
    projectImpact: 0,
    projectPhase: '',
    projectFunctionalityStatus: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //set form data
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent the default data from taking over above
    try {
      await updateProject(formData.projectId, formData); //update the project data and the form data to reflect these changes
      onSuccess();
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  //show the form
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Project</h2>

      <label>
        Project Name:
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
        />
      </label>

      <label>
        Project Type:
        <input
          type="text"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
        />
      </label>

      <label>
        Regional Program:
        <input
          type="text"
          name="projectRegionalProgram"
          value={formData.projectRegionalProgram}
          onChange={handleChange}
        />
      </label>

      <label>
        Project Impact:
        <input
          type="number"
          name="projectImpact"
          value={formData.projectImpact}
          onChange={handleChange}
        />
      </label>

      <label>
        Project Phase:
        <input
          type="text"
          name="projectPhase"
          value={formData.projectPhase}
          onChange={handleChange}
        />
      </label>

      <label>
        Project Functionality Status:
        <input
          type="text"
          name="projectFunctionalityStatus"
          value={formData.projectFunctionalityStatus}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Update Project</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditProjectForm;
