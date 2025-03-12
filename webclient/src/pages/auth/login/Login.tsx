
import React, { useState } from "react";

type logindata=
{
    name:string;
    password:string;
}

/**
 * login page.
 * @returns 
 */
const Login:React.FC = () => {
    const [formData, setFormData] = useState<logindata>({
        name: "",
        password: "",
    });
    const handleOnChange = (key: keyof logindata, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    }
    const handleSubmit= ()=> 
    {
        console.log("submit");
    }
    return(
        <main>

        </main>
    )
}

export default Login;
