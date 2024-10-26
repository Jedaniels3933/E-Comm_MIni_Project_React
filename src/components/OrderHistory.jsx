import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
    const userId = 1; 
    const queries = useQueries({
        queries: [{
            queryKey: ['orderHistory', userId],
            queryFn: () => fetch(`https://fakestoreapi.com/orders/user/${userId}`).then(res => res.json())
        }]
    });

    const ordersQuery = queries[0];
    const orders = ordersQuery.data || [];

    if (ordersQuery.isLoading) return <p>Loading...</p>;
    if (ordersQuery.isError) return <p>Error: {ordersQuery.error.message}</p>;

    return (
        <div>
            <h2>Order History</h2>
            <ListGroup>
                {orders.map(order => (
                    <ListGroup.Item key={order.id} className="d-flex justify-content-between align-items-center">
                        <div>
                            <p><strong>Order ID:</strong> {order.id}</p>
                            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                            <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                        </div>
                        <Link to={`/order-details/${order.id}`}>
                            <Button variant="info">View Details</Button>
                        </Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Link to="/home">
                <Button variant="secondary" className="mt-3">Return to Home</Button>
            </Link>
        </div>
    );
};

export default OrderHistory;