import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios'
import Dashboard from './Dashboard';
import Home from './Home';
import Navbar from './navbar/Navbar'
import Login from './auth/Login';
import Register from './auth/Registration';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.URL = "http://localhost:3001"

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  handleSuccessfulAuth(data) {
    this.handleLogin(data);
    console.log(this.state.user)
    if (this.state.loggedInStatus === "LOGGED_IN" && this.state.user) {
      window.location.pathname = '/dashboard'
    } else {
      window.location.pathname = '/login'
    }
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  checkLoginStatus() {
    axios.get("http://localhost:3001/logged_in",
      { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        })
      } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    }).catch( error => {
      console.log("Check Login Error ", error)
    })
  }

  render() {
    return (
      <div className='app'>
        <Router>
          <Navbar
            handleLogout={this.handleLogout}
            URL={this.URL}
          />
          <Switch>
            <Route
              exact path={"/dashboard"}
              render={props => (
                <Dashboard
                  {... props}
                    loggedInStatus={this.state.loggedInStatus}
                    URL={this.URL}
                />
              )}
            />
            <Route
              exact path={"/login"}
              render={props => (
                <Login
                  {... props}
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
                  loggedInStatus={this.state.loggedInStatus}
                  URL={this.URL}
                />
              )}
            />
            <Route
              exact path={"/register"}
              render={props => (
                <Register
                  {... props}
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
                  loggedInStatus={this.state.loggedInStatus}
                  URL={this.URL}
                />
              )}
            />
            <Route
              exact path={"/"}
              render={props => (
                <Home
                  {... props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
