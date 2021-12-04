import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import axios from 'axios'
import Dashboard from './Dashboard';
import Home from './Home';
import Navbar from './navbar/Navbar'

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

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
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

  componentDidMount() {
    this.checkLoginStatus()
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  render() {
    return (
      <div className='app'>
        <Navbar
          handleLogout={this.handleLogout}
        />
        <BrowserRouter>
          <Switch>
            <Route
              exact path={"/"}
              render={props => (
                <Home
                  {... props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact path={"/dashboard"}
              render={props => (
                <Dashboard {... props} loggedInStatus={this.state.loggedInStatus} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
