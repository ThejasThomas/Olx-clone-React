import React, { useState,useContext, useEffect } from "react"
import {BrowserRouter as Router ,Routes ,Route} from "react-router-dom"
import Home from "./Pages/Home"
import Signup from "./Pages/Signup"
import LoginPage from "./Pages/Login"
import Create from "./Pages/Create"
import View from "./Pages/ViewPost"
import { AuthContext, FirebaseContext } from "./store/fireBaseContext"
import { onAuthStateChanged } from "firebase/auth"
import PostProvider from "./store/postContext"

function App() {
   const {setUser} = useContext(AuthContext)
   const {auth,db}  = useContext(FirebaseContext)
   useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth,(user)=>{
           setUser(user)
      });
      return ()=> unsubscribe();
   },[])

  return (
    <>
    <PostProvider>
    <Router>
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/signup" element={<Signup />}/>
         <Route path="/login" element={<LoginPage/>}></Route>
         <Route path="/create" element={<Create/>}></Route>
         <Route path="/view" element={<View/>}></Route>
      </Routes>
    </Router>
    </PostProvider>
        
    </>
  )
}

export default App
