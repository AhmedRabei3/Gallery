import "../registerPage/register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import {loginUser} from "../../../redux/apiCalls/authApiCalls"
import { LOGIN_URL, request } from "../../../utils/requests";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const form = {
      email,
      password,
    };
    if (email.trim() === "") return toast.error("Email is requirde");
    if (password < 6) return toast.error("Email must be more than 6 charecter");
    dispatch(loginUser(form));
  };
  

  return (
    <section className="form-container">
      <ToastContainer theme="colored" position="top-center" />
      <h1 className="form-title">Wellcome back</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="email" className="form-lable">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-lable">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="form-btn">
          Login
        </button>
      </form>
      <div className="form-footer">
        You don't hav an account ? <Link to="/register">Register now</Link>
      </div>
    </section>
  );
};

export default LoginPage;
