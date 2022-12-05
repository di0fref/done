import Sidebar from "./Sidebar";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import TaskHeader from "./TaskHeader";
import {Container} from "./Container";
import {getAuth} from "firebase/auth";
import MainMenu from "./MainMenu";
import {useAuthState} from "react-firebase-hooks/auth";
import {useDispatch} from "react-redux";
import {getTasks} from "../redux/taskSlice";
import {getProjects} from "../redux/projectSlice";

const paths = [
    "/today",
    "/upcoming",
    "/anytime",
    "/inbox"
];


export default function Main() {

    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch()

    async function isLoggedIn() {
        try {
            await new Promise((resolve, reject) =>
                getAuth().onAuthStateChanged(
                    user => {
                        if (user) {
                            resolve(user)
                        } else {
                            reject('no user logged in')
                        }
                    },
                    error => reject(error)
                )
            )
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    useEffect(() => {
        isLoggedIn().then((response) => {
            if (!response) {
                navigate("/login")
            }
        })
    }, [])

    useEffect(() => {
        dispatch(getTasks())
        dispatch(getProjects())
    }, [])

    const auth = getAuth();

    const [user, loading, error] = useAuthState(auth);

    if (error) {
        navigate("/login")
    }
    if (loading) {
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                {/*<div className={'text-4xl text-white font-bold tracking-wider mb-4'}>Welcome to Done</div>*/}
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <h2 className="text-center text-white text-xl font-semibold">Loading app...</h2>
                {/*<p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>*/}
            </div>

        )
    } else {
        return (
            // <div className="relative min-h-screen md:flex">
            //     <Sidebar/>
            //     <main id="content" className="flex-1 md:ml-6 lg:px-8 h-screen overflow-y-auto">
            //         <div className="max-w-4xl">
            //             <div className="px-4 py-6 sm:px-0">
            //                 <div className={'ml-3 flex justify-between'}>
            //                     <div><TaskHeader path={params.path}/></div>
            //                     <div><MainMenu/></div>
            //                 </div>
            //                 <Container filter={params.path}/>
            //             </div>
            //         </div>
            //     </main>
            // </div>

            <div className={"relative min-h-screen md:flex"}>
                <header className="absolute h-10 w-full left-0 top-0 z-50 border-b bg-white">
                    <div className={'flex justify-between'}>
                        <MainMenu/>
                    </div>
                </header>
                <main className={"relative flex h-full flex-grow"}>
                    <Sidebar id={params.id?params.id:null}/>
                    <div className={'bg-white w-full overflow-y-auto pt-14'}>
                        <div className={"max-w-4xl bg-white h-full md:px-12 pl-4 pr-8"}>
                            <TaskHeader path={params.path} id={params.id?params.id:null}/>
                            <Container filter={params.path} id={params.id?params.id:null}/>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
