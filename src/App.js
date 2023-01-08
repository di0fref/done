import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {Tooltip} from "react-tooltip";
import Login from "./components/Login";
import {store} from './redux/store'
import {Provider, useDispatch} from 'react-redux'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import "./editor.css"
import "react-datepicker/dist/react-datepicker.css";
import 'react-tooltip/dist/react-tooltip.css';
import Cal from "./components/Cal";

function App() {

    return (
        <Provider store={store}>
            <ToastContainer
                hideProgressBar={true}
                className={""}
                position="bottom-right"/>
            <DndProvider backend={HTML5Backend}>
                <Tooltip
                    effect={"solid"}
                />
                <Routes>
                    <Route exact path={'/calendar'} element={<Cal/>}></Route>
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
