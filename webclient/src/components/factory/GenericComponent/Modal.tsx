import { Button, Modal, Typography, Box } from "@mui/material"
import React, { FC, useState } from "react";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
interface modalProps {
    children: React.ReactNode;
    Title: string;
    Description: string;
}
const ModalComponent: FC<modalProps> = ({children,Title,Description}) => 
{
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
       <>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                {Title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {Description}
                </Typography>
                <Box>
                    {children}
                </Box>
                <Box>
                    <Button variant="contained" onClick={handleClose}>Fermer</Button>
                </Box>
            </Box>
            </Modal>
       </> 
    );
}
export default ModalComponent;