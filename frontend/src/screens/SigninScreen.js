import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  console.log('redirect:',redirect)
  const AppName = props.AppName;
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));

  }
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Sign-In</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div style={{color: "red"}}>{error === "Request failed with status code 401" ? "Invalid username or password" : error}</div>}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Signin</button>
        </li>
        <li>
          <span>New to <span style={{color: "dodgerblue"}}>{AppName}</span>?</span>
        </li>
        <li>
          <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your account</Link>
        </li>
      </ul>
    </form>
  </div>
}
export default SigninScreen;