import mongoose from "mongoose";

const productSchema = new mongoose.Schema({  
    model: String,
    price: Number,
    manufacturing_year: Number,
    origin: String
})

//here first we take a variable name productschema . This variable stores a "new" mongoose schema. This new schema take a object as a parameter. IN this object we have to declare all key's data type. Here data typ's first letter will be capital as "String", "Number".
export const Product = mongoose.models.products || mongoose.model("products", productSchema)

//IN this line we export our declared schema so that with this schema data will store in database. Here we export a variable 'Product' . In Mongoose.model("products"), 'products' is a collection name that is on mongo db. before or(||) mongoose.models.products  line is for if scheaa is already created in database then dont create it. otherwise create it. 