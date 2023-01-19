import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import {Tooltip} from "react-tooltip";
import Login from "./components/Login";
import {store} from './redux/store'
import {Provider, useSelector} from 'react-redux'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import "./editor.css"
import "react-datepicker/dist/react-datepicker.css";
import 'react-tooltip/dist/react-tooltip.css';
import Web from "./pages/Web";
import React, {Suspense, useEffect, useState} from 'react';
import Kanban from "./components/project/Board";
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {waitForLocalStorage, WS_URL} from "./components/helper";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const auth = getAuth();

function App() {
    const [username, setUsername] = useState("psfhgo");

    return (
        <Suspense fallback={<div>Loading... </div>}>

            <Provider store={store}>
                <ToastContainer
                    hideProgressBar={true}
                    className={""}
                    position="bottom-right"/>
                <Tooltip
                    effect={"solid"}
                />
                <Routes>

                    <Route exact path={'/board'} element={<Kanban/>}/>

                    {/*<Route exact path={'/'} element={<Web/>}/>*/}
                    <Route path={'/:path/:id'} element={<Main/>}/>
                    <Route path={'/:path/:id/:path2/:id2'} element={<Main/>}/>
                    <Route path={'/:path/:path2/:id2'} element={<Main/>}/>
                    <Route path={'/:path'} element={<Main/>}/>
                    <Route exact path="/" element={<Navigate to="/today" replace/>}/>
                    <Route exact path={"/login"} element={<Login/>}/>
                </Routes>
            </Provider>
        </Suspense>
    );
}

export default App;
