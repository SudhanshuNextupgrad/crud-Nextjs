"use client"
import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const AddProduct = () => {

    const route = useRouter();

    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [manufYear, setManuYear] = useState('');
    const [origin, setOrigin] = useState('');

    const addproduct = async (e) => {
        e.preventDefault();
        try {

            const productdata = {
                model: model,
                price: price,
                manufacturing_year: manufYear,
                origin: origin
            }

            const resp = await axios.post("http://localhost:3000/api/products", productdata)

            resp?.data?.status ? alert("Product Added Successfully") : alert("Error while submitting");

            setManuYear('')
            setModel('')
            setOrigin('')
            setPrice('')
            route.push("/getproducts")
        } catch (error) {
            console.log("try-catch error", error)
        }

    }
    return (
        <div className="container border mt-5 p-3 " style={{ background: "lightgray" }}>
            <h2 className="text-center">Enter Product Details</h2>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Model Name</Form.Label>
                        <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Model Price</Form.Label>
                        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Model Origin</Form.Label>
                        <Form.Control type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Manufacturing Year</Form.Label>
                        <Form.Control type="number" value={manufYear} onChange={(e) => setManuYear(e.target.value)} />
                    </Form.Group>
                </Row>



                <Button variant="primary" type="submit" onClick={addproduct}>
                    Submit
                </Button>
            </Form>
        </div>

    );
}

export default AddProduct;