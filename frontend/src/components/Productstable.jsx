import React,{useEffect, useState} from 'react';
import axios from 'axios'

import { Navigate, useNavigate } from 'react-router-dom';

function Productstable(){
const [products, setProducts] = useState([])
const Navigate = useNavigate();
var ProductId = null
const [showMessage , setshoemessage] =  useState({success:false,message:""})
useEffect(()=>{
const fetchProducts = async() =>{
    try{
        const response =await axios.get("/api/viewallProducts");
        setProducts(response.data.data);
    }catch(error)
    {
        console.error("Error fetching products:",error);
    }
    };
    fetchProducts();
}, []);

const deleteproduct = async(e) =>{
    ProductId =  e;
   var status =  prompt("Are you sure you want to detete product");
   console.log(status);
   if(status === "yes"){
        await axios.delete(`/api/deletesingleProduct/${ProductId}`)
        .then(res => {
            setProducts(products.filter((product) =>product._id !=ProductId))

            setshoemessage({success:true,message:"deleted succesfully"})
        })
        .catch(error =>{
            setshoemessage({success:false,message:"not deleted"})
        })
   } 

}

return(
<div> 
    <div className="container">
<table className="table">
<thead className="thead-dark">
    <tr className="productheader">
        <th scope='col'> id</th>
        <th scope='col'> Name</th>
        <th scope='col'> Price</th>
        <th scope='col'> Description</th>
        <th scope='col'> category</th>
        <th scope='col' colSpan={2}>Action</th>
    </tr>
</thead>
<tbody>
   
    {products.map((product, index)=> (
         <tr key ={product._id}>
            <td>{index}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td>{product.category}</td>
            <td><button className="btn btn-primary" onClick={() =>Navigate(`/editproduct/` ,{state :product._id})} >EDIT</button></td>
            <td> <button className="btn btn-danger" onClick={() =>deleteproduct(product._id)} >Delete</button></td>
        </tr>
      ) )}

    
</tbody>

</table>

                {
                showMessage == true  ?(
                            <div className="container mt-5 bg-success text-white">
                                {showMessage.message}
                            </div>
                        ) :(
                            <div className="container mt-5 bg-danger text-white">
                                {showMessage.message}
                            </div>
                        )
                 }
</div>
</div>


   
     
);

}

export default Productstable;