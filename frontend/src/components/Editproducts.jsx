import React,{useEffect, useState} from 'react';
import axios  from "axios";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';


function Editproducts()
{
//const [product, setProduct] = useState([]);
const [product, setProduct] = useState(null); 
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const location = useLocation();
const productID = location.state;

const [showmessage, setshowMessage] =useState({success :false, message:""})




useEffect(() => {
    // Define an async function to fetch product details
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/viewsingleProduct/${productID}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch product details
    fetchProductDetails();
  }, [productID]); // Dependency array includes productId to refetch if it changes


    const handlechange =(e) =>{
        e.preventDefault();
        const{name ,value} = e.target;
       // setProduct({... product, [name] : value})
       setProduct((preproduct) =>({... preproduct, [name] : value}))


    }


const handlesubmit =async (e) =>{
    e.preventDefault();
   await axios
    .post(`/api/updateproduct/${productID}`,product)
    .then(res=>{
        console.log(res.data.data)
        setshowMessage({success :true ,message:"Updated succesfully"})
        setProduct({name:product.name, price:product.price, description:product.description , category:product.category})
    })
    .catch(error => {
        console.log(error)
        setshowMessage({success :false ,message:"could not update the product"})
      

      })

}


return(

    <div className="container">
                <div className="Heading">
                    <label >Update Product Information</label>
                </div>
                <div>
                    <p></p>
                   
                </div>
                <div className="form-group form-block">
                    <form action="" method="post" onSubmit={handlesubmit} >
                        <input type="text" name="name" id="name" placeholder="Product Name" 
                        className="form-control" required value={product.name}  onChange={handlechange}/>


                        <input type="number" name="price" id="price" placeholder="Product Price"
                         className="form-control" required value={product.price} onChange={handlechange}/>
            
                        <textarea name="description" id="description" placeholder="Product Description"
                         className="form-control" required value={product.description} onChange={handlechange}>
                        </textarea>
                        <input type="text" name="category" id="category" onChange={handlechange}
                        placeholder="Product Category" value={product.category}  className="form-control" required/>

                        <button type="submit" className="btn btn-primary form-submit">UPDATE</button>


                    
                    </form>

                    {
                        showmessage == true  ?(
                            <div className="container mt-5 bg-success text-white">
                                {showmessage.message}
                            </div>
                        ) :(
                            <div className="container mt-5 bg-danger text-white">
                                {showmessage.message}
                            </div>
                        )
                    }
                 </div>
            </div>



)
}

export default Editproducts;


