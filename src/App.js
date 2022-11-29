import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {useEffect} from "react";
import ReactTooltip from "react-tooltip";

function App() {

    useEffect(() => {
        ReactTooltip.rebuild()
    }, [])

    return (
        <DndProvider backend={HTML5Backend}>
            <ReactTooltip
                effect={"solid"}
            />
            <Routes>
                <Route exact path="/" element={<Navigate to="/upcoming" replace/>}/>
                <Route path={'/:path'} element={<Main/>}/>
                <Route path={'/project/:id'} element={<Main/>}/>
                <Route path={'/list/:id'} element={<Main/>}/>
            </Routes>
        </DndProvider>
    );
}

export default App;
