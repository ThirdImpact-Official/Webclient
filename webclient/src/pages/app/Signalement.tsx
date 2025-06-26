import SignalementComponent from "./Signalement/SignalementComponent";
import {useAuth} from '@/context/AuthContext'
import {Navigate } from 'react-router-dom'
import useEffect,{useState} from 'react';
import React from 'react';

const Signalement = () => {
    const {isAuthenticated} =useAuth();
    const [isAuth, setIsAuth] = useState(isAuthenticated);

    useEffect(()=>{
        if (!isAuth){
            Navigate("/login");
        }
    },[])


    return (
      <SignalementComponent/>
    );
}

export default Signalement;