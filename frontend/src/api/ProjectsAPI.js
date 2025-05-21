import Project from "../../types/Project";

const API_URL = "https://localhost:5000/Water";

export const fetchProjects = async (
  pageSize,
  pageNum,
  selectedCategories = [] //ensures items are returned as an array
) => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
      .join("&");
    const url = `${API_URL}/AllProjects?pageHowMany=${pageSize}&pageNumber=${pageNum}${
      selectedCategories.length ? `&${categoryParams}` : ""
    }`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    // wait for and extract the JSON
    const data = await response.json();

    // then use that data to map into Project objects
    const projectObjects = data.projects.map(
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
    return {
      projects: projectObjects,
      totalNumProjects: data.totalNumProjects,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const addProject = async (newProject) => {
  try {
    const response = await fetch(`${API_URL}/AddProject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    if (!response.ok) {
      throw new Error("Failed to add project");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding project", error);
    throw error;
  }
};

export const updateProject = async (projectId, updatedProject) => {
  try {
    const response = await fetch(`${API_URL}/UpdateProject/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    });

    if (!response.ok) {
      throw new Error("Failed to update project");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating project", error);
    throw error;
  }
};