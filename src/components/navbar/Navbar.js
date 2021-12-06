import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Navbar = (props) => {

  const handleLogoutClick = () => {
    axios.delete(`${props.URL}/logout`,
      { withCredentials: true }
    ).then(response => {
      props.handleLogout()
    }).catch(error => {
      console.log("Logout Error", error)
    })
  }

  return (
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <button onClick={() => handleLogoutClick()}>Logout</button>
      </ul>
    </div>
  );
}

export default Navbar;
