// import React, { useState, useContext, useRef } from 'react'
// import {useNavigate, Link} from 'react-router-dom'
// import axios from 'axios'
// import { AuthContext } from '../../context/AuthContext'
// import { BASE_URL } from '../../util/constant'
// import './style.css'

// const Login = () => {
//     const [msg, setMsg] = useState('');
//     const { setUser } = useContext(AuthContext);
//     const submitRef = useRef();
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setMsg('');

//         const username = e.target.elements[0].value;
//         const password = e.target.elements[1].value;


//         if (username.trim() === "" || password.trim() === "")
//             return alert("provide credentials")

//         submitRef.current.disabled = true;
//         submitRef.current.innerHTML = "Please wait...";

//         try {
//             submitRef.current.disabled = true;
//             submitRef.current.innerHTML = "Please wait...";

//             let res = await axios.post(`${BASE_URL}/login`, { username, password })
//             setUser(res.data.user);
//             localStorage.setItem("token", res.data.token);
//             navigate("/", {replace:true})
//         } catch (err) {
//             setMsg(err.response.data.message)
//             submitRef.current.disabled = false;
//             submitRef.current.innerHTML = "Sign Up";
//             e.target.reset();
//         }
//     }

//     return (
//         <div className="form-container">
//             <form onSubmit={handleLogin}>
//                 <h1>Login Here</h1>
//                 <div className="input-controls-signup-login">
//                     <label>Username</label>
//                     <input type="text" required />
//                 </div>
//                 <div className="input-controls-signup-login">
//                     <label>Password</label>
//                     <input type="password" required />
//                 </div>
//                 <p className="error-message">{msg}</p>
//                 <div className="input-controls-signup-login">
//                     <button ref={submitRef}>Login</button>
//                 </div>
//                 <p className='signup-login-link'>New User? <Link to="/signup">Sign up</Link></p>
//             </form>
//         </div>
//     )
// }

// export default Login



import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../util/constant';
import annyang from 'annyang';
import './style.css';
import { BsMicFill } from 'react-icons/bs';

export const Login = () => {
  const [msg, setMsg] = useState('');
  const { setUser } = useContext(AuthContext);
  const submitRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!annyang) {
      console.log('Speech recognition is not supported in your browser.');
    } else {
      const commands = {
        'username is *username': (username) => {
          const usernameInput = document.getElementById('exampleUsername');
          if (usernameInput) {
            // Remove the period at the end of the username, if present
            const trimmedUsername = username.trim().replace(/\.$/, '');
            usernameInput.value = trimmedUsername;
          }
        },
        'password is *password': (password) => {
          const passwordInput = document.getElementById('examplePassword');
          if (passwordInput) {
            // Remove the period at the end of the password, if present
            const trimmedPassword = password.trim().replace(/\.$/, '');
            passwordInput.value = trimmedPassword;
          }
        },
        login: () => {
          submitRef.current.click();
        },
      };

      annyang.addCommands(commands);
      annyang.start();

      return () => {
        annyang.removeCommands(Object.keys(commands));
        annyang.abort();
      };
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');

    const username = e.target.elements.exampleUsername.value;
    const password = e.target.elements.examplePassword.value;

    if (username.trim() === '' || password.trim() === '') {
      return alert('Please provide credentials.');
    }

    submitRef.current.disabled = true;
    submitRef.current.innerHTML = 'Please wait...';

    try {
      let res = await axios.post(`${BASE_URL}/login`, { username, password });
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      navigate("/");
    } catch (err) {
      setMsg(err.response.data.message);
      submitRef.current.disabled = false;
      submitRef.current.innerHTML = 'Login';
      e.target.reset();
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <h1>Login Here</h1>
        <div className="input-controls-signup-login">
          <label>Username</label>
          <input id="exampleUsername" type="text" required />
        </div>
        <div className="input-controls-signup-login">
          <label>Password</label>
          <input id="examplePassword" type="username" required />
        </div>
        <p className="error-message">{msg}</p>
        <div className="input-controls-signup-login">
          <button ref={submitRef}>Login</button>
        </div>
        <p className="signup-login-link">
          New User? <Link to="/signup">Sign up</Link>
        </p>
      </form>
      <div className="microphone-container">
        <BsMicFill className="microphone-icon" onClick={() => annyang.trigger('login')} />
      </div>
    </div>
  );
};
