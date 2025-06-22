import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';


function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { session, signInUser } = UserAuth()

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
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
    width:'100px',
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
            <h2>Sign In</h2>
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
            <button type="submit" style={buttonStyle}>Sign In</button>
          </form>
        }
      </div>

  );
}

export default SignIn;