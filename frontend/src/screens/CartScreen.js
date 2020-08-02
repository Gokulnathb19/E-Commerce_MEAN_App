import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const { currency: {unit: priceUnit} } = useSelector((state) => state.appDetails);

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
    /*console.log(props.history)
    if(props.history.location.pathname.indexOf('cart/') == 1) {
      const state = { ...history.location.state };
      delete state.deleted;
      history.replace({ ...history.location, state });
    }*/
  }

  useEffect(() => {
    if(!userInfo)
      props.history.replace("/signin?redirect=cart");
    else {
      if(props.history.location.pathname.indexOf('cart/') == 1)
        props.history.replace('/cart');
    }
  }, [userInfo])

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.replace("/signin?redirect=shipping");
  }

  return (
    <>
    {userInfo && (
      <div className="cart">
        <div className="cart-list">
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
              </h3>
              <div>
                Price
              </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Cart is empty
              </div>
                :
                cartItems.map((item, idx) =>
                  <li key={idx}>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>
    
                      </div>
                      <div>
                        Qty:
                      <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                          {[...Array(item.countInStock).keys()].map(x =>
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          )}
                        </select>
                        <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)} >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-price">
                          {priceUnit}{item.price}
                    </div>
                  </li>
                )
            }
          </ul>
          <Link to="/"><button className="button primary">{cartItems.length === 0 ? "Add Items" : "Add More Items"}{" ->"}</button></Link>
    
        </div>
        <div className="cart-action">
          <h3>
            Subtotal ( {parseInt(cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0))} items)
            :
            {priceUnit} {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
          <button onClick={checkoutHandler} className={`button primary full-width ${cartItems.length === 0 ? "disabled" : ""}`} disabled={cartItems.length === 0}>
            Proceed to Checkout
          </button>
    
        </div>
    
      </div>
    )}
    </>
  )
}

export default CartScreen;