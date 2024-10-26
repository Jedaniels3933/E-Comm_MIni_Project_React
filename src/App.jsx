import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/HomePage';
import UserContext from './context/UserContext';
import Register from './components/CreateUser';
import ProfileUpdate from './components/UpdateUser';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import ShoppingCart from './components/ShoppingCart';
import AddProduct from './components/AddProduct';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Logout from './components/Logout';
import DeleteAccount from './components/DeleteAccount';



const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState({ name: '', isLoggedIn: false });
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedUser = sessionStorage.getItem('userSession');
    const storedToken = sessionStorage.getItem('authToken');
    if (storedUser && storedToken) {
      const userSession = JSON.parse(storedUser);
      setUser(userSession);
      setToken(storedToken);
    }
  }, []);

  const ProtectedRoute = ({ element, ...rest }) => {
    return user.isLoggedIn ? element : <Navigate to="/" />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <UserContext.Provider value={{ user, setUser, token, setToken }}>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<ProtectedRoute element={<Homepage />} />} />
              <Route path="/cart" element={<ProtectedRoute element={<ShoppingCart />} />} />
              <Route path="/add-product" element={<ProtectedRoute element={<AddProduct />} />} />
              <Route path="/CreateUser" element={<Register />} />
              <Route path="/Logout" element={<Logout />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/UpdateProfile" element={<ProtectedRoute element={<ProfileUpdate />} />} />
              <Route path='/DeleteAccount' element={<ProtectedRoute element={<DeleteAccount />} />} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
