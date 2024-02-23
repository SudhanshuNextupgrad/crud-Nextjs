import Link from "next/link";

const Home = () => {
  return (
    <div  className="container">
      <h1>This is home page</h1>
      <div className="row">
        <div className="col">
          
          <Link href='/addproduct'>Add Product</Link><br/>
          <Link href='/getproducts'>View Products</Link>
        </div>
      </div>
      

    </div>

  );
}

export default Home;