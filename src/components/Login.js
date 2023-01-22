import {FcGoogle} from "react-icons/fc";
import {browserLocalPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "../redux/currentSlice";

export default function Login() {

    function CheckError(response) {
        if (response.status >= 200 && response.status <= 299) {
            return response;
        } else {
            throw Error(response.statusText);
        }
    }

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const google = () => {

        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        try {
            setPersistence(auth, browserLocalPersistence).then(() => {
                signInWithPopup(auth, provider)
                    .then((result) => {

                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        const user = result.user;
                        console.log("Firebase: user logged in")

                        axios.post("/login", {
                            password: user.uid,
                            email: user.email,
                            user: user,
                            idToken: credential.idToken
                        })
                            .then(CheckError)
                            .then((response) => {
                                localStorage.setItem("AccessToken", response.data.access_token)
                                localStorage.setItem("user", JSON.stringify(response.data.user))
                                dispatch(setCurrentUser(response.data.user))
                                navigate('/today')
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    })
            }).catch((error) => {
                console.log(error)
            });
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="mx-8 flex flex-col items-center justify-center mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Welcome to Done
                        </h1>
                        <button onClick={google} className={"bg-[#5186ec] rounded-lg text-white font-medium px-2 py-2 w-full hover:"}>
                            <div className={"flex items-center justify- "} id={"google-login"}>
                                <div><FcGoogle className={"h-8 w-8 rounded bg-white _p-1"}/></div>
                                <div className={"ml-2 text-center mr-10 flex-grow"}>Sign in with Google</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
