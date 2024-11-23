import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/fireBaseContext";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { auth,db } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); 
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email)=>{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

 const handleEmailChange = (e)=>{
     const value = e.target.value;
     setEmail(value);
     if(!validateEmail(value)){
      setEmailError('Please enter a valid email');
     }else{
      setEmailError("")
     }
  }
  const handleUsernameChange = (e)=>{
    const value = e.target.value;
    setUsername(value);
    if(!value.trim()){
      setUsernameError('Please enter a username');
    }else{
      setUsernameError('');
    }
  }

  const handlePhoneChange = (e)=>{
    const value = e.target.value;
    setPhone(value);
    if(value.length != 10 || isNaN(value)){
      setPhoneError('Please enter a valid 10-digit phone number');   
    }else{
      setPhoneError('');
    }
  }
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6) {
      setPasswordError('Password should be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
       e.preventDefault();

    setUsernameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    let isValid = true;

    if (!username.trim()) {
      setUsernameError('Please enter a username');
      isValid = false;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters');
      isValid = false;
    }

    if (!isValid) return;

    try{
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      await updateProfile(user, { displayName: username });
      await addDoc(collection(db, "users"), {
        id: result.user.uid,
        username, 
        phone,
        email
      });

      navigate('/login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailError('This email is already in use. Please try a different email.');
      } else {
        console.error('Error signing up:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
      {loading && <p className="loading">Signing up, please wait...</p>}
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            value={username}
            onChange={handleUsernameChange}
            name="name"
          />
          {usernameError && <p className="error">{usernameError}</p>}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            name="email"
          />
          {emailError && <p className="error">{emailError}</p>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            name="phone"
          />
          {phoneError && <p className="error">{phoneError}</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            name="password"
          />
          {passwordError && <p className="error">{passwordError}</p>}
          <br />
          <br />
          <button type="submit" disabled={loading}>Signup</button>
        </form>
        <a href="/login">Already a user? Login Here</a>
      </div>
    </div>
  );
}
