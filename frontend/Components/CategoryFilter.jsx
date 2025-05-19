import { useEffect, useState } from "react";
import  "./CategoryFilter.css"

function CategoryFilter({selectedCategories, setSelectedCategories}) { //recieving wether a checkbox has been changed or not and sends the information back to the parent (App) to then send to the project list and display the correct items
  const [categories, setCategories] = useState([]); //our categories are a string array

  useEffect(() => {
    //goes and grabs the data when we need to. only looks for changes in the dom, not the server
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

function handleCheckboxChange(event) {
  const { value, checked } = event.target; //get the checkbox value and whether it's checked

  const updatedCategories = checked //if checked, add to selectedCategories. if unchecked, remove it.
    ? [...selectedCategories, value] //add the selected category if the box is checked
    : selectedCategories.filter((c) => c !== value);//remove the deselected category if the box gets unchecked

  setSelectedCategories(updatedCategories); //updates the parent to the new selected categories list
}

  return(
    <div className="category-filter">
        <h5>Project Types</h5>
        <div className="category-list">
            {categories.map(categoryElements => (
                <div className = "category-item" key = {categoryElements}>
                    <input className="category-checkbox" type='checkbox' id = {categoryElements} value = {categoryElements} onChange={handleCheckboxChange}/>
                    <label className="category-text" htmlFor = {categoryElements}> {categoryElements} </label>
                </div>
            ))}
        </div>
    </div>
  );
}

export default CategoryFilter;
