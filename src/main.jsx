import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider, FirebaseProvider } from './store/fireBaseContext.jsx'

// import { FirebaseContext } from './store/fireBaseContext.jsx'
// import firebase from './firebase/config.js'


createRoot(document.getElementById('root')).render(

  <StrictMode>
   <FirebaseProvider>
    <AuthProvider>
           <App />
    </AuthProvider>       
   </FirebaseProvider>
  </StrictMode>
)
