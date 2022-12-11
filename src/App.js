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

import "react-datepicker/dist/react-datepicker.css";


function App() {


    // const auth = getAuth();
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     ReactTooltip.rebuild()
    //     dispatch(getTasks())
    //     dispatch(getProjects())
    // }, [])


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
                    {/*<Route path={'/:path'} element={<Main/>}/>*/}
                    {/*<Route exact path={'inbox'} element={<Main/>}/>*/}
                    {/*<Route exact path={'today'} element={<Main/>}/>*/}
                    {/*<Route exact path={'upcoming'} element={<Main/>}/>*/}
                    {/*<Route exact path={'anytime'} element={<Main/>}/>*/}


                    {/*<Route path={'/:module'} element={<Main/>}/>*/}
                    {/*<Route exact path={'/:path/task/:id'} element={<Main/>}/>*/}
                    {/*<Route exact path={'/:path/:id'} element={<Main/>}/>*/}

                    {/*<Route exact path={'/:module/:id'} element={<Main/>}/>*/}
                    {/*<Route exact path={'/:module/:id/task/:tid'} element={<Main/>}/>*/}
                    {/*<Route exact path={'/:module/task/:id'} element={<Main/>}/>*/}

                    {/*<Route exact path={'/project/:id'} element={<Main/>}/>*/}
                    {/*<Route exact path={'/:path/:projectId/:sub/:taskId'} element={<Main/>}/>*/}


                    <Route path={'/:path/:id'} element={<Main/>}/>
                    <Route path={'/:path/:id/:path2/:id2'} element={<Main/>}/>
                    <Route path={'/:path/:path2/:id2'} element={<Main/>}/>
                    <Route path={'/:path'} element={<Main/>}/>

                    <Route exact path="/" element={<Navigate to="/today" replace/>}/>
                    <Route exact path={"/login"} element={<Login/>}/>
                </Routes>
            </DndProvider>
        </Provider>
    );
}

export default App;
