
import React,{useEffect, useState} from 'react';
import axios from 'axios'
import { CgAddR } from "react-icons/cg";
import { Navigate, useNavigate } from 'react-router-dom';

function Viewproducts(){
const [products, setProducts] = useState([])
const Navigate = useNavigate();
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

return(
    <div>
        <div className="container mt-4">
            <h3 className="mt-4">Products List</h3>
            <div className="row">
                {products.map((products)=>(
                    <div className="col-md-4" key={products._id}>
                    <div className="card">   
                    <div className="card-body">
                        <h5 className="card-title">{products.title}</h5>
                        <p className="card-text">{products.description}</p>
                        <p className="card-text"><strong>Price :</strong>${products.price}</p>
                        <p className="card-text">
                            <small className="text-muted">
                            Category:{products.category}
                        </small>
                            </p>
                      </div>  
                    </div>
                    </div>
                   
                ))}
            </div>

            <div className="row">
            <div className="card col-md-4 navigatebtn" onClick={() =>Navigate('/insert')} >
                <div className="card-body">
                    <CgAddR /><span>Add Products</span>
                </div>
            </div>
            </div>
        
        </div>

        


   </div>
   
);

}

export default Viewproducts;