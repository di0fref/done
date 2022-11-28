import Sidebar from "./Sidebar";
import Textinput from "./Textinput";
import Task from "./Task";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import TaskHeader from "./TaskHeader";


export default function Main() {
    const [tasks, setTasks] = useState([]);

    let params = useParams();

    async function getToday() {
        const response = await fetch("http://localhost:8000/today")
        return await response.json()
    }

    async function getUpcoming() {
        const response = await fetch("http://localhost:8000/upcoming")
        return await response.json()
    }

    useEffect(() => {
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
                        <div className={'ml-3 font-semibold text-xl'}><TaskHeader path={params.path}/></div>
                        <div className={"mb-4"}>
                            {/*<Textinput addTask={addTask}/>*/}
                        </div>
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
