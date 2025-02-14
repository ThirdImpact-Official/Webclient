import GenericForm from "@/components/factory/GenericComponent/GenericForm";
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
            <GenericForm data={formData} 
            onSubmit={handleSubmit} onChange={handleOnChange}                 
           />
        </main>
    )
}

export default Login;
