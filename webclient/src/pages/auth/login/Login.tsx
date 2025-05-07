import { LoginDto } from "@/interfaces/Credentials/loginDto";
import { Box, Button, TextField, Typography,InputAdornment,IconButton } from "@mui/material";
import { Visibility,VisibilityOff } from "@mui/icons-material";
import { CreadentialAction } from "@/actions/CreadentialAction";
import React, { useEffect, useState } from "react";
import { LoginCredentials } from "@/interfaces/login/loginCredentials";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";


/**
 * login page.
 * @returns 
 */
const Login:React.FC = () => {
//--------------------state----------
    const [formData, setFormData] = useState<LoginCredentials>({
        emailAdress: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const CredAction= new CreadentialAction();
    const authContext= useAuth();
    const NavTo=useNavigate();
    const [isAuthenticated,setIsAuthenticated]=useState(authContext.isAuthenticated);
//------------------Handlers-----------
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    };

    const handleOnChange = (key: keyof LoginCredentials, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    }
    const handleSubmit = async () => {
        try {
            console.log(formData);
            const responseAuth= await authContext.login(formData);
            if (authContext.isAuthenticated) {
                // a retirer ai u seind e l'application
             
                automamated();
            }
            if(authContext.isAuthenticated){
                automamated();
            }
        } catch (error) {
            console.error("Failed to login:", error);
        }
    };
    
    function automamated()
    {
        console.log("automated "+authContext.isAuthenticated);
        NavTo("/");
    }

    useEffect(() => {

        if(isAuthenticated)
        {
            console.log(isAuthenticated);
            console.log("useEffect : "+authContext.isAuthenticated);
            automamated();
        }
        else
        {
            setIsAuthenticated(false);
        }
    },[authContext.isAuthenticated])

//------------------component----------
    if(isAuthenticated) 
    {
        return(
            <>
                <p>Auth already complete</p>
            </>
        )
      
    }
    else
    {
        return(
            <Box className="m-2 p-2 text-center">
                <form className="items-center justify-center">
                    <Box className="space-y-4 my-20 py-20 "
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                bgcolor: "background.paper",
                                borderRadius: 3,
                                boxShadow: 8,
                                p: 4,
                                width: { xs: "90%", sm: 400 },
                                maxHeight: "90vh",
                                overflowY: "auto",
                            }}>
                        <Box className="">

                            <Typography variant="h5">Connecte to The Application </Typography>
                            <Typography>{isAuthenticated ? "good" : "bad"}</Typography>
                        </Box>
                        <Box>
                            <Typography>Email</Typography>
                            <TextField  name="email" 
                                        value={formData.emailAdress} 
                                        onChange={(e) => handleOnChange("emailAdress", e.target.value)} 
                                        label="email" />
                        </Box>
                        <Box>
                            <Typography>Password</Typography>
                            <TextField  name="Password"
                                        type={ showPassword ? "text" : "password" }
                                        InputProps={{
                                            endAdornment:(
                                              <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label={
                                                            showPassword ? 'hide the password' : 'display the password'
                                                        }
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        onMouseUp={handleMouseUpPassword}
                                                        edge="end"
                                                        >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                              </InputAdornment>
                                                    )

                                        }}
                                        
                                        value={formData.password} 
                                        onChange={(e) => handleOnChange("password", e.target.value)}
                                        label="password" />
                        </Box>
                        <Box >
                            <Button 
                                variant="contained"
                                className="bg-black"   
                                onClick={handleSubmit} >Connecter</Button>
                        </Box>

                    </Box>
                </form>
            </Box>)
    }
}

export default Login;
