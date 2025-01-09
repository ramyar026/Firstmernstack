import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from  './model/product.model.js'
import userRoute from './routes/user.route.js'

dotenv.config();
const PORT = process.env.PORT;
const mongo_url = process.env.MONGODB_URL;

console.log(mongo_url);
const app = express();
app.use(express.json());//req and res in json format
app.use(cors()); // for frontend integration
app.listen(PORT,()=>{
    console.log("SERVER is Running:" +PORT);
});

mongoose
.connect(mongo_url)
.then(res =>console.log("database connected"))
.catch(err =>console.log("database connection error"))



//Insertion
app.post('/api/insertproduct', async (req, res) => {
    const product = req.body;
    if(!product.name || !product.price || !product.description || !product.category)
    {
        res.status(400).json({
            success : false,
            data: "please provide all the fields"
        })
    }

    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(200).json({
            success:true,
            data :newProduct
        })
    } catch(err){
        res.status(500).json({
            success : false,
            data: "Coulld not Insert the Products"
        })

    }


})

//displaying all the products
app.get('/api/viewallProducts',async(req,res)=>{
    try{
        const products = await Product.find({});
        if(!products)
        {
            res.status(404).json({
                success:false,
                data:"no Products found"
            })
        }

        res.status(200).json({
            success:true,
            data:products
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            data:"data not found"
        })

    }

})

//displaying a single products

app.get('/api/viewsingleProduct/:id',async(req,res)=>{

    const  { id } =req.params;
    try{
        const products = await Product.find({"_id" :id});
        if(!products)
        {
            res.status(404).json({
                success:false,
                data:"no Products found"
            })
        }

        res.status(200).json({
            success:true,
            data:products
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            data:"data not found"
        })

    }

})

//updation of products using put method
app.put('/api/updateproduct/:id',async(req,res)=>{
const {id} =req.params;
const product = req.body;
if(!product && !id)
{
    res.status(400).json({
        success:false,
        data: "product to be updated not present"
    })
}

try{
const updatedproduct = await Product.findByIdAndUpdate(id ,product)

    if(!updatedproduct)
    {
        res.status(404).json({
            success:false,
            data:"no Products found"
        })
    }

    res.status(200).json({
        success:true,
        data:updatedproduct
    })

}
catch(error){
    res.status(500).json({
        success:false,
        data:"failed to update"
    })

}


})

//Deletion of product

//677260fda98ed4f1bbe17fc0
app.delete('/api/deletesingleProduct/:id',async(req,res)=>{

    const  { id } =req.params;
    try{
        const deleteproduct = await Product.findByIdAndDelete({"_id" :id});
        if(!deleteproduct)
        {
            res.status(404).json({
                success:false,
                data:"no Products found"
            })
        }

        res.status(200).json({
            success:true,
            data:deleteproduct
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            data:"data not found"
        })

    }

})

app.use("/api/users/", userRoute) 