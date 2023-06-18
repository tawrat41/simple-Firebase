import React from 'react';
import { confirmPasswordReset, getAuth, signInWithPopup } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { GoogleAuthProvider } from "firebase/auth";



const Login = () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
        .then( result => {
            const user = result.user;
            console.log(user)
        })
        .catch( error => {
            console.log('error', error.message)
        })
    }

    return (
        <div>
            <button onClick={handleGoogleSignIn}>Google Login</button>
        </div>
    );
};

export default Login;