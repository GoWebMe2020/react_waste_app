import axios from 'axios';
import React, { useState, useEffect } from 'react'

const Registration = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (event) => {
    axios.post(`${props.URL}/registrations`, {
      user: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }
    },
      { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in) {
        props.handleSuccessfulAuth(response.data);
      }
    }).catch(error => {
      if (error) {
        handleErrorMessage()
        console.log("ERROR = ", error)
      }
    })
    event.preventDefault()
  }

  const handleErrorMessage = () => {
    if (password != passwordConfirmation) {
      props.handleUnsuccessfulAuth("Your password and password confirmation must match");
    } else {
      props.handleUnsuccessfulAuth("Something went wrong. Your password/username is incorrect, or this you have not yet registered. Please try again or sign up.");
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
      setPassword(event.target.value)
  }

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value)
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
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Password Confirmation"
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
  );
}

export default Registration;
