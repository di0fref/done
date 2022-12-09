import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useEffect,} from "react";
import ReactTooltip from "react-tooltip";
import {onAuthStateChanged, getAuth} from "firebase/auth"
import Login from "./components/Login";
import {store} from './redux/store'
import {Provider} from 'react-redux'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {useDispatch} from "react-redux";
// import {getTasks} from "./redux/taskSlice";
// import {getProjects} from "./redux/projectSlice";
function App() {


    // const auth = getAuth();

    useEffect(() => {
        ReactTooltip.rebuild()
    }, [])


    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         dispatch(getTasks())
    //         dispatch(getProjects())
    //     } else {
    //         console.log("No user is signed in");
    //     }
    // });


    return (
        <Provider store={store}>
            <ToastContainer
                hideProgressBar={true}
                className={""}
                position="bottom-left"/>
            <DndProvider backend={HTML5Backend}>
                <ReactTooltip
                    effect={"solid"}
                />
                <Routes>
                    <Route path={'/:path/:id'} element={<Main/>}/>
                    <Route path={'/:path'} element={<Main/>}/>
                    <Route exact path="/" element={<Navigate to="/today" replace/>}/>
                    <Route exact path={"/login"} element={<Login/>}/>
                </Routes>
            </DndProvider>
        </Provider>
    );
}

export default App;
