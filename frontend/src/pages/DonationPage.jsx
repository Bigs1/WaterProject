import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";
import { useCart } from "../Context/CartContext"; //gives access to cart operations in the CartContext file

function DonationPage() {
  const navigate = useNavigate(); //allows us to change routes
  const { projectName, projectId } = useParams(); //extracts routes
  const { addToCart } = useCart(); //adds the use of cart operations in this file
  const [donationAmount, setDonationAmount] = useState(0); //stores the donation amount

  const handleAddToCart = () => { //THIS IS WHERE WE CREATE A NEW ITEM TO ADD TO THE CART
    const newItem = {
      // Creates a new cart item object with required properties.
      projectId: Number(projectId), // Ensure projectId is returned as a number
      projectName: String(projectName) || 'No Project Found', // The name of the project will be a string, if we dont have one, default to no project found
      donationAmount: Number(donationAmount), //Ensure the donation is stored as a number
    };
    addToCart(newItem); //adds items to the cart
    navigate("/cart"); //redirects to the car page after adding the item
  };

  return (
    <>
      <Header />
      <h2>Donate to {projectName}</h2>

      <div>
        <input
          type="number"
          placeholder="Enter donation amount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(Number(e.target.value))}
        />
        <button onClick={handleAddToCart}>Add to cart</button>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </>
  );
}

export default DonationPage;
