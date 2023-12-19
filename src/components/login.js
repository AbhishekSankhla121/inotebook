import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
  let navigate = useNavigate();
    const host ="http://localhost:5000"
    const [credential,setcredential] = useState({email:"",password:""});
    const handelChange= async(e)=>{
        e.preventDefault();
        const login_response = await fetch(`${host}/api/auth/userlogin`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({email:credential.email,password:credential.password})
        })  
        const json = await login_response.json();
        console.log(json);
        if(json.success){
          // redirect
          localStorage.setItem("token",json.JWT_data);
          console.log(localStorage.token);
          navigate("/")
        }
        else{
          // /redirect
          console.log("/exit")
        }
    
    }
      // using react use state hook to store the email and password //

      const onChange = (e) =>{
      setcredential({...credential,[e.target.name]:e.target.value})
      console.log(credential); // Add this line
     
      }      

    return(<>
    <form onSubmit={handelChange}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control email" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control password" id="exampleInputPassword1" name="password" onChange={onChange}/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>)
}