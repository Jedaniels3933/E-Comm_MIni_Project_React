import React from 'react'; // Import React
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddProduct from '../components/AddProduct';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();

describe('AddProduct Component', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    test('should display success alert on successful API call', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 1 })
        });

        render(
            <Router> {/* Wrap with Router */}
                <QueryClientProvider client={queryClient}>
                    <AddProduct />
                </QueryClientProvider>
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Product' } });
        fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '10.00' } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
        fireEvent.change(screen.getByLabelText(/Image URL/i), { target: { value: 'http://example.com/image.jpg' } });
        fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Test Category' } });

        fireEvent.click(screen.getByText(/Add Product/i));

        await waitFor(() => expect(screen.getByText(/Product Added Successfully!/i)).toBeInTheDocument());
    });

    test('should display error alert on failed API call', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Failed to add product' })
        });

        render(
            <Router> {/* Wrap with Router */}
                <QueryClientProvider client={queryClient}>
                    <AddProduct />
                </QueryClientProvider>
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Product' } });
        fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '10.00' } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
        fireEvent.change(screen.getByLabelText(/Image URL/i), { target: { value: 'http://example.com/image.jpg' } });
        fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Test Category' } });

        fireEvent.click(screen.getByText(/Add Product/i));

        await waitFor(() => expect(screen.getByText(/An Error has occured:/i)).toBeInTheDocument());
    });
});