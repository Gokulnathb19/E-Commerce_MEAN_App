import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import HomeScreen2 from './screens/HomeScreen2';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import Header from './components/Header';
import Loader from './components/Loader';

function App() {
  const currentYear = new Date().getFullYear();
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header/>
        <Loader/>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen2} />
            <Route path="/" exact={true} component={HomeScreen2} />
            <Route path="/category/:id/2" component={HomeScreen} />
            <Route path="/2" exact={true} component={HomeScreen} />
          </div>
        </main>
            <footer className="footer">&copy; {currentYear} All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
