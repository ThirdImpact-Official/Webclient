import { useState } from 'react';
import {
  Box,
  Button,
  Pagination,
} from '@mui/material';
import ModalComponent from '@/components/factory/GenericComponent/Modal';
import AddNewOrganisation from './AddOrganisation';
import UpdateOrganisation from './UpdateOrganisation';
import AddressDetail from './AddressComposant/AdressDetail';
import OrganisationDetails from './OrganisationDetails';
import OrganisationTable from './OrganisationTable';

import { OrganisationAction } from '@/actions/OrganisationActions';
import { PaginationResponse, ServiceResponse } from '@/interfaces/ServiceResponse';
import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';

enum ViewState {
  LIST = 'LIST',
  DETAIL = 'DETAIL',
  EDIT = 'EDIT',
  ADDRESS = 'ADDRESS'
}

const testObjects: GetOrganisationDto[] = [
  {
    orgId: 1,
    name: 'Test Organisation',
    email: 'test@example.com',
    phoneNumber: '1234567890',
    description: '',
    address: {
      adressId: 0,
      street: '123 Main St',
      city: 'Anytown',
      country: 'CA',
      postalCode: '12345',
      latitude: 0,
      longitude: 0
    }
  },
  {
    orgId: 2,
    name: 'Another Test Organisation',
    email: 'another@example.com',
    phoneNumber: '9876543210',
    description: '',
    address: null
  },
  {
    orgId: 3,
    name: 'Empty Organisation',
    email: '',
    description: '',
    phoneNumber: '',
    address: null
  },
  {
    orgId: 4,
    name: 'Invalid Organisation',
    email: ' invalid email',
    phoneNumber: ' invalid phone number',
    description: '',
    address: {
      adressId: 0,
      street: ' invalid street',
      city: ' invalid city',
      country: ' invalid state',
      postalCode: ' invalid zip',
      latitude: 0,
      longitude: 0
    }
  },
  {
    orgId: 5,
    name: 'Organisation with missing address',
    email: 'missing@example.com',
    phoneNumber: '1234567890',
    address: undefined,
    description: ''
  }
];

const OrganisationComponent = () => {
  // Etat pour la liste des organisations et la page courante
  const [organisations, setOrganisations] = useState<GetOrganisationDto[] | null>(testObjects);
  const [selectedOrganisation, setSelectedOrganisation] = useState<GetOrganisationDto | null>(null);
  const [viewState, setViewState] = useState<ViewState>(ViewState.LIST);
  const [page, setPage] = useState<number>(1);

  const organisationAction = new OrganisationAction();

  const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    try 
    {
        setPage(value);
        const response: ServiceResponse<GetOrganisationDto> | PaginationResponse<GetOrganisationDto> = await organisationAction.GetAllOrganisation(value, 5);
        setOrganisations(Array.isArray(response.Data) ? response.Data : []);
    } catch (error) 
    {
        console.error('Failed to load organisations:', error);
    }
  };

  // Callbacks pour mettre à jour l'état et changer la vue
  const handleOrganisationDetail = (organisation: GetOrganisationDto) => {
    setSelectedOrganisation(organisation);
    setViewState(ViewState.DETAIL);
  };

  const handleOrganisationUpdate = (organisation: GetOrganisationDto) => {
    setSelectedOrganisation(organisation);
    setViewState(ViewState.EDIT);
  };

  const handleAddressDetail = (organisation: GetOrganisationDto) => {
    setSelectedOrganisation(organisation);
    setViewState(ViewState.ADDRESS);
  };

  const goBackToList = () => {
    setViewState(ViewState.LIST);

  };

  return (
    <Box display={'flex'} flex={4}>
        <Box flexGrow={1}>
            <Box className="float-end" mb={2}>
              <ModalComponent
                  ButtonTitle="Add Organisation"
                  Title="Add Organisation"
                  Description="Allows you to add an organisation"
                  children={<AddNewOrganisation />}
              />
            </Box>

            {/* Affiche le tableau dans la vue LIST */}
            {viewState === ViewState.LIST && (
              <>
                <OrganisationTable
                    Organisation={organisations}
                    OnDetails={handleOrganisationDetail}
                    OnUpdate={handleOrganisationUpdate}
                    onAddress={handleAddressDetail}
                />
                <Pagination
                    page={page}
                    className="float-end"
                    onChange={handlePageChange}
                    count={10}
                />
              </>
            )}
        </Box>

        <Box className="mx-10 px-10 bg-white rounded-md" 
             flex={1}>
          {/* Rendu conditionnel selon l'état de la vue */}
          {viewState === ViewState.DETAIL && selectedOrganisation && (
            <>
              <OrganisationDetails 
                      data={selectedOrganisation} />
              <Button 
                      onClick={goBackToList}>Back to List</Button>
            </>
          )}

          {viewState === ViewState.EDIT && selectedOrganisation && (
            <>

              <UpdateOrganisation 
                  data={selectedOrganisation} 
                  handleCallBackResponse={goBackToList} />
              <Button 
                  onClick={goBackToList}>Back to List</Button>
            </>
          )}

          {viewState === ViewState.ADDRESS && selectedOrganisation && (
            <>
              
              <AddressDetail 
                  props={selectedOrganisation.address} />
              <Button 
                  onClick={goBackToList}>Back to List</Button>
            </>
          )}
        </Box>
    </Box>
  );
};

export default OrganisationComponent;
