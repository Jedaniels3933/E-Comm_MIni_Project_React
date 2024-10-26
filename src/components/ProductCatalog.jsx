import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { Row, Col, Card, Button, Spinner, Alert, Form } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';



const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    const products = await response.json();
    return products;
};

const fetchCategories = async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    const categories = await response.json();
    return categories;
};

const ProductCatalog = () => {
    const { t, i18n } = useTranslation();
    const [sortBy, setSortBy] = useState('price_asc'); // Default sorting criteria
    const [searchTitle, setSearchTitle] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [category, setCategory] = useState(''); // Category state
    const [sortedProducts, setSortedProducts] = useState([]);
    const dispatch = useDispatch();

   
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        retry: 3,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        staleTime: 5 * 60 * 1000,
        cacheTime: 15 * 60 * 1000
    });

    
    const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: Infinity
    });

   
    const filterProducts = useCallback((products, searchTitle, minPrice, maxPrice, category) => {
        return products.filter(product => {
            const matchesTitle = product.title.toLowerCase().includes(searchTitle.toLowerCase());
            const matchesPrice = (!minPrice || product.price >= parseFloat(minPrice)) &&
                                  (!maxPrice || product.price <= parseFloat(maxPrice));
            const matchesCategory = !category || product.category === category;
            return matchesTitle && matchesPrice && matchesCategory;
        });
    }, []);

    
    const sortProducts = useCallback((products, sortBy) => {
        switch (sortBy) {
            case 'price_asc':
                return [...products].sort((a, b) => a.price - b.price);
            case 'price_desc':
                return [...products].sort((a, b) => b.price - a.price);
            case 'rating_asc':
                return [...products].sort((a, b) => a.rating.rate - b.rating.rate);
            case 'rating_desc':
                return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
            default:
                return products;
        }
    }, []);

    useEffect(() => {
        if (products) {
            const filteredProducts = filterProducts(products, searchTitle, minPrice, maxPrice, category);
            const sortedFilteredProducts = sortProducts(filteredProducts, sortBy);
            setSortedProducts(sortedFilteredProducts);
        }
    }, [products, searchTitle, minPrice, maxPrice, sortBy, category, filterProducts, sortProducts]);

    const handleAddToCart = (id) => {
        dispatch(addItem({ id }));
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTitle(e.target.value);
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
    };

    const handleCategoryChange = (category) => {
        setCategory(category);
    };

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);
    };

    if (isLoading || categoriesLoading) return <Spinner animation="border" role="status"><span className='visually-hidden'>{t('loading')}</span></Spinner>;
    if (error || categoriesError) return <Alert variant="danger">{(error || categoriesError).message}</Alert>;

    return (
        <main>
            <header>
                <h2>{t('ProductCatalog')}</h2>
            </header>

            
            <section aria-labelledby="categories">
                <h4 id="categories">{t('categories')}</h4>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Button variant="link" onClick={() => handleCategoryChange('')}>{t('all')}</Button>
                    </li>
                    {categories.map(cat => (
                        <li className="nav-item" key={cat}>
                            <Button variant="link" onClick={() => handleCategoryChange(cat)}>{cat}</Button>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Search and Filters */}
            <section aria-labelledby="filters">
                <h4 id="filters">{t('filters')}</h4>
                <Form.Group>
                    <Form.Label>{t('searchByTitle')}</Form.Label>
                    <Form.Control
                        type="text"
                        value={searchTitle}
                        onChange={handleSearchChange}
                        aria-label={t('searchByTitle')}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>{t('minPrice')}</Form.Label>
                    <Form.Control
                        type="number"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        aria-label={t('minPrice')}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>{t('maxPrice')}</Form.Label>
                    <Form.Control
                        type="number"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        aria-label={t('maxPrice')}
                    />
                </Form.Group>
                <Form.Select aria-label={t('sortProducts')} value={sortBy} onChange={handleSortChange} style={{ marginTop: '20px', maxWidth: '200px' }}>
                    <option value="price_asc">{t('priceLowToHigh')}</option>
                    <option value="price_desc">{t('priceHighToLow')}</option>
                    <option value="rating_asc">{t('ratingLowToHigh')}</option>
                    <option value="rating_desc">{t('ratingHighToLow')}</option>
                </Form.Select>
            </section> <br/>

            <div>
                <Button variant="secondary" onClick={() => handleLanguageChange('en')}>English</Button>
                <Button variant="secondary" onClick={() => handleLanguageChange('es')}>Español</Button>
            </div> <br/>
    
            {/* Product Cards */}
            <section aria-labelledby="products">
                <h4 id="products">{t('products')}</h4>
                <Row xs={1} md={4} className='g-4' style={{ marginTop: '20px' }}>
                    {sortedProducts.map(product => (
                        <Col key={product.id}>
                            <Card style={{ width: '18rem' }}>
                                <div style={{ padding: '10px' }}>
                                    <Card.Img
                                        variant='top'
                                        src={product.image}
                                        alt={product.title} // Accessibility feature
                                        style={{ height: '250px', objectFit: 'contain' }}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>{t('price')}: ${product.price}</Card.Text>
                                    <Button variant="primary" onClick={() => handleAddToCart(product.id)}>{t('addToCart')}</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>
        </main>
    );
};

export default ProductCatalog;