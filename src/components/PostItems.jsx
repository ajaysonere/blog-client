/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Postauthors from "./Postauthors";

const PostItems = ({
  postID,
  title,
  category,
  desc,
  creator,
  thumbnail,
  createdAt,
}) => {
  const shortDescription =
    desc.length > 100 ? desc.substr(0, 100) + "..." : desc;
  const shortTitle = title.length > 30 ? title.substr(0, 30) + "..." : title;

  const url = `${
    import.meta.env.VITE_REACT_APP_ASSETS_URL
  }/uploads/${thumbnail}`;

  return (
    <article className="post">
      <div className="post__thumbnail">
        <img src={url} alt="image"></img>
      </div>
      <div className="post__content">
        <Link to={`/posts/${postID}`}>
          <h3>{shortTitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{ __html: shortDescription }}></p>
        <div className="post__footer">
          <Postauthors creator={creator} createdAt={createdAt} />
          <Link to={`/posts/categories/${category}`} className="btn category">
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItems;
