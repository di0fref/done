import './App.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Main from "./components/Main";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useEffect, useState} from "react";
import ReactTooltip from "react-tooltip";
import {onAuthStateChanged, getAuth} from "firebase/auth"
import Login from "./components/Login";

function App() {

    const navigate = useNavigate();

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {

    });


    useEffect(() => {
        ReactTooltip.rebuild()
    }, [])

    return (
        <DndProvider backend={HTML5Backend}>
            <ReactTooltip
                effect={"solid"}
            />
            <Routes>
                <Route path={'/:path'} element={<Main/>}/>
                <Route exact path="/" element={<Navigate to="/today" replace/>}/>
                <Route exact path={"/login"} element={<Login/>}/>
            </Routes>
        </DndProvider>
    );
}

export default App;
