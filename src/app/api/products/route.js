import { Product } from "@/libs/schema/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//API route for this file is app>api>products[it will return all data in database]
// before connecting to mongo db first we have to create schema on libs>schema>Product.js

export async function GET(){

    await mongoose.connect(process.env.MongoDB) //here mongoose library function connect () is connecting with process.env.mongoDB.

    const data = await Product.find();// In this line it defines in Product named Schema find all data and store it in data variable.Product is imported from schema file. Product will return promise thats why we have to add await.
    

    return NextResponse.json({result:data,status:true});//here as a result data is returning
}

export async function POST(request,content){
    await mongoose.connect(process.env.MongoDB) //connected to mongoDB
    const payload =await request.json()

    const product = new Product(payload)

    const result = product.save();
    // console.log("result",result)
    return NextResponse.json({result:"record added successfully",status:true})
}