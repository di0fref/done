import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useEffect, useState} from "react";
import ReactTooltip from "react-tooltip";
import PrivateRoute from "./auth/PrivateRoute";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Login from "./auth/Login";


function App() {

    useEffect(() => {
        ReactTooltip.rebuild()
    }, [])


    const [user, setUser] = useState(null)
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
            localStorage.setItem('expectSignIn', '1')
        } else {
            localStorage.removeItem("api_token")
            localStorage.removeItem('expectSignIn')
            setUser(null)
        }
    });

    return (
        <DndProvider backend={HTML5Backend}>
            <ReactTooltip
                effect={"solid"}
            />
            <Routes>
                <Route exact path={'/'} element={<PrivateRoute user={user}/>}>
                    <Route path={'/:path'} element={<Main/>}/>
                </Route>
                <Route exact path={"/login"} element={<Login/>}/>
            </Routes>
        </DndProvider>
    );
}

export default App;
