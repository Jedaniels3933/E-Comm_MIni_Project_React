import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function ProfileUpdate() {
    const { user, setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('userSession');
        if (storedUser) {
            const userSession = JSON.parse(storedUser);
            setFormData({
                username: userSession.name,
                email: userSession.email || '',
                password: '',
                confirmPassword: ''
            });
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }


        const updatedUser = {
            name: formData.username,
            email: formData.email,
            isLoggedIn: true
        };

  
        localStorage.setItem('userSession', JSON.stringify(updatedUser));


        setUser(updatedUser);

      
        navigate('/'); 
    };

    return (
        <Container className="vh-100">
            <Row className="justify-content-center align-items-center h-100">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="usernameInput" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                name='username'
                                placeholder='Enter new username'
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="emailInput" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                name='email'
                                placeholder='Enter new email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="passwordInput" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                name='password'
                                placeholder='Enter new password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPasswordInput" className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                name='confirmPassword'
                                placeholder='Confirm new password'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Update Profile
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ProfileUpdate;