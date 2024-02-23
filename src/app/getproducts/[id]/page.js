'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const SingleProduct = ({ params }) => {

    const [Model, setModel] = useState('');
    const [Price, setPrice] = useState('');
    const [manufYear, setManuYear] = useState('');
    const [Origin, setOrigin] = useState('');
    const[refresh,setRefresh] = useState('')


    // console.log("params", params.id);
    const userID = params.id;
    const route = useRouter();



    useEffect(() => {
        // setUserId(params.id);
        getSingleProduct();

    }, [refresh]);

    const updateProduct = async (event) => {
        
        // event.preventDefault();

        try {
            
            const resp = await axios.put(`http://localhost:3000/api/products/${userID}`, {
                model: Model,
                price: Price,
                origin: Origin,
                manufacturing_year: manufYear

            })

            alert(resp?.data?.result)
            console.log(" put resp", resp)
            setRefresh(Math.random)
            route.push("/getproducts")
        } catch (error) {
            console.log("try-catch error", error)
        }
    }
    const deleteProduct = async() => {
        console.log("delete id", userID)
        try {
            const resp = await axios.delete(`http://localhost:3000/api/products/${userID}`)
            console.log("DELETE resp",resp)
            alert(resp?.data?.status)
            route.push("/getproducts")
        } catch (error) {
            console.log("try-catch error",error)
        }
    }
    const getSingleProduct = async () => {
        try {
            console.log("user id", userID)
            const resp = await axios.get(`http://localhost:3000/api/products/${userID}`)
            let single = resp?.data?.result
            setManuYear(single[0].manufacturing_year)
            setModel(single[0].model)
            setOrigin(single[0].origin)
            setPrice(single[0].price)

        } catch (error) {
            console.log("try-catch error", error)
        }
    }
    return (
        <div className="container border mt-5 p-3 " style={{ background: "lightgray" }}>
            <h2 className="text-center">Product Details</h2>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Model Name</Form.Label>
                        <Form.Control type="text" value={Model} onChange={(e) => setModel(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Model Price</Form.Label>
                        <Form.Control type="number" value={Price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Model Origin</Form.Label>
                        <Form.Control type="text" value={Origin} onChange={(e) => setOrigin(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Manufacturing Year</Form.Label>
                        <Form.Control type="number" value={manufYear} onChange={(e) => setManuYear(e.target.value)} />
                    </Form.Group>
                </Row>



                <Button variant="primary" onClick={() => updateProduct()}>
                    Update
                </Button>
                <Button variant="primary" className="ms-3" onClick={() => deleteProduct()}>
                    Delete
                </Button>
            </Form>
        </div>
    );
}

export default SingleProduct;