import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { logout } from '../actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import CategoriesScreen from './../screens/CategoriesScreen'

export default function Header(props) {
    const [isSideNavOpened, setIsSideNavOpened] = useState(false);
    const { userInfo } = useSelector((state) => state.userSignin);
    const { appName } = useSelector((state) => state.appDetails);

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };

    const openMenu = () => {
        setIsSideNavOpened(true);
    };

    const closeMenu = () => {
        setIsSideNavOpened(false);
    };

    const {cartItems} = useSelector(state => state.cart);

    const cartItemsLength = cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0);

    return (
        <>
            <header className="header">
            <div className="brand">
                <button onClick={openMenu}>&#9776;</button>
                <Link to="/">{appName}</Link>
            </div>
            <div className="header-links">
            <Link to="/cart"><span><sub style={{backgroundColor: "white", color: "dodgerblue", padding: "2px 4px",borderRadius: "50%", border: "0.1rem solid dodgerblue"}}>{cartItemsLength}</sub></span><FontAwesomeIcon icon={faShoppingCart} /></Link>
                {userInfo ? (
                <div className="dropdown">
                    <Link to="/profile">{userInfo.name}</Link>
                    <ul className="dropdown-content">
                        {userInfo && userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link to="/products">Products</Link>
                                </li>
                                <li>
                                    <Link to="/orders">Orders</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link onClick={handleLogout} to="/signin">Logout</Link>
                        </li>
                    </ul>
                </div>
                ) : (
                <Link to="/signin">Sign In</Link>
                )}
            </div>
            </header>
            <CategoriesScreen closeMenu={closeMenu} isSideNavOpened={isSideNavOpened} />
        </>
    );
}
