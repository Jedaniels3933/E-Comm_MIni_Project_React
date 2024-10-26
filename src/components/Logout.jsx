import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Logout() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Log statements for debugging
        console.log('Logging out...');

        // Clear user session from local storage
        sessionStorage.removeItem('userSession');
        console.log('User session removed from local storage');

        // Reset user context
        setUser({ name: '', isLoggedIn: false });

        // Navigate back to login
        navigate('/');
    }, [navigate, setUser]);

    // Optional log out statement
    return (
        <div>Logging out...</div>
    );
}

export default Logout;