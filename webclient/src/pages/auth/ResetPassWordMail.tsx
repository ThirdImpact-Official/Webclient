import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreadentialAction } from "@/actions/CreadentialAction";

/**
 * This component is used to reset a user's password. The component expects a 
 * token parameter in the url. This token is used to verify the reset password 
 * request and to generate a new password.
 * 
 * @returns {JSX.Element} A JSX element containing a form to reset a user's password.
 */
const ResetPassWordComponent = () => {
    const queryParams= new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const email = queryParams.get("email");
    const [message,setMessage]=useState("");
    const client= new CreadentialAction();
    const fetchverification=async(token:string) =>{
        try{
            
        }
        catch(e){

        }
    }

    useEffect(() => {
        fetchverification(token);
    }, []);

    return (
        <div>
            <h1>Reset Password</h1>
        </div>
    )
}
export default ResetPassWordComponent;