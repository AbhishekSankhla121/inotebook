import React ,{useEffect} from "react";
import { Link , useLocation, useNavigate} from "react-router-dom";


export default function Navbar(props){
  const navigate = useNavigate();
  const {showalert} = props;
  const handlelogout =()=>{
    localStorage.removeItem('token');
    showalert("success","Logout User Sucessfully");
    navigate('/login')

  } 
  let location = useLocation();
  useEffect(()=>{

  },[location])
    return(
        <>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotbook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
   

   <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {localStorage.token && (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/About"?"active":""}`} to="/About">About_us</Link>
        </li>
      </ul>)}
   
      {!localStorage.token ?<form className="d-flex ms-auto" role="search">
        <Link className="btn btn-outline-success mx-1" type="submit"  to="/login">login</Link>
        <Link className="btn btn-outline-success mx-1" type="submit"  to="/signup">Signup</Link>
      </form>:<button className="btn btn-danger mx-2" style={{color:"white"}} onClick={handlelogout}>Logout</button>}
    </div>
  </div>
</nav>
        </>
    )
}