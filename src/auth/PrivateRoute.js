import {getAuth} from "firebase/auth";
import {Navigate, Outlet} from 'react-router-dom';

export default function PrivateRoute() {

    return getAuth().currentUser != null
        ? <Outlet/>
        : localStorage.getItem('expectSignIn')
            ? <Outlet/>
            : <Navigate to="/login"/>
}
