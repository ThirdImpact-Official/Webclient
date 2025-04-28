import { GetAdminDemandDto,ColumnsAdm } from "@/interfaces/AdminDemand/GetAdminDemand";
import { FC, useState } from "react";
import { data } from 'react-router-dom';
import DetailsComponent from '@/components/factory/GenericComponent/DetailsComponent';
import { Button, Divider, Box, Typography, Modal,Alert,Snackbar } from '@mui/material';
import ModalComponent from "@/components/factory/GenericComponent/Modal";
import { AdminDemandAction } from "@/actions/AdminDemandAction";
import CreateAdminResponse from "./CreateAdminResponse";
import AddResponseAdmin from "./CreateResponseAdmin";
import { ResponseAdminDemandDto } from "@/interfaces/AdminDemand/ResponseAdminDemand";
import { ErrorType } from '../../../../enums/RequestType';

interface AdminDetailsProps {
    data: GetAdminDemandDto
}
const AdminDetails:FC<AdminDetailsProps> = (props) => {

    const [adminDetail,setAdminDetails] = useState<GetAdminDemandDto | null>(props.data);
    const [responseAdmn,setResponseAdmn] = useState<ResponseAdminDemandDto>(
        {
            id:props.data.id,
            motifRefus:"",
            commentairesAdmin:"",
        }
    );
      //-------use a snackbar 
      const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
      const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const columns= ColumnsAdm
    const actions= new AdminDemandAction();
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
      }
    /**
     * Handles the refusal of a demand.
     * Displays a success message if the operation succeedes.
     * Otherwise, it displays an error message.
     */
    const handleRefused = async (item:ResponseAdminDemandDto) => {
        try {
            console.log(item);
            const response = await actions.RefuseDemand(item);
            console.log(response.Message);
            if(response.Success) {
                console.log("Error");
                console.log(JSON.stringify(response));
                console.log(response.ErrorType);
                console.log(response.Data)
                setSnackbarMessage(response.Message);
                setSnackbarOpen(true);
            }
            else {
                console.log("Error");
                console.log(response.ErrorType);
                console.log(response.Data)
                setSnackbarMessage(response.Message);
                setSnackbarOpen(true);
            }
        }
        catch (e) {

        }
    }
    const handleValidation = async (item:ResponseAdminDemandDto) => {
        try {
            console.log(item);
            let response;
            console.log(response = await actions.ValidDemand(item));
            console.log(response.Message);
            if(response.Success) {
                console.log("Success");
                console.log(response.ErrorType);
                console.log(response.Data)
                setSnackbarMessage(response.Message);
                setSnackbarOpen(true);
                setSnackbarMessage(response.Message);
                setSnackbarOpen(true);
            }
            else {
                console.log("Error");
                console.log(response.ErrorType);
                console.log(response.Data)
                setSnackbarMessage(response.Message);
                setSnackbarOpen(true);
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }
    const handleDelete = async () => {
        try {
            const reponse = await actions.DeleteDemand(props.data.id);
            
            console.log(reponse.Message);
            if(reponse.Success) { 
                setSnackbarMessage(reponse.Message);
                setSnackbarOpen(true);
            }
            else {
                setSnackbarMessage(reponse.Message);
                setSnackbarOpen(true);
            }
        }
        catch (e) {
            console.log("error");
        }
    }
    return(
        <>
            <Box className="m-2 p-2 flex flex-row justify-end items-center gap-4">
                <ModalComponent 
                    ButtonTitle="Supprimer" 
                    ButtonColor="error"
                    Title="Supprimer la demande"
                    Description="désirer vous réeellement supprimer la demande d'administration">
                    <Box className="text-center items-center">
                        <Button variant="contained" color="error" onClick={() => handleDelete()}>
                            <Typography>
                                Supprimer
                            </Typography>
                        </Button>
                    </Box>
                </ModalComponent>
            </Box>
            <DetailsComponent
                data={adminDetail} 
                columns={columns}  />    
            <Divider    className="mt-4 p-4" 
                        orientation="horizontal" 
                        flexItem />
            <Box className="m-2 p-2 flex flex-row justify-evenly items-center gap-4">
               <ModalComponent  ButtonTitle="Refuser"  
                                ButtonColor="warning"
                                Title="Refuser la demande" 
                                Description="désirer vous réeellement refuser la demande d'administration">
                    <Typography></Typography>
                    <Box>
                        <AddResponseAdmin data={responseAdmn} onSubmit={handleRefused}></AddResponseAdmin>
                    </Box>
               </ModalComponent>
                <ModalComponent ButtonTitle="Valider" 
                                ButtonColor="success"
                                Title="Valider" 
                                Description="etes vous sur de vouloir valider la demande d'administration" >
                    <Typography></Typography>
                        <AddResponseAdmin data={responseAdmn} onSubmit={handleValidation}></AddResponseAdmin>
                </ModalComponent>
            </Box>
             <Snackbar
                       open={snackbarOpen}
                       autoHideDuration={30}
                       onClose={()=> handleCloseSnackbar}>
                          <Alert onClose={handleCloseSnackbar} security="success">
                              {snackbarMessage}
                          </Alert>
            </Snackbar> 
        </>) ;   
};

export default AdminDetails;