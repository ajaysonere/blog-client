import { Link , useNavigate} from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import Loader from '../components/Loader';

const Userprofile = () => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const [error , setError] = useState("");
  const [loading , setLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const id = currentUser?.id;
  const token = currentUser?.token;
  

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      console.log("Hello");
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/change-avatar`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response?.data.avatar)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
      const getData = async() => {
          setLoading(true);
          try {
              const response = await axios.get(
                `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/${id}`
              );

              const data = await response?.data;
              setName(data.name);
              setEmail(data.email);
              setAvatar(data.avatar);
          } catch (error) {
            setError(error.response.data.message);
          }
          setLoading(false);
      }
      getData();
  }, [])
  
  
  const handleUpdateDetails = async(e) => {
     e.preventDefault();
     try {
          const userData = new FormData();
          userData.set("name" , name);
          userData.set("email", email);
          userData.set("currentPassword" , currentPassword),
          userData.set("newPassword" , newPassword);
          userData.set("confirmPassword" , confirmPassword);
          
          const response = await axios.patch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/edit-user` , userData , {withCredentials: true , headers: {Authorization: `Bearer ${token}`}});
          
          if(response.status == 200){
             navigate("/logout");
          }
          
     } catch (error) {
        setError(error.response.data.message);
     }
  }
  
  
  
  if(loading){
    return <Loader />
  }

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${id}`} className="btn ">
          My Posts
        </Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img
                src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${avatar}`}
              />
            </div>
            {/* form update avatar */}
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="png , jpeg , jpg"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
                <FaEdit />
              </label>
            </form>
            {isAvatarTouched && (
              <button
                className="profile__avatar-btn"
                onClick={() => changeAvatarHandler()}
              >
                <FaCheck />
              </button>
            )}
          </div>
          <h1>{currentUser.name}</h1>

          {/* form for update the profile data */}

          <form className="form profile__form" onSubmit={handleUpdateDetails}>
            {error && <p className="form__error-message">{error}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="btn primary">
              Update Details{" "}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Userprofile;
