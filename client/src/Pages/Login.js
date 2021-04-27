import React, { useState } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";

export default function Login({setUserName}) {
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const loginButton = async ({email, password}) => {
    setError("");
    try {
      const res = await axios.post("/users/login", {email, password});
      if(res.status === 200){
        setUserName(res.data.user);
        history.push({
          pathname: "/main",
          state: res.data.user,
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
        <form onSubmit={handleSubmit(loginButton)}>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" {...register("email")} required />
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" {...register("password")} required/>
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
