import { GoogleAuthProvider, User, getAuth, signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { useState } from "preact/hooks";
import { StateUpdater } from "preact/hooks";

export interface AuthProps {
    setUser: StateUpdater<User>;
    setRegistration: StateUpdater<boolean>;
}

interface Errors {
    backend?: string;
}

export default function Auth(props: AuthProps) {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [errors, setErrors] = useState<Errors>();

    const loginWithGoogle = () => {

        signInWithPopup(getAuth(), new GoogleAuthProvider())
            .then(result => {
                props.setUser(result.user);
                setEmail(null);
                setPassword(null);
                setErrors(null);
            })
            .catch(error => setErrors({...errors, backend: error.message}));
    }

    const login = () => {

        signInWithEmailAndPassword(getAuth(), email, password)
            .then(result => {
                props.setUser(result.user);
                setEmail(null);
                setPassword(null);
                setErrors(null);
            })
            .catch(setErrors);
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

            { !!errors.backend && 
                <div class="message is-danger">
                    <div class="message-head">
                        <p>Error</p>
                    </div>
                    <div class="message-body">
                        <p>{errors.backend}</p>
                    </div>
                </div> 
            }

            <div class="columns is-vcentered">
                <div class="column">
                    <div class="buttons">
                        <button
                            class="button is-primary"
                            onClick={login}
                        >
                            Sign in
                        </button>
                        <button class="button" onClick={loginWithGoogle}>
                            <span class="icon">
                                <i class="fa-brands fa-google"></i>
                            </span>
                        </button>
                    </div>
                </div>
                <div class="column is-narrow">
                    <p>
                        Don't have an account?&nbsp;
                        <a onClick={() => props.setRegistration(true)}>
                            Sign up.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}