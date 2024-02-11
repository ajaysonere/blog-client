import { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../contexts/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const Createpost = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null); // Initialize with null
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/posts/${id}`
        );

        setTitle(response?.data.title);
        setDescription(response?.data.description);
      } catch (error) {
        setError(error.response.data.message);
      }

      setLoading(false);
    };
    getPost();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append("title", title);
    postData.append("category", category);
    postData.append("description", description);
    postData.append("thumbnail", thumbnail);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/posts/${id}`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        return navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <section className="create-post">
      <div className="container createpost__container">
        <h2>Create Post </h2>
        {error && <p className="form__error-message">{error}</p>}
        <form className="form create-post__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          />
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png,jpeg,jpg"
          />
          <button type="submit" className="btn primary">
            update
          </button>
        </form>
      </div>
    </section>
  );
};

export default Createpost;
