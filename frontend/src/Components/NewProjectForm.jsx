import { useState } from "react";
import { addProject } from "../api/ProjectsAPI"; // Make sure this function exists and is correctly imported


const NewProjectForm = ({ onSuccess, onCancel }) => { //our form data will look like this with all the project components
  const [formData, setFormData] = useState({
    projectId: 0,
    projectName: '',
    projectType: '',
    projectRegionalProgram: '',
    projectImpact: 0,
    projectPhase: '',
    projectFunctionalityStatus: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //set form data with the corresponding information we input
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //we dont want to upload default values
    try {
      await addProject(formData); //add the project  with the formdata we added
      onSuccess(); //flag successful added entry
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  //fields to add the data into
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

      <button type="submit">Add Project</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default NewProjectForm;
