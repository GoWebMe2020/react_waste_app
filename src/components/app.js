import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios'
import Dashboard from './Dashboard';
import Home from './Home';
import Navbar from './navbar/Navbar'
import Login from './auth/Login';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
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
          />
          <Switch>
            <Route
              exact path={"/dashboard"}
              render={props => (
                <Dashboard {... props} loggedInStatus={this.state.loggedInStatus} />
              )}
            />
            <Route
              exact path={"/login"}
              render={props => (
                <Login
                  {... props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus}
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
