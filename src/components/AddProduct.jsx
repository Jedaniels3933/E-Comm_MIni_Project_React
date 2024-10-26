import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Col, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// Function to post data to the api
const postProduct = async (product) => {
    const response = await fetch ('https://fakestoreapi.com/products', {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Failed to add new product');
    }
    return response.json();
};

const AddProduct = () => {
    const queryClient = useQueryClient();
    const [showSuccessAlert, setShowSucessAlert] = useState(false);

    const { mutate, isLoading, isError, error} = useMutation({
        mutationFn: postProduct,
        onSuccess: (data) => {
            setShowSucessAlert(true);
            console.log('Product add with ID:', data.id);
            queryClient.invalidateQueries(['products']);
            setTimeout(() => setShowSucessAlert(false), 5000);
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const product = {
            title: formData.get('title'),
            price: formData.get('price'),
            description: formData.get('description'),
            image: formData.get('image'),
            category: formData.get('category'),
        };
        mutate(product);
        event.target.reset();
    };

    return (
        <div>
            {isError && <Alert variant="danger">An Error has occured: {error.message}</Alert>}
            {showSuccessAlert && <Alert variant="success">Product Added Successfully!</Alert>}
            <Col md={{ span: 6, offsett: 3}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" name="title" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter price" name="price" min="0" step="any" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="title" as="textarea" rows={3} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="url" placeholder="Enter image url" name="image" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>category</Form.Label>
                        <Form.Control type="text" placeholder="Enter category" name="category" required />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading? 'Adding...' : "Add Product"}
                    </Button>
                </Form>
                <NavLink to="/Logout">Logout</NavLink> <br/>
            </Col>
        </div>
    );

};

export default AddProduct;