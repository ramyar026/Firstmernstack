import mongoose from 'mongoose';

//creating the Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type:  String,
        required: true,
    },
    category :{
        type: String, //dropdown

        required:true,
    }
},
    {
        timestamp: true,

    }
)
const Product = mongoose.model("products",productSchema);
export default Product;