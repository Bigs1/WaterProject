import { useState, createContext } from "react";

// The context is created with `undefined` as its default value.
// The context will be used to pass cart data and functions down to any component that subscribes to it.
const CartContext = createContext(undefined);

// The CartProvider component will manage the cart state and provide it to its child components via context.
export const CartProvider = ({ children }) => {
  // `cart` holds the list of items currently in the cart. Initially, it's an empty array.
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // Set the state by updating the `cart`.
    // This is done with a function that accepts the previous state `prevCart` and returns the updated state.
    setCart((prevCart) => {
      // Check if the item already exists in the cart by looking for an item with the same `projectId`.
      const existingItem = prevCart.find((c) => c.projectId === item.projectId);

      // Create a new cart with the updated item.
      // If the item already exists, we map over the previous cart and update the donation amount.
      const updatedCart = prevCart.map(
        (c) =>
          c.projectId === item.projectId // If the item is already in the cart,
            ? { ...c, donationAmount: c.donationAmount + item.donationAmount } // update its donation amount.
            : c // Otherwise, keep the current item as is.
      );

      // If the item already exists, return the updated cart; otherwise, add the new item to the cart.
      // If `existingItem` is found, we return `updatedCart`; if not, we append the new item to the cart.
      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  // Define the removeFromCart function. It removes an item from the cart.
  // `projectId` is the identifier for the item to be removed.
  const removeFromCart = (projectId) => {
    // Set the cart state to a new array where the item with the given `projectId` is removed.
    // We filter the cart by excluding the item with the matching `projectId`.
    setCart((prevCart) =>
      prevCart.filter((item) => item.projectId !== projectId)
    );
  };

  const clearCart = () => {
    // Reset the `cart` state to an empty array.
    setCart([]);
  };

  // The CartProvider component provides the context to its children.
  // This makes the cart state, and the `addToCart`, `removeFromCart`, and `clearCart` functions accessible to any child component
  // that subscribes to the CartContext.
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children} {/* Render all the children passed to CartProvider */}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
