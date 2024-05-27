import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { registerUser } from "../../../redux/apiCalls/authApiCalls";
import swal from "sweetalert";

const RegisterPage = () => {
  const { registerMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPass, setConfierm] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("Name is required");
    if (!email) return toast.error("email is required");
    if (
      password.trim() !== confirmPass.trim() ||
      password.trim() === "" ||
      password.length < 6
    )
      return toast.error("Password not valid or dosn't match")
      dispatch(registerUser({ username, email, password }));
      if (registerMessage) {
        swal({ title: registerMessage, icon: "success" }).then(isOk => {
          if (isOk) navigate("/login");
        })
      }
    };



  return (
    <section className="form-container">
      <ToastContainer theme="colored" position="top-center" />
      <h1 className="form-title">Create new account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            id="username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="password2" className="form-lable">
            Confirm
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            id="password2"
            className="form-input"
            value={confirmPass}
            onChange={(e) => setConfierm(e.target.value)}
          />
        </div>
        <button type="submit" className="form-btn">
          Register
        </button>
      </form>
      <div className="form-footer">
        Already hav an account ? <Link to="/login">Login</Link>
      </div>
    </section>
  );
};

export default RegisterPage;
