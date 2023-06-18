import React, { useState } from 'react';
import { confirmPasswordReset, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import './Login.css'



const Login = () => {
    const [user, setUser] = useState()
    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const LoggedInUser = result.user;
                console.log(LoggedInUser)
                setUser(LoggedInUser)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
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
                    <>
                        <button className='login-btn' onClick={handleGoogleSignIn}>Google Login</button>
                        <button className='login-btn' onClick={handleGithubSignIn}>GitHub Login</button>
                    </>
            }
            {user && <div>
                <h2>User: {user.displayName}</h2>
                <h3>Email:{user.email}</h3>
                <img src={user.photoURL} alt="" />
            </div>

            }
        </div>
    );
};

export default Login;