import { useContext, useEffect} from "react";
import { UserContext } from "../contexts/userContext";
import {useNavigate} from 'react-router-dom';

const Logout = () => {
    
    const {setCurrentUser} = useContext(UserContext);
    
    const navigate = useNavigate();
    
    setCurrentUser(null);
    
    
    useEffect(()=> {
       navigate("/login");
    } , [navigate]);
    

    return (
       <></>
    );
};

export default Logout;
