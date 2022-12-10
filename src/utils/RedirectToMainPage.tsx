import { Navigate } from "react-router-dom";

export default function RedirectToMainPage(){
    return <Navigate replace to='/' />;
}