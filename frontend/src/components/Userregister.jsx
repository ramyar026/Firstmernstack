import React , {useState, useEffect} from "react";
import axios  from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Userregister(){
    const [username ,setUsername] = useState('');
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const navigate = useNavigate();
    async function handleSubmit(e){

        e.preventDefault();
        console.log("hgsdjhgdf");
        try{
            const response = await axios.post("http://localhost:5000//api/users/register",{username, email,password});
            console.log(response.data.message);
            setTimeout(()=>{
                Navigate("/login");
            }, 5000)
        } catch(error)
        {
                console.log(error)
        }
    }


    return(
        <div className="container">
            <div className="Heading">
                <label >Register</label>
            </div>




<form className="mx-1 mx-md-4" method ="post" onSubmit={handleSubmit}>

<div className="d-flex flex-row align-items-center mb-4">
  <i className="fas fa-user fa-lg me-3 fa-fw"></i>
  <div data-mdb-input-init className="form-outline flex-fill mb-0">
  <label className="form-label">Your Name</label>
    <input type="text" id="username" name="username" className="form-control" 
    value={username} onChange={(e=>setUsername(e.target.value))} />
    
  </div>
</div>

<div className="d-flex flex-row align-items-center mb-4">
  <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
  <div data-mdb-input-init className="form-outline flex-fill mb-0">
  <label className="form-label" >Your Email</label>
    <input type="email" id="email" username="email" className="form-control"  value={email}
    onChange={(e=>setEmail(e.target.value))}/>
    
  </div>
</div>

<div className="d-flex flex-row align-items-center mb-4">
  <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
  <div data-mdb-input-init className="form-outline flex-fill mb-0">
  <label className="form-label">Password</label>
    <input type="password" id="password" name="password" className="form-control" value={password}
    onChange={(e=>setPassword(e.target.value))} />
    
  </div>
</div>





<div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
  <button  type="submit" data-mdb-button-init data-mdb-ripple-init 
  className="btn btn-primary btn-lg" >Register</button>
</div>

</form>








        </div>

)

}



export default Userregister;