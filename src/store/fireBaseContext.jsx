// import React, { createContext, useEffect, useState } from 'react';
// export const FirebaseContext = createContext(null)

import React, { createContext, useEffect, useState } from 'react';
import { auth,db } from '../firebase/config';

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null)

const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, db }}>
         
      {children}
    </FirebaseContext.Provider>
);
};

const  AuthProvider = ({children})=>{
    const [user, setUser]= useState(null)
   
      
       return(
          <AuthContext.Provider value={{user, setUser}}>
             {children}
          </AuthContext.Provider>
  )
  }

export {FirebaseProvider,AuthProvider}