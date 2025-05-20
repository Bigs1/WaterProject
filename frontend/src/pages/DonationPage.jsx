import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Components/Header';

function DonationPage(){ //making a donation screen
    const navigate = useNavigate();
    const {projectName} = useParams(); //use a parameter here that we call project name
    return(
        <>
        <Header/>
        <h2>Donate to {projectName}</h2>

        <div>
            <input type="number" placeholder="Enter donation amount" />
            <button onClick={()=> navigate("/cart")}>Add to cart</button>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
        </>
    );
}

export default DonationPage;