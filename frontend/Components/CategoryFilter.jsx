import { useEffect, useState } from "react";
import  "./CategoryFilter.css"

function CategoryFilter() {
  const [categories, setCategories] = useState([]); //our categories are a string array

  useEffect(() => {
    //goes and grabs the data when we need to. Only looks for changes in the dom, not the server
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://localhost:5000/Water/GetProjectTypes`
        );
        const data = await response.json(); //returns the data in the .json
        console.timeLog('Fetched categories: ', data); //log the categories we obtained
        setCategories(data); //set our categories equal to the data that we returned
      } catch {
        console.error("Error fetching the categories", error); //prints out the error in the console
      }
    };

    fetchCategories();
  }, []);

  return(
    <div className="category-filter">
        <h5>Project Types</h5>
        <div className="category-list">
            {categories.map(categoryElements => (
                <div className = "category-item" key = {categoryElements}>
                    <input className="category-checkbox" type='checkbox' id = {categoryElements} value = {categoryElements}/>
                    <label htmlFor = {categoryElements}> {categoryElements} </label>
                </div>
            ))}
        </div>
    </div>
  );
}

export default CategoryFilter;
