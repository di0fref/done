import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useEffect, useState} from "react";
import ReactTooltip from "react-tooltip";
import {onAuthStateChanged, getAuth} from "firebase/auth"
import PrivateRoute from "./auth/PrivateRoute";
import Login from "./components/Login";

function App() {

    useEffect(() => {
        ReactTooltip.rebuild()
    }, [])

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            localStorage.setItem('expectSignIn', '1')
        } else {
            localStorage.removeItem("accessToken")
            localStorage.removeItem('expectSignIn')
        }
    });


    return (
        <DndProvider backend={HTML5Backend}>
            <ReactTooltip
                effect={"solid"}
            />
            <Routes>
                <Route exact path={'/'} element={<PrivateRoute/>}>
                    <Route path={'/:path'} element={<Main/>}/>
                    <Route exact path="/" element={<Navigate to="/upcoming" replace/>}/>
                </Route>
                <Route exact path={"/login"} element={<Login/>}/>
            </Routes>
        </DndProvider>
    );
}

export default App;
