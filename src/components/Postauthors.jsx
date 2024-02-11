import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

// eslint-disable-next-line react/prop-types
const Postauthors = ({ creator, createdAt }) => {

  const [author, setAuthor] = useState({});
  
  

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/${creator}`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, []);
  

  return (
    <div>
      <Link to={`/posts/users/${author?._id}`} className="post__author">
        <div className="post__author-avatar">
          <img
            src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${
              author?.avatar
            }`}
          />
        </div>
        <div className="post__author-details">
          <h5>By: {author?.name}</h5>
          <small>
            <ReactTimeAgo date={createdAt} locale="en-IN" />
          </small>
        </div>
      </Link>
    </div>
  );
};

export default Postauthors;
