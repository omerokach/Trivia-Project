import React, { useState } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";

export default function Login({setUserName, setIsLogIn}) {
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const loginButton = async ({email, password}) => {
    setError("");
    try {
      const res = await axios.post("/users/login", {email, password});
      if(res.status === 200){
        setUserName(res.data.user);
        setIsLogIn(true);
        localStorage.setItem("isLogIn", true);
        history.push({
          pathname: "/main",
          state: {user: res.data.user},
        });
      }
    } catch (error) {
      if (error.response.data === "Incorrect email or password") {
        setError("Incorrect email or password");
      }
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome to the most popular trivia game online</h1>
      <div className="login-div">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit(loginButton)}>
          <div  className="label-input">
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" {...register("email")} required />
          </div>
          <div  className="label-input">
          <labe  htmlFor="password">Password: </labe>
          <input type="password" name="password" {...register("password")} required/>
          </div>
          <button>login</button>
          <div className="error-div">
            {error !== '' ? error : ""}
          </div>
          <p>
            Don't have a user?<Link to="/signup">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
