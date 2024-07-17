import React from 'react';

const Home = () => (
    <div>
        <p>Login page</p>
        <form action='/org'>
          <div>
            <label>Email:  
              <input required type="email"/>
            </label>
          </div>
          <br/>
          <div>
            <label>Password: 
              <input required type="text"/>
            </label>
          </div>
          <br/><br/>
          <input type="Submit"></input>
        </form>
    </div>
);

export default Home;
