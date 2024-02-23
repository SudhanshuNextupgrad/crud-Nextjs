//this file contains those functions who recieved a id because it is on one by one.
import { Product } from "@/libs/schema/product";//this is a schema. Means a structure of data to be save in database.
import axios from "axios";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {

     const userID = content.params.id;

     await mongoose.connect(process.env.MongoDB)

     let alldata = await axios.get("http://localhost:3000/api/products")

     // alldata = await alldata.json()

     // console.log("ALL DATA", alldata.data.result)

     const singleProduct  = alldata?.data?.result?.filter((item)=>item._id==userID)

     // console.log("single product",singleProduct)

     // const singleData = alldata

     // const data = await Product.find();

     return NextResponse.json({ result: singleProduct, status: true })
}

export async function PUT(request,content){
     //first we will get request and convert it in json() format. this request contains that data which needs to updated.
     let req = await request.json();
     //After that we connect mongoDB database with connection string[process.env.mongodb].
     await mongoose.connect(process.env.MongoDB);
     //Then we import schema for database[Product] and after then use findOneAndUpdate() built in function . In this function , first parameter is a object that contains item's id , second parameter is a request that needs to be updated.
     const result = await Product.findOneAndUpdate({_id:content.params.id},req);
     
     return NextResponse.json({result:"Record Updated Successfully!",success:true});
}

export async function DELETE(request,content){

     // let data = await request.json();
     // console.log("delete data",data);
     // console.log("delete id",content.params.id);
     const id=content.params.id;

     await mongoose.connect(process.env.MongoDB);

     const Result = await Product.deleteOne({_id:id})

     return NextResponse.json({result:Result,status:"Item deleted successfully!",success:true},{status:200,statusText:"hahaha"})
}