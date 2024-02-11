import PostItems from "./PostItems";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/posts`
        );

        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      
      
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(
            ({_id: id, thumbnail, category, title, description, creator , createdAt} , index) => (
              <PostItems
                key={index}
                postID={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                desc={description}
                creator={creator}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">Posts Not Found</h2>
      )}
    </section>
  );
};

export default Posts;
