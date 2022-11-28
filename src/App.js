import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./components/Main";



function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Navigate to="/upcoming" replace />} />
            <Route path={'/:path'} element={<Main/>}/>
            <Route path={'/project/:id'} element={<Main/>}/>
            <Route path={'/list/:id'} element={<Main/>}/>
        </Routes>
    );
}

export default App;
