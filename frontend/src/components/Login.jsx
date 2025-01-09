import React, { useState } from 'react'
import axios from 'axios'

function Login() {
    const[email, setEmail] = useState([])
    const[password, setPassword] =useState([])
    let handlesubmit = async(e)=>{
    e.preventDefault();
    try{
        const response = await axios.post("api/users/login", {email, password})
        alert(response.data.message)
        localStorage.setItem("token",response.data.token);


    }catch(error)
    {
        console.log(error)
        alert("Could not Login");
    }

}

  return (
    <div className='container'>

    <form>


    </form>

      
    </div>
  )
}

export default Login
