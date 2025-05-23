import { useState } from "react";
import ProjectList from "../Components/ProjectList";
import CategoryFilter from "../Components/CategoryFilter";
import Header from "../Components/Header";
import "./ProjectPage.css";
import CartSummary from "../Components/CartSummary";
import { useNavigate } from "react-router-dom";

function ProjectsPage() {
  const [count, setCount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchInput, setSearchInput] = useState(""); //input from the searchbar
  const navigate = useNavigate(); //imported from react router dom to change pages
  return (
    <>
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
          onClick={() => navigate(`/admin`)}
        >
          Admin
        </button>
      </div>
      <div className="container mt-4">
        <CartSummary />
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
          <input // searchbar for user input
            type="text"
            className="form-control mb-3"
            placeholder="Search projects..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <ProjectList selectedCategories={selectedCategories} searchInput={searchInput}/>
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
