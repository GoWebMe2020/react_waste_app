import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios'
import Dashboard from './Dashboard';
import Home from './Home';
import Navbar from './navbar/Navbar'
import Login from './auth/Login';
import Register from './auth/Registration';
import Message from './notices/Message';

const App = () => {

  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN")
  const [user, setUser] = useState({})
  const URL = "http://localhost:3001"
  const [message, setMessage] = useState()

  const handleLogin = (data) => {
    setLoggedInStatus("LOGGED_IN")
    setUser(data.user)
  }

  const handleSuccessfulAuth = (data) => {
    const message = data.message
    handleLogin(data)
    displayMessage(message)
  }

  const handleUnsuccessfulAuth = (stringMessage) => {
    displayMessage(stringMessage)
  }

  const handleLogout = (data) => {
    setLoggedInStatus("NOT_LOGGED_IN")
    setUser({})
    displayMessage(data.message)
  }

  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/logged_in",
      { withCredentials: true }
    ).then(response => {
      if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
        setLoggedInStatus("LOGGED_IN")
        setUser(response.data.user)
      } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
        setLoggedInStatus("NOT_LOGGED_IN")
        setUser({})
      }
    }).catch(error => {
      console.log("Check Login Error", error)
    })
  }

  const displayMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage()
    }, 10000);
  }

  useEffect(() => {
    checkLoginStatus()
  }, [])


  return (
    <div className='app'>
      <Router>
          <h1>This is the {user.email}</h1>
          <Navbar
            handleLogout={handleLogout}
            URL={URL}
          />
          <Message message={message} />
          <Switch>
            <Route
              exact path={"/dashboard"}
              render={props => (
                <Dashboard
                  {... props}
                    loggedInStatus={loggedInStatus}
                    URL={URL}
                />
              )}
            />
            <Route
              exact path={"/login"}
              render={props => (
                <Login
                  {... props}
                  handleSuccessfulAuth={handleSuccessfulAuth}
                  handleUnsuccessfulAuth={handleUnsuccessfulAuth}
                  loggedInStatus={loggedInStatus}
                  URL={URL}
                />
              )}
            />
            <Route
              exact path={"/register"}
              render={props => (
                <Register
                  {... props}
                  handleSuccessfulAuth={handleSuccessfulAuth}
                  handleUnsuccessfulAuth={handleUnsuccessfulAuth}
                  loggedInStatus={loggedInStatus}
                  URL={URL}
                />
              )}
            />
            <Route
              exact path={"/"}
              render={props => (
                <Home
                  {... props}
                  handleLogin={handleLogin}
                  loggedInStatus={loggedInStatus}
                />
              )}
            />
          </Switch>
        </Router>
    </div>
  )
}

export default App
