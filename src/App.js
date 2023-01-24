import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import {Tooltip} from "react-tooltip";
import Login from "./components/Login";
import {store} from './redux/store'
import {Provider} from 'react-redux'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import "./editor.css"
import "react-datepicker/dist/react-datepicker.css";
import 'react-tooltip/dist/react-tooltip.css';
import React, {Suspense} from 'react';


function App() {

    return (
        <Suspense fallback={<div>Loading... </div>}>

            <Provider store={store}>
                <ToastContainer
                    hideProgressBar={true}
                    className={""}
                    position="bottom-left"/>
                <Tooltip
                    effect={"solid"}
                />
                <Routes>

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
