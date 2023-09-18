import { GoogleAuthProvider, User, getAuth, signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { useState } from "preact/hooks";
import { StateUpdater } from "preact/hooks";

export default function Auth(props: {setUser: StateUpdater<User>}) {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<any>();

    const loginWithGoogle = () => {

        signInWithPopup(getAuth(), new GoogleAuthProvider())
            .then(result => props.setUser(result.user));
    }

    const login = () => {

        signInWithEmailAndPassword(getAuth(), email, password)
            .then(result => props.setUser(result.user))
            .catch(setError);
    }

    return (
        <div class="box">
            <div class="field">
                <label class="label">Email</label>
                <p class="control has-icons-left">
                    <input 
                        class="input"
                        placeholder="example@mail.com"
                        type="email"
                        onBlur={(e) => setEmail(e.currentTarget.value)}
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>

            <div class="field">
                <label class="label">Password</label>
                <p class="control has-icons-left">
                    <input
                        class="input"
                        placeholder="********"
                        type="password"
                        onBlur={(e) => setPassword(e.currentTarget.value)}
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>

            { !!error && 
                <div class="message is-danger">
                    <div class="message-head">
                        <p>Error</p>
                    </div>
                    <div class="message-body">
                        <p>{error.message}</p>
                    </div>
                </div> 
            }

            <div class="field">
                <p class="control">
                    <button
                        class="button is-primary"
                        onClick={login}
                    >
                        Sign in
                    </button>
                </p>
            </div>
            <a onClick={loginWithGoogle}>Or sign up with Google</a>
        </div>
    );
}