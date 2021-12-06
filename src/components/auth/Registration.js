import axios from 'axios';
import React, { useState, useEffect } from 'react'

const Registration = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [registrationErrors, setRegistrationErrors] = useState("");

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

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value)
  }

  return (
    <div>
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
