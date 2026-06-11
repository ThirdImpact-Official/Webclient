import { OrganisationAction } from "@/actions/OrganisationActions";
import ModalComponent from "@/components/factory/GenericComponent/Modal";
import { useAuth } from "@/context/AuthContext";
import { useLoading } from "@/context/ContextHook/LoadingContext";
import { useModal } from "@/context/ContextHook/ModalContext";
import { UpdateUserOrganisationDto } from "@/interfaces/OrganisationInterface/UserOrganisation/updateUserOrganisationDto";
import { Box, Typography,Button, Divider } from "@mui/material";
import { FC } from "react";



interface RemoveFromOrganisationProps{
    organisationId: number;
    userId: number;
}

const RemoveFromOrganisation: FC<RemoveFromOrganisationProps> = ({ organisationId, userId }) => {
    //---State----------------
    //---Context--------------
    const Modal=useModal();
    const Loading=useLoading();
    const {user} =useAuth();

    const handleRemoveUser = async () => {
        const organisationAction = new OrganisationAction();
        const updateUserOrganisationDto: UpdateUserOrganisationDto = {
            userId,
            OrganisationId: organisationId
        };

        const response =  await organisationAction.RemoveUserOrganisationDto(updateUserOrganisationDto);
        if (response.Success) {
            Modal.handleOpen();
            Modal.setDescription(response.Message);
            Modal.setTitle("Success");
        }
        else {
            Modal.handleOpen();
            Modal.setDescription(response.Message);
            Modal.setTitle("Error");
        }
    };
    const handleDisable=() :boolean=>{
        if(user.id==userId)
        {
            return true;
        }
        return  false;
    };
    return (
        <Box className="flex flex-col items-center justify-center">
            <Typography className="flex-1 text-center" variant="h4">Supression de l'utilsateur a l'Organisation</Typography>
            <Box className="space-y-6 px-4 mx-15 flex items-center ">
                <Typography variant="body2">
                    Êtes-vous sûr de vouloir enlever cette utilisateur de votre Organisation ?
                </Typography>
            </Box>
            <Divider />
            <Box className="flex items-center justify-center" sx={{ mt: 4, mb: 2 }}>
                
               <ModalComponent
                    children={
                        <Box className="flex items-center justify-center text-center">
                            <Button
                                variant="contained" 
                                color="error" 
                                disabled={user.id==userId}
                                onClick={handleRemoveUser}>Confirmer</Button>
                        </Box>}
                    Title={"Suppression de L'utilisateur"} 
                    Description={"vous ne pourrez pas revenir en arrière "}
                    ButtonTitle={"supprimer"} />
            
            </Box>
        </Box>
    );
};

export default RemoveFromOrganisation;