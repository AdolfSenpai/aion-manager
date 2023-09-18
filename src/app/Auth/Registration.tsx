import { GoogleAuthProvider, User, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { useState } from "preact/hooks";
import { StateUpdater } from "preact/hooks";

export interface RegistrationProps {
    setUser: StateUpdater<User>;
    setRegistration: StateUpdater<boolean>;
}

interface Errors {
    name?: string;
    email?: string;
    password?: string;
    backend?: string;
}

export default function Registration(props: RegistrationProps) {

    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>();
    const [errors, setErrors] = useState<Errors>({});

    const signUp = () => {

        createUserWithEmailAndPassword(getAuth(), email, password)
            .then(result => {
                props.setUser(result.user);
                setName(null);
                setEmail(null);
                setPassword(null);
                setPasswordConfirmation(null);
                setErrors(null);
            })
            .catch(err => setErrors({...errors, backend: err.message}));
    }

    const handlePasswordChange = (value: string) => {

        setPassword(value);
        checkPassword();
    }

    const handlePasswordConfirmationChange = (value: string) => {

        setPasswordConfirmation(value);
        checkPassword();
    }

    const checkPassword = () => {

        !password
            || password.length === 0
            || !passwordConfirmation
            || passwordConfirmation.length === 0
            || password === passwordConfirmation
            || setErrors({...errors, password: "Passwords don't match"});
    }

    return (
        <div class="box">

            <div class="field">
                <label class="label">Name</label>
                <p class="control has-icons-left">
                    <input 
                        class="input"
                        placeholder="Alex"
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </p>
            </div>

            <div class="field">
                <label class="label">Email</label>
                <p class="control has-icons-left">
                    <input 
                        class="input"
                        placeholder="example@mail.com"
                        type="email"
                        onChange={(e) => setEmail(e.currentTarget.value)}
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
                        class={"input" + (errors.password ? " is-danger" : "")}
                        placeholder="********"
                        type="password"
                        onChange={(e) => handlePasswordChange(e.currentTarget.value)}
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>

            <div class="field">
                <p class="control has-icons-left">
                    <input
                        class={"input" + (errors.password ? " is-danger" : "")}
                        placeholder="********"
                        type="password"
                        onChange={(e) => handlePasswordConfirmationChange(e.currentTarget.value)}
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
                { errors.password && <p class="help is-danger">Passwords don't match</p> }
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
                    <button
                        class="button is-primary"
                        onClick={signUp}
                        disabled={!errors}
                    >
                        Sign up
                    </button>
                </div>
                <div class="column is-narrow">
                    <p>
                        Already have an account?&nbsp;
                        <a onClick={() => props.setRegistration(false)}>
                            Sign in.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}