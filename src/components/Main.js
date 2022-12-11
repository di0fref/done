import Sidebar from "./Sidebar";
import {useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import TaskHeader from "./TaskHeader";
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
                    task:{},
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

            <div className={"relative min-h-screen md:flex bg-white"}>
                {/*<header className="absolute h-12 w-full left-0 top-0 z-50 border-b bg-white">*/}
                {/*    <div className={'flex justify-between'}>*/}
                {/*        <MainMenu/>*/}
                {/*    </div>*/}
                {/*</header>*/}
                <main className={" flex h-full flex-grow "}>
                    <Sidebar id={params.id ? params.id : null}/>
                    <div className={'h-screen overflow-y-auto w-full flex'}>
                        <div className={'_pt-12 flex-grow '}>
                            <div className={"w-full h-full _md:px-12 "}>
                                <Container showTaskDetail={showTaskDetail} filter={params.path} id={params.id ? params.id : null}/>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
