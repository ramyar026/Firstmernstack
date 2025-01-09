
import React ,{useState ,useEffect} from 'react'
import axios from 'axios';


function Profile() {
    const[user, setUser] = useState({username :"", email:""})
    
    const token = localStorage.getItem("token")

    useEffect(()=>{
        const fetchProducts = async() =>{
            try{
               
                const response =await axios.get("api/users/profile", {
                      headers : {"Authorization":`bearer ${token}`}});
                      const[username ,email] = response.data;
                      setUser({username:username ,email:email})
                    
            }catch(error)
            {
                console.error("Error fetching users:",error);
            }
            };
            fetchProducts();
        }, []);

  return (
    <div className="container">
       <div className="col-md-4">
            <div className="card">
            <div className="card-body">
                        <h5 className="card-title">{user.username}</h5>
                        <p className="card-text">{user.email}</p>
                        <p className="card-text"></p>
                       
                      </div>
            </div>
        </div>  
    </div>
  )
}

export default Profile
