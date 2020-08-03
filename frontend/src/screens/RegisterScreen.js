import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, registerFinished } from '../actions/userActions';

function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const initialFormError = {
    name: '',
    email: '',
    password: '',
    rePassword: ''
  };
  const [formError, setFormError] = useState(initialFormError);
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  const redirectProps = {pathname: 'signin', search: `?redirect=${redirect}`, state: {success: true}}
  useEffect(() => {
    if (userInfo) {
      dispatch(registerFinished());
      props.history.replace(redirectProps);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const validator = () => {
    let [vHasError, vError] = [false, {...initialFormError}];
    setFormError(initialFormError);
    const setVError = (error) => {
      vError = error;
      vHasError = true;
    };
    if(name.length < 3) {
      setVError({...vError, name: 'Name must be minimum 3 characters'})
    }
    if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      setVError({...vError, email: 'Email is invalid'})
    }
    if(!/(?=.*[A-Z]+|[_]+)(?=.*[a-z]+)(?=.*[0-9]+).{8,}/.test(password)) {
      setVError({...vError, password: 'Password must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter'})
    }
    if(password !== rePassword) {
      setVError({...vError, rePassword: 'Password and confirm password doesn\'t match'})
    }

    return {vHasError: vHasError, vError: vError};
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const {vHasError, vError} = validator();
    if(vHasError)
    {
      setFormError(vError);
      return false;
    }
    dispatch(register(name, email, password));
  }
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Create Account</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="name">
            Name
          </label>
          <input type="name" name="name" id="name" required onChange={(e) => setName(e.target.value)}>
          </input>
          {formError.name && (
            <span style={{color: "red"}}>{formError.name}</span>
          )}
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}>
          </input>
          {formError.email && (
            <span style={{color: "red"}}>{formError.email}</span>
          )}
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}>
          </input>
          {formError.password && (
            <span style={{color: "red"}}>{formError.password}</span>
          )}
        </li>
        <li>
          <label htmlFor="rePassword">Re-Enter Password</label>
          <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
          </input>
          {formError.rePassword && (
            <span style={{color: "red"}}>{formError.rePassword}</span>
          )}
        </li>
        <li>
          <button type="submit" className="button primary">Register</button>
        </li>
        <li>
          Already have an account?
          <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >Sign In</Link>

        </li>

      </ul>
    </form>
  </div>
}
export default RegisterScreen;