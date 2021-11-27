import React, { Component } from 'react';
import axios from 'axios';

class Registration extends Component {
  constructor(props) {
    // The super(props) allows the use of all props in this class.
    super(props);
    // This sets the data that you would like to submit to the API.
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    }
    // Binds the functions to the class constructor.
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // Handles the form submit action.
  handleSubmit(event) {
    // Creates the variable values for the state in the constructor.
    const {
      email,
      password,
      password_confirmation
    } = this.state;
    // Makes a post request using axios, which is imported above. This axios post request takes 3 arguments.
    // 1st Arg = Where is the post called to.
    axios.post("http://localhost:3001/registrations", {
      // 2nd Arg = The data being sent. The data must be in the same format that the API expects the call.
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    },
      // 3rd Arg = Always include the credentials. These must be sent or it will not work.
      { withCredentials: true }
    ).then(response => {
      // Returns the reponse.
      if (response.data.status === "created") {
        this.props.handleSuccessfulAuth(response.data);
      }
    }).catch(error => {
      // Catches the error.
      console.log("Registration Error", error);
    })
    // This must be included to prevent the default form submit action.
    event.preventDefault()
  }
  // Handles the change in the input fields.
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Registration;
