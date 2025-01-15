
import React , {useState, useEffect} from "react";
import axios  from "axios";
import { Navigate ,useNavigate } from "react-router-dom";

//function for adding products
function Addproducts(){

    const [product, setProduct] =useState({name:"", price:0, description:"" , category:""})
    const [showMessage, setshowmessage] =useState({success:false,message:""})
    const Navigate = useNavigate();
    const handlechange =(e) =>{
        e.preventDefault();
	    const{name ,value} = e.target;
        setProduct({... product, [name] : value})
    }
    


    const handlesubmit =async (e) =>{
        e.preventDefault();
       await axios
        .post("/api/insertproduct",product)
        .then(res=>{
            console.log(res.data.data)
            setshowmessage({success :true ,message:"inserted succesfully"})
            setProduct({name:"", price:0, description:"" , category:""})
        })
        .catch(error => {
            console.log(error)
            setshowmessage({success :false ,message:"could not insert the product"})
          

          })

    }


    
    return(
            <div className="container">
                <div className="Heading">
                    <label >Add Product Information</label>
                </div>
                <div className="form-group form-block">
                    <form action="" method="post" onSubmit={handlesubmit} >
                        <input type="text" name="name" id="name" placeholder="Product Name" 
                        className="form-control" required value={product.name}  onChange={handlechange}/>


                        <input type="number" name="price" id="price" placeholder="Product Price"
                         className="form-control" required value={product.price} onChange={handlechange}/>
            
                        <textarea name="description" id="desc" placeholder="Product Description"
                         className="form-control" required value={product.description} onChange={handlechange}>
                        </textarea>
                        <input type="text" name="category" id="category" onChange={handlechange}
                        placeholder="Product Category" value={product.category}  className="form-control" required/>

                        <button type="submit" className="btn btn-primary form-submit">Insert</button>
                        
                        <button type="button" className="btn btn-primary" onClick={() =>Navigate('/productlist')}>Product LIST</button>


                    
                    </form>

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


    )

}

export default Addproducts;