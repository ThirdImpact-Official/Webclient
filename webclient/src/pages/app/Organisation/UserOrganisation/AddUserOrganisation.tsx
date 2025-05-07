import { useState, FC } from 'react';
import { AddUserOrganisationDto } from '@/interfaces/OrganisationInterface/UserOrganisation/addUserOrganisationDto';
import { Box, TextField, Button, Typography} from '@mui/material';
import { OrganisationAction } from '@/actions/OrganisationActions';
import { useModal } from '@/context/ContextHook/ModalContext';
import { useLoading } from '@/context/ContextHook/LoadingContext';

interface AddUserOrganisationProps{
    organisationId:number; 
}


/**
 * AddUserOrganisation component
 *
 * @param organisationId - organisation id to add the user to
 *
 * @returns a form to add a user to the organisation
 */

const AddUserOrganisation: FC<AddUserOrganisationProps> = ({organisationId}) => {
    const responseApi= new OrganisationAction();
    const [email,setEmail] = useState<string>();
    //Const 
    const Modal = useModal();
    const Loading=useLoading();

    const handleApiCall = async (event: React.FormEvent) => {
        event.preventDefault();
        const userToAdd: AddUserOrganisationDto = {
            email: email,
            organisationId: organisationId,
        };
        try {
            const response = await responseApi.addUserOrganisation(userToAdd);
            if (response.Success) {
                // Handle successful response
                Modal.handleOpen();
                Modal.setDescription(response.Message);
                Modal.setTitle("Success");
            }
            else {
                Modal.handleOpen();
                Modal.setDescription(response.Message);
                Modal.setTitle("Error");
            }
            console.log(response.Message);
        } catch (error) {
            Modal.handleOpen();
            Modal.setDescription(error.Message);
            Modal.setTitle("Error");
            console.error('Error adding user to organisation:', error);
        }
    }
    const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    return(
    <>
        <Box className="justify-center text-center">
            <form className="space-y-4">
                <Box>
                    <Typography>Email</Typography>
                    <Box>
                        <TextField
                            id=""
                            label="Email"
                            value={email}
                            onChange={handleChange}
                        
                        />
                    </Box>
                </Box>
                <div className='items-center'>
                    <Button
                        variant='contained'  
                        onClick={(e) => handleApiCall(e)}> Ajouter  l'organisation</Button>
                </div>
            </form>

        </Box>
    </>);
}
export default AddUserOrganisation