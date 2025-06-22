import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';


function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { session, signUpNewUser } = UserAuth()

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await signUpNewUser(email, password);
      console.log(result.success);
      
      if (result.success) {
        console.log("LOGIN SUCCESS");
        navigate('/');
      }
    } catch (err) {
      console.log("ERROR OCCURED");

    }

  };

  const style = {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  }

  const formStyle = {
    width: '20rem',
    height: '20rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '3px solid white',
    borderRadius: '20px',
    backgroundColor: 'grey',
    color: 'black',
  }

  const buttonStyle = {
    width: '100px',
    border: '2px solid white',
    borderRadius: '20px',
    marginTop: '10px',
  }

  return (
    <div style={style}>
      {loading
        ? <h1>Loading........</h1>
        : <form
          style={formStyle}
          onSubmit={handleSubmit}
        >
          <h2>Sign Up</h2>
          <div>
            <input
              className='mt-10'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
          </div>
          <div>
            <input
              className='mt-10'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </div>
          <button type="submit" style={buttonStyle}>Sign Up</button>
        </form>
      }
    </div>

  );
}

export default Signup;