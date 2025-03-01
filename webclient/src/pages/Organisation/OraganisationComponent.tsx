import { useRef, useState } from 'react';
import {
  Box,
  Pagination,
} from '@mui/material';
import AddNewOrganisation from './AddOrganisation';

import AddressDetail from './AddressComposant/AdressDetail';
import OrganisationDetails from './OrganisationDetails';
import OrganisationTable from './OrganisationTable';

import { OrganisationAction } from '@/actions/OrganisationActions';
import { PaginationResponse, ServiceResponse } from '@/interfaces/ServiceResponse';
import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';
import GenericTabs, { TabItem } from '@/components/factory/GenericComponent/TabGénéric';
import UpdateOrganisationForm from './UpdateOrganisation';





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
  const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
  const [organisations, setOrganisations] = useState<GetOrganisationDto[] | null>(testObjects);
  const [selectedOrganisation, setSelectedOrganisation] = useState<GetOrganisationDto | null>(testObjects[0]);
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
    goToTab(2)
  };

  const handleOrganisationUpdate = (organisation: GetOrganisationDto) => {
    setSelectedOrganisation(organisation);
    goToTab(3)
  };

  const handleAddressDetail = (organisation: GetOrganisationDto) => {
    setSelectedOrganisation(organisation);
    goToTab(4)
  };
  

  const tab: TabItem[] =[
    {
      label: "Add  Organisation",
      content: <>
            <AddNewOrganisation />  
      </>
    },
    {
      label: "Table",
      content: <>              <>
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
    </></>
    },
    {
      label: "Details",
      content:
                <OrganisationDetails 
                    data={selectedOrganisation} />
                
    },
    {
      label: "Update",
      content: <>
                  <UpdateOrganisationForm
                     data={selectedOrganisation}
                     handleCallBackResponse={()=> console.log("")} />
              </>
    },
   
    {
      label: "Adress",
      content:
      <>
         <AddressDetail 
                  props={selectedOrganisation.address} />
      </>
    }
  ]

  const goToTab = (index: number) => {
    if (tabsRef.current) {
      tabsRef.current.changeTab(index);
    }
  };
  return (
    <Box display={'flex'} flex={4}>
       

        <GenericTabs ref={tabsRef} tabs={tab} defaultTab={0} ChangeTab={goToTab} ariaLabel="generic tabs"/>

      
    </Box>
  );
};

export default OrganisationComponent;
