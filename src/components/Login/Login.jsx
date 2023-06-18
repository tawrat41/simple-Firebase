import React, { useState } from 'react';
import { confirmPasswordReset, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { GoogleAuthProvider } from "firebase/auth";
import './Login.css'



const Login = () => {
    const [user, setUser] = useState()
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const LoggedInUser = result.user;
                console.log(LoggedInUser)
                setUser(LoggedInUser)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }

    const handleSignOut = () => {
        signOut(auth).then(result => {
            // Sign-out successful.
            console.log(result)
            setUser(null)
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div>
            {
                user ?
                    <button className='login-btn' onClick={handleSignOut}>Sign out</button> :
                    <button className='login-btn' onClick={handleGoogleSignIn}>Google Login</button>
            }
            {user && <div>
                <h2>User: {user.displayName}</h2>
                <h3>Email:{user.email}</h3>
            </div>

            }
        </div>
    );
};

export default Login;