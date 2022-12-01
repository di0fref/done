import Sidebar from "./Sidebar";
import {useEffect, useState} from "react";
import {useNavigate, useLocation, useParams} from "react-router-dom";
import TaskHeader from "./TaskHeader";
import {Container} from "./Container";
import axios from "axios";
import {getAuth} from "firebase/auth";
import MainMenu from "./MainMenu";

const paths = [
    "/today",
    "/upcoming",
    "/anytime",
    "/someday"
];


const api_config = {
    url: "http://localhost:8000",
}
const http = axios.create({
    baseURL: api_config.url,
    headers: {
        "Content-type": "application/json",
    },
});

export default function Main() {
    const [tasks, setTasks] = useState([]);

    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    async function getToday() {
        const response = await fetch("http://localhost:8000/today")
        return await response.json()
    }

    async function getUpcoming() {
        const response = await fetch("http://localhost:8000/upcoming")
        return await response.json()
    }

    async function isLoggedIn() {
        try {
            await new Promise((resolve, reject) =>
                getAuth().onAuthStateChanged(
                    user => {
                        if (user) {
                            // User is signed in.
                            resolve(user)
                        } else {
                            // No user is signed in.
                            reject('no user logged in')
                        }
                    },
                    // Prevent console error
                    error => reject(error)
                )
            )
            return true
        } catch (error) {
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
        if (!paths.includes(location.pathname)) {
            navigate("/upcoming")
        }
        switch (params.path) {
            case "today":
                getToday().then((data) => {
                    setTasks([...data])
                })
                break;
            case "upcoming":
                getUpcoming().then((data) => {
                    setTasks([...data])
                })
                break;
        }

    }, [params, location])


    const addTask = (task) => {
        setTasks([...tasks, task])
    }
    return (
        <div className="relative min-h-screen md:flex">
            <Sidebar/>
            <main id="content" className="flex-1 md:mx-6 lg:px-8">
                <div className="max-w-4xl _mx-auto">
                    <div className="px-4 py-6 sm:px-0">
                        <div className={'ml-3 flex justify-between'}>
                            <TaskHeader path={params.path}/>
                            <div><MainMenu/></div>
                        </div>
                        <Container cards={tasks}/>
                    </div>
                </div>
            </main>
        </div>
    )
}
