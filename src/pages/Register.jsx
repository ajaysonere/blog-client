import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/register`,
        userData,
      );

      const newUser = await response.data;

      if (!newUser) {
        setError("Count not register");
      }
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Sign up </h2>
        <form className="form register__form" onSubmit={handleRegister}>
          {error && <p className="form__error-message">{error}</p>}
          <input
            type="text"
            placeholder="full name"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
            autoFocus
          />
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
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={changeInputHandler}
            autoFocus
          />
          <button type="submit" className="btn primary">
            Register
          </button>
        </form>
        <small>
          Already have an account ? <Link to="/login">sing in</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;