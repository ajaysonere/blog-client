import { useState , useEffect } from 'react';
import {Link} from 'react-router-dom';
import Loader from '../components/Loader';
import axios from 'axios';




const Authors = () => {

    const [authors , setAuthors] = useState([]);
    const [loading , setLoading] = useState(false);
    
    useEffect(()=> {
      const getAuthors = async() => {
         setLoading(true);
         try {
            const response  = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/authors`);
            setAuthors(response?.data);
         } catch (error) {
            console.log(error);
         }
         setLoading(false);
      }
      getAuthors();
    } , [])
    
    if(loading){
       return <Loader />
    }
    
    return (
       <section className="authors">
          {
            authors.length > 0 ? <div className='container authors__container'>
               {
                  authors.map(({_id:id, avatar , name , posts }) => {
                     return (
                       <Link
                         key={id}
                         to={`/posts/users/${id}`}
                         className="author"
                       >
                         <div className="author__avatar">
                           <img
                             src={`${
                               import.meta.env.VITE_REACT_APP_ASSETS_URL
                             }/uploads/${avatar}`}
                           />
                         </div>
                         <div className="author__info">
                           <h4>{name}</h4>
                           <p>{posts}</p>
                         </div>
                       </Link>
                     );
                  })
               }
            </div> : <h2 className='center'>No Users / Authors Found </h2>
          }
       </section>
    );
};

export default Authors;