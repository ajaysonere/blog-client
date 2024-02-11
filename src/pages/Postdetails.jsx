import { Link, useParams } from "react-router-dom";
import Postauthors from "../components/Postauthors";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import Loader from "../components/Loader";
import Deletepost from "../pages/Deletepost";
import axios from "axios";

const Postdetails = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/posts/${id}`
        );

        setPost(response?.data);
      } catch (error) {
        setError(error.response.data.message);
      }
      setLoading(false);
    };

    getPost();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="post-details">
      {error && <p className="error"> {error} </p>}
      {post && (
        <div className="container post-details__container">
          <div className="post-details__header">
            <Postauthors creator={post.creator} createdAt={post.createdAt} />
            {currentUser?.id == post?.creator && (
              <div className="post-details__buttons">
                <Link to={`/posts/${post?._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <Deletepost postId={id} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post-details__thumbnails">
            <img
              src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${
                post?.thumbnail
              }`}
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
        </div>
      )}
    </section>
  );
};

export default Postdetails;
