import React from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import HomeScreen2 from './screens/HomeScreen2';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
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
import Footer from './components/Footer';

function App() {
  const HeaderComponent = withRouter( props => <Header {...props}/>)
  return (
    <BrowserRouter>
      <div className="grid-container">
        <HeaderComponent/>
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
            <Route path="/category2/:id" component={HomeScreen} />
            <Route path="/2" exact={true} component={HomeScreen} />
          </div>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
