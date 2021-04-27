import React, { useState } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignUp({ setUserName }) {
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const submitForm = async ({ username, email, password }) => {
    setUsernameError("");
    setEmailError("");
    try {
      const res = await axios.post("/users/signup", {
        username,
        email,
        password,
      });

      if (res.status === 201) {
        setUserName(res.data.user);
        history.push({
          pathname: "/main",
          state: { user: res.data.user },
        });
      }
    } catch (error) {
      if (error.response.data === "Username already exist") {
        setUsernameError("Username already exist");
      } else if (error.response.data === "Email already exist") {
        setEmailError("Email already exist");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="sign-up-div">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" {...register("username")} required />
        <div className="sign-up-error">
          {usernameError !== "" ? usernameError : ""}
        </div>

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" {...register("email")} required />
        <div className="sign-up-error">
          {emailError !== "" ? emailError : ""}
        </div>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          {...register("password")}
          required
        />
        <button>Sign Up</button>
        <p>
          Already have a user? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}
