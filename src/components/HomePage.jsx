import { useContext } from "react";
import UserContext from '../context/UserContext';
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductCatalog from './ProductCatalog'
import { NavLink } from "react-router-dom";


function HomePage() {
    const { user } = useContext(UserContext); // const cartCount = useCartCount(); use custom Hook
    const cartCount = useSelector((state) => state.cart.totalItems); // replace the custom hook with the redux approach
    return(
        <Container className="mt-5">
            <h1>Welcome, {user.name}!</h1>
            <p>You are now {user.isLoggedIn ? 'logged in' : 'logged out'}. </p>
            <p>Your cart has {cartCount} item(s).</p>  {/*display cart count */}
            <NavLink to="/Logout">Logout</NavLink> <br/>
            <NavLink to="/UpdateProfile">Update Profile</NavLink> <br/>
            <NavLink to="/DeleteAccount">Delete Account</NavLink> <br/>
            <NavLink to="/AddProduct">Add Product</NavLink> <br/>
            <NavLink to="/cart">Your cart has {cartCount} item(s)</NavLink> 
            <ProductCatalog/>
        </Container>
    );
}

export default HomePage;