

import mongoose from "mongoose";


const productSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true,
        unique:true
    },
    url:String,
    detailUrl:String,
    title:Object,
    price:Object,
    quantiti:String,
    description:String,
    discount:String,
    tagline:String

});

const Product = mongoose.model('products', productSchema)

export default Product;