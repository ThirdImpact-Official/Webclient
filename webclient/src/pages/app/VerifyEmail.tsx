import { CreadentialAction } from "@/actions/CreadentialAction";
import React, {useEffect,useState} from "react";
import { useParams ,useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const { token } = useParams();
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const client = new CreadentialAction();


    useEffect(() => {
        if (token) {
            client.verifyEmail(token).then(response => {
                setMessage(response.Message);
                navigate("/");
            });
        }
    }, [token, navigate]);

    return (
        <div>
            <h1>Verify Email</h1>
            <p>{message}</p>
        </div>
    );
};
export default VerifyEmail;