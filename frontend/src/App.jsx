import "./App.css";
import { CartProvider } from "./Context/CartContext";
import AdminProjectPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import DonationPage from "./pages/DonationPage";
import ProjectsPage from "./pages/ProjectPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ProjectsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route
              path="/donation/:projectName/:projectId"
              element={<DonationPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path ="/admin" element={<AdminProjectPage/>}/>
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
