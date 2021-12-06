import axios from 'axios';
import React, { useState, useEffect } from 'react'

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState("");
  const [registrationErrors, setRegistrationErrors] = useState("");

  const handleSubmit = (event) => {
    axios.post(`${props.URL}/sessions`, {
      user: {
        email: email,
        password: password
      }
    },
      { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in) {
        props.handleSuccessfulAuth(response.data);
      }
    }).catch(error => {
      console.log("Login Error", error);
    })
    event.preventDefault()
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
      setPassword(event.target.value)
  }

  return (
    <div>
        <h1>This is the Login page</h1>
        <h1>Status: {props.loggedInStatus}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
  );
}

export default Login;
