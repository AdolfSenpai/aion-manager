import { initializeApp } from "@firebase/app";
import { GoogleAuthProvider, User, getAuth, signInWithPopup } from "@firebase/auth";
import { useState } from "preact/hooks";
import Auth from "./Auth/Auth";
import Registration from "./Auth/Registration";

const firebaseConfig = {
    apiKey: "AIzaSyB6gLCAd3vsb-QYSAFhh_6BjjnruAxlJjI",
    authDomain: "aion-2023.firebaseapp.com",
    projectId: "aion-2023",
    storageBucket: "aion-2023.appspot.com",
    messagingSenderId: "776192316285",
    appId: "1:776192316285:web:f0c60e974ee605ad0a3214"
};

export default function App() {
      
    initializeApp(firebaseConfig);
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);
    const [registration, setRegistration] = useState(false);

    getAuth().onAuthStateChanged(user => { setUser(user), setLoading(false) });

    const signOut = () => {
        getAuth().signOut()
            .then(() => setUser(null));
    } 

    return (
        <div class="section">
            {/* TODO: nav-bar */}
            {/* TODO: home-page */}
            {
                loading
                && <div class="loader"></div>
                || user
                && (
                    <div>
                        { user.displayName }
                        <button onClick={signOut}>Sign out</button>
                    </div>
                )
            }

            <div class={"modal" + (!loading && !user ? " is-active is-clipped" : "")}>
                <div class="modal-background"></div>
                <div class="modal-content">
                    { 
                        registration
                        ? <Registration setUser={setUser} setRegistration={setRegistration}/>
                        : <Auth setUser={setUser} setRegistration={setRegistration}/>
                    }
                </div>
            </div>
            {/* TODO: registration */}
        </div>
    );
}