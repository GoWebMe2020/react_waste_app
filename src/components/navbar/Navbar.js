import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleLogoutClick() {
    axios.delete("http://localhost:3001/logout",
      { withCredentials: true }
    ).then(response => {
      this.props.handleLogout()
    }).catch(error => {
      console.log("Logout Error", error)
    })
  }

  render() {
    return (
      <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
      </ul>
    </div>
    )
  }
}

export default Navbar;
