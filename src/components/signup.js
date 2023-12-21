import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Signup(){
    const navigate =  useNavigate();
    const host = "http://localhost:5000"
    const [credentials,setcredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const onSubmit= async(e)=>{
          e.preventDefault();
          const {name ,email,password,cpassword} = credentials;
          console.log(name,email,password,cpassword);
          const response = await fetch(`${host}/api/auth/createuser`,{
            method:"POST"
            ,headers:{"Content-Type":"application/json"}
            ,body:JSON.stringify({name:name,email:email,password:password})
        });
       const json = await response.json();
       if(json.success){
         localStorage.setItem("token",json.JWT_data);
         navigate("/");
       }
       else{
         alert(json.errors[0].msg);
       }
    }
    const onChange = (e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    
    return(<>
    <form onSubmit={onSubmit}>
 
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" onChange={onChange}/>
  </div>
 
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">email</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={onChange}/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange}/>
  </div>
 
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">confirm Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="cpassword" onChange={onChange}/>
  </div>

  <button type="submit" style={{textAlign:"center", color:"yellow"}}className="btn btn-danger">Signup</button>
</form>
    </>)
}