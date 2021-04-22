import React from "react";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form action="/main">
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" />
        <button>login</button>
      </form>
    </div>
  );
}
