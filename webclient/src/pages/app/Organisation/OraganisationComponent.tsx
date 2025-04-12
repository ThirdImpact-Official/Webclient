import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Pagination,
  Skeleton,
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


const OrganisationComponent = () => {
  // Etat pour la liste des organisations et la page courante
  const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
  const [organisations, setOrganisations] = useState<GetOrganisationDto[] | null>(null);
  const [selectedOrganisation, setSelectedOrganisation] = useState<GetOrganisationDto | null>(null);
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
  
  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        const response: ServiceResponse<GetOrganisationDto> | PaginationResponse<GetOrganisationDto> = await organisationAction.GetAllOrganisation(page, 5);
        setOrganisations(Array.isArray(response.Data) ? response.Data : []);
        setSelectedOrganisation(response.Data[0]);
      } catch (error) {
        console.error('Failed to load organisations:', error);
      }
    };
    fetchOrganisations();
  }, [page]);
  const tab: TabItem[] =[
    {
      label: "Add  Organisation",
      content: <>
            <AddNewOrganisation />  
      </>
    },
    {
      label: "Table",
      content: organisations != null ?(
      <>          
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
    </>):<Skeleton></Skeleton>
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
      content: selectedOrganisation != null ? (
        <>
          <AddressDetail 
                    props={selectedOrganisation.address} />
        </>
      ): <Skeleton></Skeleton>
    }
  ]

  const goToTab = (index: number) => {
    if (tabsRef.current) {
      tabsRef.current.changeTab(index);
    }
  };
  return (
    <Box className="flex items-center justify-center">
       

        <GenericTabs ref={tabsRef} tabs={tab} defaultTab={0} ChangeTab={goToTab} ariaLabel="generic tabs"/>

      
    </Box>
  );
};

export default OrganisationComponent;
