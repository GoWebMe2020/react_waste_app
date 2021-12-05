import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
      registrationErrors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    const {
      email,
      password
    } = this.state;
    axios.post(`${this.props.URL}/sessions`, {
      user: {
        email: email,
        password: password
      }
    },
      { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in) {
        this.props.handleSuccessfulAuth(response.data);
      }
    }).catch(error => {
      console.log("Login Error", error);
    })
    event.preventDefault()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>This is the Login page</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
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
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
