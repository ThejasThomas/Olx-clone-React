import React, { useState,useContext } from 'react';
import { FirebaseContext } from '../../store/fireBaseContext';
import Logo from '../../olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);


  const {auth,db} = useContext(FirebaseContext);
  const navigate = useNavigate()

  const validateEmail = (email)=>{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  const handleEmailChange = (e)=>{
    const value = e.target.value;
    setEmail(value);
    if(!validateEmail(value)){
       setEmailError('Please enter a valid email')
    }else{
      setEmailError("")
    }
  };


  const handlePasswordChange = (e)=>{
    const value = e.target.value;
    setPassword(value);
    if(value.length < 6){
      setPasswordError('Password should be at least 6 characters')
    }else{
      setPasswordError("")
    }
  }

  const handleLogin = async(e)=>{
    e.preventDefault();
    //clear previouse errors
    setEmailError('');
    setPasswordError(''); 
       //final validation before submission
       let isValid = true;
       if(!validateEmail(email)) {
        setEmailError('Please enter a valid email');
        isValid = false;
        }
        if (password.length < 6) {
        setPasswordError('Password should be at least 6 characters');
        isValid = false;
        }

      if (!isValid) return; 
    try{
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth,email,password);
       navigate("/")
    }catch(err){
      console.error("Error logging user:",err.message)
    }finally{
      setLoading(false);
    }
  }
  return (
    <div>

      <div className="loginParentDiv">
      {loading && <p className="loading">Logging in, please wait...</p>}
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="error">{emailError}</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
           {passwordError && <p className="error">{passwordError}</p>}
          <br />
          <br />
          <button type='submit' disabled={loading}>Login</button>
         
        </form>
        <a href='/signup'>New user? Signup</a>
      </div>
    </div>
  );
}

export default Login;
