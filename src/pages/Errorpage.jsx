import { Link } from "react-router-dom"

const Errorpage = () => {
  return (
    <section className="error__page">
       <div className="center">
          <Link to="/" className="btn primary">Go To Home </Link>
          <h2>Page Not Found </h2>
       </div>
    </section>
  )
}

export default Errorpage;