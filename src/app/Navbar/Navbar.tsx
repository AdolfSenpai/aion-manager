import { User, getAuth } from "@firebase/auth";
import logo from "../../assets/images/logo.png";
import { useState } from "preact/hooks";
import Registration from "../Auth/Registration";
import Auth from "../Auth/Auth";

export type AuthState = "initial" | "signedIn" | "signingIn" | "signingUp" | "notSignedIn";

export default function Navbar() {

    const [authState, setAuthState] = useState<AuthState>("initial");
    const [user, setUser] = useState<User>();

    getAuth().onAuthStateChanged(newUser => {
        
        if (user !== newUser) {

            setUser(newUser);
            setAuthState(!!newUser ? "signedIn" : "notSignedIn");
        }
    });

    const signOut = () => getAuth().signOut();

    return (
        <nav class="navbar is-fixed-top is-black" role="navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="http://localhost:5000/">
                    <img src={logo}/>
                </a>
            </div>
            <div class="navbar-menu">

                <div class="navbar-start">
                    <a class="navbar-item">
                        Home
                    </a>
                </div>
                {
                    authState === "initial"
                    && <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="loader" />
                        </div>
                    </div>
                    || authState === "signedIn"
                    && <div class="navbar-end"> 
                        <div class="navbar-item">
                            <p>Signed in as {user.displayName}</p>
                        </div>
                        <div class="navbar-item">
                            <figure class="image is-32x32">
                                <img class="is-rounded" src={user.photoURL} />
                            </figure>
                        </div>
                        <div class="column is-narrow">
                            <a class="button is-light" onClick={() => signOut()}>
                                Sign out
                            </a>
                        </div>
                    </div>
                    || <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <a 
                                    class="button is-primary"
                                    onClick={() => {setAuthState("signingUp"); console.log(authState);}}
                                >
                                    Sign up
                                </a>
                                <a
                                    class="button is-light"
                                    onClick={() => setAuthState("signingIn")}
                                >
                                    Sign in
                                </a>
                            </div>
                        </div>
                    </div>
                    || null
                }
            </div>

            <div class={"modal" + (authState === "signingUp" || authState === "signingIn" ? " is-active is-clipped" : "")}>
                <div class="modal-background" onClick={() => setAuthState("notSignedIn")}></div>
                <div class="modal-content">
                    { authState === "signingUp" && <Registration setUser={setUser} setAuthState={setAuthState}/> || null }
                    { authState === "signingIn" && <Auth setUser={setUser} setAuthState={setAuthState}/> || null }
                </div>
            </div>
        </nav>
    );
}