/* eslint-disable react/no-unescaped-entities */
import { useState , useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../contexts/userContext";

const Login = () => {
  const [error , setError] = useState("");
  const navigate = useNavigate();
  const {setCurrentUser} = useContext(UserContext);
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]:e.target.value};
    });
  };

  const handleSubmit = async(e) => {
     e.preventDefault();
     
     try {
       const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/login`, userData);
       
       const user = await response.data;
       
       if(!user){
         setError("Could not login");
       }
       setCurrentUser(user);
       navigate("/");
       
     } catch (error) {
      setError(error.response.data.message);
     }
  }

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In </h2>
        <form className="form login__form" onSubmit={handleSubmit}>
          {error && <p className="form__error-message">{error}</p>}
          <input
            type="email"
            placeholder="example@gmail.com"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
            autoFocus
          />
          <button type="submit" className="btn primary">
            Login
          </button>
        </form>
        <small>
          Don't have an account ? <Link to="/register">sing up</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
