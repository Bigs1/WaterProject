import Project from "../../types/Project";

export const fetchProjects = async (
  pageSize,
  pageNum,
  selectedCategories
) => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
      .join("&");

    const url = `https://localhost:5000/Water/AllProjects?pageHowMany=${pageSize}&pageNumber=${pageNum}${
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
