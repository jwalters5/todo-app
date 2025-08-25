"use client";
import { auth, googleProvider, signInWithPopup, signOut } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./Auth.module.css"

export default function Auth() {
    const [user] = useAuthState(auth);

    const login = () => signInWithPopup(auth, googleProvider);
    const logout = () => signOut(auth);

    if (user) {
        return (
          <div className={styles.auth}>
            <p>Welcome, {user.displayName}</p>
            <button onClick={logout}>Logout</button>
          </div>  
        );
    }
    return <button onClick={login}>Login with Google</button>

}