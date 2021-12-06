import React from 'react';

const Home = (props) => {
  return (
    <div>
      <div>
        <h1>This is the HOME page</h1>
        <h1>Status: {props.loggedInStatus}</h1>
      </div>
    </div>
  );
}

export default Home;
