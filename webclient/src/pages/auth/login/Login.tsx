import { LoginDto } from "@/interfaces/Credentials/loginDto";
import { Box, Button, TextField, Typography } from "@mui/material";
import { CreadentialAction } from "@/actions/CreadentialAction";
import React, { useState } from "react";
import { LoginCredentials } from "@/interfaces/login/loginCredentials";


/**
 * login page.
 * @returns 
 */
const Login:React.FC = () => {
//--------------------state----------
    const [formData, setFormData] = useState<LoginCredentials>({
        email: "",
        password: "",
    });
    const CredAction= new CreadentialAction();
//------------------Handlers-----------
    const handleOnChange = (key: keyof LoginCredentials, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    }
    const handleSubmit = async () => {
        try {
            const response = await CredAction.Login(formData);
            if (response.Success) {
                // a retirer ai u seind e l'application
                console.log(response.Data);
            }
        } catch (error) {
            console.error("Failed to login:", error);
        }
    };
//------------------component----------
    return(
        <form>
            <Box>
                <Typography>Email</Typography>
                <TextField  name="name" 
                            value={formData.email} 
                            onChange={(e) => handleOnChange("email", e.target.value)} 
                            label="name" />
            </Box>
            <Box>
                <Typography>Password</Typography>
                <TextField  name="Password" 
                            value={formData.password} 
                            onChange={(e) => handleOnChange("password", e.target.value)} label="name" />
            </Box>
            <Box>
                <Button></Button>
            </Box>
        </form>)
}

export default Login;
