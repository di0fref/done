import {FcGoogle} from "react-icons/fc";
import {browserLocalPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {app} from "../auth/firebase";


export default function Login() {

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

                        fetch("http://localhost:8000/api/users/login", {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json",
                            },
                            body: JSON.stringify({
                                idToken: credential.idToken,
                                user: user
                            })
                        }).then(response => response.json())
                            .then((result) => {
                                localStorage.setItem("api_token", result.api_token)
                                localStorage.setItem("showCompletedTasks", "1")
                                navigate('/today')
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
                        <button onClick={google} className={"bg-red-700 text-white font-medium p-4 w-full hover:bg-red-800"}>
                            <div className={"flex items-center justify-center "} id={"google-login"}>
                                <div className={""}><FcGoogle/></div>
                                <div className={"ml-2"}>Sign in with Google</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
