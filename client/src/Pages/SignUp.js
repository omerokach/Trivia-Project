import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "../App.css";

export default function SignUp({setUserName}) {
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const submitForm = async ({ username, email, password }) => {
    setUserNameError("");
    setEmailError("");

    try {
      const res = await axios.post("/users/signup", { username, email, password });

      if (res.status === 201) {
        setUserName(res.data.user);
        history.push({
          pathname: "/main",
          state: { user: res.data.user },
        });
      }
    } catch (error) {
      if (error.response.data === "Username already exist") {
        setUserNameError("Username already exist");
      } else if (error.response.data === "Email already exist") {
        setEmailError("Email already exist");
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit(submitForm)}>
        <div className="signup-label-input">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" {...register("username")} required />
        <div className="sign-up-error">
          {userNameError !== "" ? userNameError : ""}
        </div>
        </div>
        <div className="signup-label-input">
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" {...register("email")} required />
        <div className="sign-up-error">
          {emailError !== "" ? emailError : ""}
        </div>
        </div>
          <div className="signup-label-input">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          {...register("password")}
          required
        />
          </div>
        <div className="sign-up-error"></div>
        <button>Sign Up</button>
        <p>
          Allready have a user?
          <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}
