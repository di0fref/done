import {Link, useNavigate} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import {useState} from "react";
import {FaLock} from "react-icons/fa";
import {HiLockClosed, HiMail} from "react-icons/hi";
import {signOutFireBase} from "./firebase"
import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import { redirect } from "react-router-dom";


export default function Login() {
    const [username, setUsername] = useState("fredrik@fahlstad.se")
    const [password, setPassword] = useState("kalle1234")
    const navigate = useNavigate();
    const [showUserError, setShowUserError] = useState(false)

    const google = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;

                localStorage.setItem("api_token", result.user.accessToken)
                return redirect('/')

            }).catch((error) => {
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
    const submitHandler = (e) => {
        const auth = getAuth();

        e.preventDefault()
        signInWithEmailAndPassword(auth, username, password)
            .then((result) => {

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === "auth/user-not-found") {
                    setShowUserError(true)
                }
            });

    }
    return (
        <>
            <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-200 h-screen">
                <div className="w-full max-w-md p-4 rounded rounded-lg bg-white shadow shadow-xl">
                    {showUserError
                        ? <div className={"text-red-500 mt-4 mb-6 text-center"}>We cannot find any user with those
                            credentials.</div>
                        : ""}
                    <div>
                        <img className="w-auto h-12 mx-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                        <h2 className="mt-6 text-3xl font-extrabold text-center text-normal">
                            Sign in to your account
                        </h2>
                    </div>
                    <button onClick={google} className={"bg-white w-full h-10 mt-6 rounded hover:bg-indigo-100"}>
                        <div className={"flex items-center "} id={"google-login"}>
                            <div className={"ml-4"}><FcGoogle/></div>
                            <div className={"ml-2"}>Sign in wth Google</div>
                        </div>
                    </button>
                    <div className={"flex items-center justify-center mt-3"}>
                        <div className={"uppercase text-xs"}>Or</div>
                    </div>
                    <form className="mt-4" action="#" method="POST" onSubmit={submitHandler}>

                        <div className="">
                            <div className={"mt-2 relative"}>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="relative block w-full px-3 py-2 pl-10 pr-3 rounded bg-white ring-1 ring-gray-200" placeholder="Email"/>
                                <div className="absolute inset-y-0 left-0 flex items-center px-2 m-px rounded pointer-events-none">
                                    <HiMail/>
                                </div>
                            </div>

                            <div className={"mt-2 relative"}>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    className="relative block w-full px-3 py-2 pl-10 pr-3 rounded bg-white ring-1 ring-gray-200" placeholder="Password"/>
                                <div className="absolute inset-y-0 left-0 flex items-center px-2 m-px rounded pointer-events-none bg-gray-200_">
                                    <FaLock/>
                                </div>
                            </div>
                        </div>


                        <div>
                            <button type="submit" className="relative items-center flex justify-center w-full h-10 px-4 py-3 mt-4 mb-8 font-medium text-white border border-transparent rounded-md group bg-indigo-500">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 m-px rounded">
                                  <HiLockClosed/>
                              </span>
                                <span>Sign in</span>
                            </button>
                        </div>
                    </form>
                    <div className={"flex justify-end items-center font-semibold"}>
                        <span>Don't have an account? <Link to={"/signup"} className={"link"}>Sign up</Link></span>
                    </div>
                </div>
            </div>
            {/*<ThemeSwitcher/>*/}
        </>
    )
}
