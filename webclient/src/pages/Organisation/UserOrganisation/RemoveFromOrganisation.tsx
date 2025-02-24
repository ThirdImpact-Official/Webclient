import { OrganisationAction } from "@/actions/OrganisationActions";
import ModalComponent from "@/components/factory/GenericComponent/Modal";
import { UpdateUserOrganisationDto } from "@/interfaces/UserOrganisation/updateUserOrganisationDto";
import { Box, Typography,Button, Divider } from "@mui/material";
import { FC } from "react";



interface RemoveFromOrganisationProps{
    organisationId: number;
    userId: number;
}

const RemoveFromOrganisation: FC<RemoveFromOrganisationProps> = ({ organisationId, userId }) => {
    const handleRemoveUser = async () => {
        const organisationAction = new OrganisationAction();
        const updateUserOrganisationDto: UpdateUserOrganisationDto = {
            userId,
            OrganisationId: organisationId
        };

        await organisationAction.RemoveUserOrganisationDto(updateUserOrganisationDto);
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
            <Box>
                
               <ModalComponent
                    children={<Button color="error" onClick={handleRemoveUser}>Confirmer</Button>}
                    Title={"Suppression de L'utilisateur"} 
                    Description={"vous ne pourrez pas revenir en arrière "}
                    ButtonTitle={"supprimer"} />
            
            </Box>
        </Box>
    );
};

export default RemoveFromOrganisation;