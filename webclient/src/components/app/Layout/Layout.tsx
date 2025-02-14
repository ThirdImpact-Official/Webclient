import { Box } from "@mui/material";
import { FC } from "react";
import { Outlet} from "react-router-dom";
import Footer from "../../common/Footer";
import { HeaderHome } from "../../common/Header";

export const Layout : FC = () => {
    function handleDrawerToggle(): void {
        throw new Error("Function not implemented.");
    }

    return(
        <div className="text-center w-full">
                <Box>
                        {/* Contenu principal */}
                    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minHeight: "100vh",width:"auto" }}>
                        {/* Header */}
                        <HeaderHome onMenuClick={handleDrawerToggle} />
                        {/* Contenu dynamique */}
                        
                            <Box component="main" sx={{ flexGrow: 1, p: 0,width:"auto", mb:4 }}>
                            
                            <div className="mt-10 pt-10">
                                        <Outlet />
                            </div>
                            
                            </Box>


                        {/* Footer */}
                        <Footer />
                      
                    </Box>
            </Box>

    </div>);
}

export default Layout