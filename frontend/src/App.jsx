import "./App.css";
import CartPage from "./pages/CartPage";
import DonationPage from "./pages/DonationPage";
import ProjectsPage from "./pages/ProjectPage";
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<ProjectsPage/>}/>
        <Route path="/projects" element={<ProjectsPage/>}/>
        <Route path="/donation/:projectName?" element={<DonationPage />} />
        <Route path="/cart" element={<CartPage/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
