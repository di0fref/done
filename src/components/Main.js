import Sidebar from "./Sidebar";
import {useEffect, useState} from "react";
import {useNavigate, useLocation, useParams} from "react-router-dom";
import TaskHeader from "./TaskHeader";
import {Container} from "./Container";
import axios from "axios";

const paths = [
    "/today",
    "/upcoming",
    "/anytime",
    "/someday"
];


const api_config = {
    url: "http://localhost:8000",
    // url: "http://backend.loc/api",
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

    useEffect(() => {

        (async () => {
            let response = await http.get("/today");
            setTasks([...response.data])
        })();

    }, [])


    const addTask = (task) => {
        setTasks([...tasks, task])
    }
    console.log(tasks);

    return (
        <div className="relative min-h-screen md:flex">
            <Sidebar/>
            <main id="content" className="flex-1 md:mx-6 lg:px-8">
                <div className="max-w-4xl _mx-auto">
                    <div className="px-4 py-6 sm:px-0">
                        <div className={'ml-3 font-semibold text-xl'}>
                            <TaskHeader path={params.path}/>
                        </div>
                        {/*{tasks.map(function (item, index) {*/}
                        {/*    return  (*/}
                        {/*        <Task task={item} key={index}/>*/}
                        {/*    )*/}
                        {/*})}*/}
                        <Container tasks={[...tasks]}/>
                    </div>
                </div>
            </main>
        </div>
    )
}
