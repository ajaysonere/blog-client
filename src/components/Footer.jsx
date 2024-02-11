import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <ul className="footer__container">
        <li>
          <Link to="/posts/categories/Agriculture">Agriculture</Link>
        </li>
        <li>
          <Link to="/posts/categories/Business">Business</Link>
        </li>
        <li>
          <Link to="/posts/categories/Education">Education</Link>
        </li>
        <li>
          <Link to="/posts/categories/Entertainment">Entertainment</Link>
        </li>{" "}
        <li>
          <Link to="/posts/categories/Art">Art</Link>
        </li>{" "}
        <li>
          <Link to="/posts/categories/Invesment">Invesment</Link>
        </li>
        <li>
          <Link to="/posts/categories/Wheather">Weather</Link>
        </li>
        <li>
          <Link to="/posts/categories/Uncategorized">Uncategorized</Link>
        </li>
      </ul>
      <div className="footer__copyright">
        <small>All rights reversed &copy; Copyright , Ajay</small>
      </div>
    </footer>
  );
}

export default Footer;