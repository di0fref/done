import Sidebar from "./Sidebar";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Container} from "./Container";
import {getAuth} from "firebase/auth";
import MainMenu from "./MainMenu";
import {useAuthState} from "react-firebase-hooks/auth";
import {useDispatch, useSelector} from "react-redux";
import {getTasks} from "../redux/taskSlice";
import {getProjects} from "../redux/projectSlice";
import {onAuthStateChanged} from "firebase/auth"
import {setCurrent} from "../redux/currentSlice";
import {paths} from "./helper";
import {FaCheckSquare} from "react-icons/fa";
import SearchDialog from "./SearchDialog";
import ThemeSwitcher from "./ThemeSwitcher";


export default function Main() {

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const auth = getAuth();

    const allTasks = useSelector(state => state.tasks)
    const allProjects = useSelector(state => state.projects)

    function waitForLocalStorage(key, cb, timer) {

        // console.log("waiting")
        if (!localStorage.getItem(key)) {

            return timer = setTimeout(waitForLocalStorage.bind(null, key, cb), 100)
        }
        clearTimeout(timer)
        if (typeof cb !== 'function') {
            return localStorage.getItem(key)
        }
        // console.log("done")
        return cb(localStorage.getItem(key))
    }

    useEffect(() => {
        waitForLocalStorage("AccessToken", function (value) {

            /* Make sure we have a sort value in LS */
            const sort = localStorage.getItem("sort");

            if (!sort) {
                localStorage.setItem("sort", JSON.stringify(
                    {
                        "title": "Due Date",
                        "field": "due"
                    },
                ))
                localStorage.setItem("sortDirection", JSON.stringify(
                    {
                        "direction": "asc",
                        "title": "Ascending",
                    },
                ))
            }


            dispatch(getTasks())
            dispatch(getProjects())
        })
    }, [])

    const showTaskDetail = (id) => {
        console.log(id)
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
        } else {
            console.log("User logged out firebase");
            localStorage.removeItem("AccessToken")
        }
    });


    async function isLoggedIn() {
        try {
            await new Promise((resolve, reject) =>
                getAuth().onAuthStateChanged(
                    user => {
                        if (user) {
                            resolve(user)
                        } else {
                            // console.log("User logged out firebase");
                            localStorage.removeItem("AccessToken")
                            reject('no user logged in')
                            navigate("login")
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

        if (params.path === "project" && params.path2 === "task") {
            dispatch(setCurrent({
                    task: allTasks.find(task => task.id === params.id2),
                    project: allProjects.find(project => project.id === params.id)
                }
            ))
            return
        }


        if (params.path === "project") {
            dispatch(setCurrent({
                    task: {},
                    project: allProjects.find(project => project.id === params.id)
                }
            ))
            return
        }


        if (paths.find(p => params.path === p) && params.path2 === "task") {
            dispatch(setCurrent({
                    task: allTasks.find(task => task.id === params.id2),
                    project: {}
                }
            ))
            return
        }

        if (paths.find(p => params.path === p)) {
            dispatch(setCurrent({
                    task: {},
                    project: {}
                }
            ))
            return
        }


    }, [params, allTasks, allProjects])


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

            <div className={"relative h-screen md:flex bg-white dark:bg-gray-900"}>
                <main className={"flex h-full flex-grow _pt-12"}>
                    <div className={'sidebar-active w-[50px] border-r dark:border-gray-700 px-2 py-4'}>
                        <MainMenu/>
                        <div className={'flex flex-col items-center space-y-6 mt-6'}>
                            <div><FaCheckSquare className={'w-6 h-6 text-blue-500'}/></div>
                            <div><SearchDialog/></div>
                        </div>
                    </div>
                    <Sidebar id={params.id ? params.id : null}/>
                    <div className={'h-screen overflow-y-auto w-full flex'}>
                        <div className={'flex-grow'}>
                            <div className={'max-w-4xl_ mx-auto h-full _md:px-12 '}>
                                <Container showTaskDetail={showTaskDetail} filter={params.path} id={params.id ? params.id : null}/>
                            </div>
                        </div>
                    </div>
                    <ThemeSwitcher/>
                </main>
            </div>
        )
    }
}
