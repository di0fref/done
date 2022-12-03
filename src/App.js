import './App.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Main from "./components/Main";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useEffect, useState} from "react";
import ReactTooltip from "react-tooltip";
import {onAuthStateChanged, getAuth} from "firebase/auth"
import Login from "./components/Login";
import {store} from './redux/store'
import {Provider} from 'react-redux'

function App() {

    const navigate = useNavigate();

    const auth = getAuth();

    useEffect(() => {
        ReactTooltip.rebuild()
    }, [])


    onAuthStateChanged(auth, (user) => {
        // if (user) {
        //     console.log("// User is signed in")
        // } else {
        //     console.log("// No user is signed in");
        // }
    });


    return (
        <Provider store={store}>
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
        </Provider>
    );
}

export default App;
