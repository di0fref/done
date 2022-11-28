import Sidebar from "./Sidebar";
import Task from "./Task";
import {useEffect, useState} from "react";
import {useNavigate, useLocation, useParams} from "react-router-dom";
import TaskHeader from "./TaskHeader";

const paths = [
    "/today",
    "/upcoming",
    "/anytime",
    "/someday"
];

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

    useEffect(() => {

        if(!paths.includes(location.pathname)){
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
            default:
                getUpcoming().then((data) => {
                    setTasks([...data])
                })
        }
    }, [params.path])

    const addTask = (task) => {
        setTasks([...tasks, task])
    }

    return (
        <div className="relative min-h-screen md:flex">
            <Sidebar/>
            <main id="content" className="flex-1 md:mx-6 lg:px-8">
                <div className="max-w-4xl _mx-auto">
                    <div className="px-4 py-6 sm:px-0">
                        <div className={'ml-3 font-semibold text-xl'}>
                            <TaskHeader path={params.path}/>
                        </div>
                        <div className={"border-b"}></div>
                        {tasks.map(function (item, index) {
                            return (
                                <Task task={item} key={index}/>
                            )
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}
