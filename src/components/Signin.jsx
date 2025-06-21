import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';


function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { session, signInUser } = UserAuth()

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await signInUser(email, password);
      if (result.success) {
        console.log("LOGIN SUCCESS");
        navigate('/');
      }
    } catch (err) {
      console.log("ERROR OCCURED");

    }

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </>

  );
}

export default SignIn;