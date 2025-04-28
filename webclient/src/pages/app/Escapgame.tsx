import EscapeGameComponent from "./Escapegame/EscapeGameComponent"
import { useAuth } from "@/context/AuthContext";
import { Import } from "lucide-react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
const EscapeGame=() => {
    const authCOntext=useAuth();
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(authCOntext.isAuthenticated);
    useEffect(()=>{
        if (!isAuth){
            navigate("/login");
        }
    })
    return (
        <>
            <EscapeGameComponent/>
        </>
    )
}
export default EscapeGame;