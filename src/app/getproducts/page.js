'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


const GetProducts = () => {

    const[productlist,setproductlist] = useState([]);

    useEffect(() => {
     getProductList()
      }, []);

      const getProductList = async()=>{
        try {
            const resp = await axios.get("http://localhost:3000/api/products")
            
            setproductlist(resp?.data?.result)
        } catch (error) {
            console.log("try-catch error",error)
        }
      }

    return ( 
        <div>
            <h1>Product List</h1>
            <ol>
                {console.log(productlist)}
                {productlist.map((item,index)=>(
                <li key={index}><Link href={`/getproducts/${item._id}`}>{item.model}</Link></li>
                ))}
               
            </ol>
        </div>
     );
}
 
export default GetProducts;