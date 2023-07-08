import React from 'react';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer'
import MyOrder from './screens/MyOrder';

//wrapping router inside cartprovider gives universal access to dispatch from contexReducer
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/createuser' element={<Signup />} />
            <Route path='/myOrder' element={<MyOrder />} />


          </Routes>
        </div>
      </Router>

    </CartProvider>
  );
}

export default App;
