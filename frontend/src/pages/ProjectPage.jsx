import { useState } from "react";
import ProjectList from "../Components/ProjectList";
import CategoryFilter from "../Components/CategoryFilter";
import Header from "../Components/Header";
import "./ProjectPage.css";

function ProjectsPage() {
  const [count, setCount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  return (
    <>
      <div className="container mt-4">
        <Header />
      </div>
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <ProjectList selectedCategories={selectedCategories} />
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
