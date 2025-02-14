import { Box } from "@mui/material";
import Header from "../../common/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../common/Footer";

const AuthLayout=() => 
{
    function handleDrawerToggle(): void {
        throw new Error("Function not implemented.");
    }

    return(
        <div className="text-center w-full">
            <Box>
                    {/* Contenu principal */}
                <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minHeight: "100vh",width:"auto", border: "1px solid #ccc" }}>
                    {/* Header */}
                    <Header onMenuClick={handleDrawerToggle} />

                    {/* Contenu dynamique */}
            
                    <Box component="main" sx={{ flexGrow: 2, p: 0, backgroundColor: "#f4f4f4",width:"auto" }}>
                        <div className="grid-cols-2 h-full">
                            <div className="bg-black h-[1080 px]m-0 p-0 row-span-2 border ">
                                dsd
                            </div>
                            <div className=" row-span-1 border">
                                <Outlet />
                            </div>
                        </div>
                    </Box>

                    {/* Footer */}
                    <Footer />
                </Box>
        </Box>

        </div>
       
    );
};
export default AuthLayout;