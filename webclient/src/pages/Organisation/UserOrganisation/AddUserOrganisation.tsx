import { useState, FC } from 'react';
import { AddUserOrganisationDto } from '../../../interfaces/OrganisationInterface/UserOrganisation/addUserOrganisationDto';
import { Box, TextField,Button } from '@mui/material';
import { OrganisationAction } from '@/actions/OrganisationActions';

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

    const handleApiCall=()=>{
        const userToAdd: AddUserOrganisationDto = {
            Email: email,
            OrganisationId: organisationId
        }
        responseApi.addUserOrganisation(userToAdd);
    }
    const handleChange=(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    return(
    <>
        <Box>
            <form>
                <div>
                    <div>Label</div>
                    <div>
                        <TextField
                            id=""
                            label="Email"
                            value={email}
                            onChange={handleChange}
                        
                        />
                    </div>
                </div>
                <div>
                    <Button  onClick={handleApiCall}> Ajouter  l'organisation</Button>
                </div>
            </form>

        </Box>
    </>);
}
export default AddUserOrganisation