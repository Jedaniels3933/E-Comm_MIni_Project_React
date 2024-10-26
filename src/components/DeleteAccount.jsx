import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function DeleteAccount() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleDelete = () => {

        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

        if (confirmDelete) {

            localStorage.removeItem('userSession');

            setUser({ name: '', isLoggedIn: false });

            navigate('/Logout');
        }
    };

    return (
        <Container className="vh-100">
            <Row className="justify-content-center align-items-center h-100">
                <Col md={6} className="text-center">
                    <h2>Delete Account</h2>
                    <p>Warning: This action is permanent and cannot be undone.</p>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete My Account
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default DeleteAccount;