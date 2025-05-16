import { useEffect, useState } from "react";
import Project from "../types/Project"

function ProjectList(){

    const [projects, setProjects] = useState([]); //default is blank array, and then end up with Project Array

    useEffect(() => {//goes and grabs the data when we need to
    const fetchProjects = async () => {
        const response = await fetch('https://localhost:5000/Water/AllProjects'); //goes and fetches the table
        const data = await response.json(); //returns the data in the .json
        console.log("Fetched data:", data); // <-- Add this line
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
}, []);

    return(
        <>
            <h1>Water Projects</h1>
            <br/>
            {projects.map((p) =>
            <div key={p.projectId} id="projectCard">
                <h3>{p.projectName}</h3>
                <ul>
                    <li>Project Type: {p.projectType}</li>
                    <li>Regional Program: {p.projectRegionalProgram}</li>
                    <li>Impact: {p.projectImpact} Individuals Served</li>
                    <li>Project Phase: {p.projectPhase}</li>
                    <li>Functionality Status: {p.projectFunctionalityStatus}</li>
                </ul>
            </div>
            )}
        </>
    );
}

export default ProjectList;