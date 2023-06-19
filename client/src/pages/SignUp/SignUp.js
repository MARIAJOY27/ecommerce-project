import React, { useState, useContext, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { useFormContext } from "react-hook-form";
import { BASE_URL } from '../../util/constant'
import './style.css'

// const SignUp = () => {
//     const [msg, setMsg] = useState('');
//     const { setUser } = useContext(AuthContext);
//     const submitRef = useRef();
//     const navigate = useNavigate();

//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors }
//     } = useFormContext();

//     const handleSignUp = async (e) => {
//         e.preventDefault();
//         setMsg(''); return

//         const username = e.target.elements[0].value;
//         const password = e.target.elements[1].value;


//         if (username.trim() === "" || password.trim() === "")
//             return alert("provide credentials")

//         submitRef.current.disabled = true;
//         submitRef.current.innerHTML = "Please wait...";

//         try {
//             submitRef.current.disabled = true;
//             submitRef.current.innerHTML = "Please wait...";

//             let res = await axios.post(`${BASE_URL}/signup`, { username, password })
//             setUser(res.data.user);
//             localStorage.setItem("token", res.data.token);
//             navigate("/", { replace: true })
//         } catch (err) {
//             setMsg(err.response.data.message)
//             submitRef.current.disabled = false;
//             submitRef.current.innerHTML = "Sign Up";
//             e.target.reset();
//         }
//     }

//     return (
//         <div className="form-container">
//             <form onSubmit={handleSignUp}>
//                 <h1>Create New Account</h1>
//                 <div className="input-controls-signup-login">
//                     <label>Username</label>
//                     <input type="text" required {...register('username', { required: true })}/>
//                     {errors.username && <span>This field is required</span>}
//                 </div>
//                 <div className="input-controls-signup-login">
//                     <label>Password</label>
//                     <input type="password" required {...register('password', { required: true })} />
//                     {errors.password && <span>This field is required</span>}
//                 </div>
//                 <p className="error-message">{msg}</p>
//                 <div className="input-controls-signup-login">
//                     <button ref={submitRef}>Sign Up</button>
//                 </div>
//                 <p className='signup-login-link'>Already a user? <Link to="/login">Login</Link></p>
//             </form>
//         </div>
//     )
// }




const SignUp = () => {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors }
    } = useFormContext();
    const onSubmit = data => console.log(data);
  
    console.log(watch('example')); // watch input value by passing the name of it
  
    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
  
        {/* include validation with required or other standard HTML validation rules */}
        <label>Enter your Username</label>
        <input {...register('username', { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.username && <span>This field is required</span>}
  
        <label>Enter your Password</label>
        <input {...register('password', { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}
  
        <input type="submit" />
      </form>
    );
  }



export default SignUp
