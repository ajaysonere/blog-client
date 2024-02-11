import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Deletepost from "./Deletepost";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const token = currentUser?.token;

  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/posts/users/${id}`
        );
        const data = await response.data;
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getData();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="dashboard">
      {posts.length > 0 ? (
        <div className="container dashboard__container">
          {posts.map((post , index) => {
            return (
              <article key={index} className="dashboard__post">
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img
                      src={`${
                        import.meta.env.VITE_REACT_APP_ASSETS_URL
                      }/uploads/${post.thumbnail}`}
                    />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard__post-action">
                  <Link to={`/posts/${post._id}`} className="btn sm">
                    View
                  </Link>
                  <Link to={`/posts/${post._id}/edit`} className="btn primary">
                    Edit
                  </Link>
                  <Deletepost postId={post._id} />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h2 className="center">You Hava no Posts </h2>
      )}
    </section>
  );
};

export default Dashboard;
