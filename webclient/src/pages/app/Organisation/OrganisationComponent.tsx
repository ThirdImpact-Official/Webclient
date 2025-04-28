import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Pagination,
  Paper,
  Skeleton,
  Container,
  Divider,
  Button,
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
import ModalComponent from '@/components/factory/GenericComponent/Modal';
import { GetAdminDemandDto } from '@/interfaces/AdminDemand/GetAdminDemand';
import { AdminDemandAction } from '@/actions/AdminDemandAction';
import AdminDemandTable from './AdminDemand/AdminDemandTable';
import { data } from 'react-router-dom';
import AdminDetails from './AdminDemand/AdminDemandDetail';

const OrganisationComponent = () => {
  // Etat pour la liste des organisations et la page courante
  const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
  //organisation
  const [organisations, setOrganisations] = useState<GetOrganisationDto[] | null>(null);
  const [selectedOrganisation, setSelectedOrganisation] = useState<GetOrganisationDto | null>(null);
  //admin demand 
  const [allAdminDemand,setAllAdminDemand]=useState<GetAdminDemandDto[] | null>(null);
  const [adminDemand,setAdminDemand]=useState<GetAdminDemandDto | null>(null);
  //page
  const [page, setPage] = useState<number>(1);
  const [adminpage, setAdminPage] = useState<number>(1);

//---------------Actions----------------------------
  const organisationAction = new OrganisationAction();
  const adminDemandAction = new AdminDemandAction();

//------Management de la pagination-------
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
  const handledemandDetail = (demand: GetAdminDemandDto) => {
    setAdminDemand(demand);
    goToTab(5)
  }
  //---useEffect----------------------------------------------------
  const fetchOrganisations = async () => {
    try {
      const response: ServiceResponse<GetOrganisationDto> | PaginationResponse<GetOrganisationDto> = await organisationAction.GetAllOrganisation(page, 5);
      setOrganisations(Array.isArray(response.Data) ? response.Data : []);
      setSelectedOrganisation(response.Data[0]);
    } catch (error) {
      console.error('Failed to load organisations:', error);
    }
  };
  const fetchAdminDemand= async () => {
    try{
      const response: ServiceResponse<GetAdminDemandDto> | PaginationResponse<GetAdminDemandDto> = await adminDemandAction.GetAdminDemandPage(adminpage, 5)
      setAllAdminDemand(Array.isArray(response.Data) ? response.Data : []);
      setAdminDemand(response.Data[0])
    }
    catch (error) {

    }
  }
  useEffect(() => {
    fetchAdminDemand();
    fetchOrganisations();
  }, [page]);
  const tab: TabItem[] =[
    {
      label: "Add  Organisation",
      content: <>
          <Container className='p-2'>
              <Paper className='shadow-lg' elevation={3} sx={{ p: 3, borderRadius: 2 ,}}>
                  <AddNewOrganisation />  
              </Paper>
          </Container>
      </>
    },
    {
      label: "Table",
      content: organisations != null ?(
      <>          
        <Container className='p-2'>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 ,}}>
            <OrganisationTable
                Organisation={organisations}
                OnDetails={handleOrganisationDetail}
                OnUpdate={handleOrganisationUpdate}
                onAddress={handleAddressDetail}
                />
            <Box sx={{ display:"flex",justifyContent:'flex-end',mt:"2"}}>
              <Pagination
                  page={page}
                  className="float-end"
                  onChange={handlePageChange}
                  count={10}
                  />
            </Box>
          </Paper>
        </Container>
    </>):<Skeleton></Skeleton>
    },
    {
      label: "Details",
      content:(
        <>
    
          <Container className='p-2'>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 ,}}>
              <OrganisationDetails 
                  data={selectedOrganisation} />
            </Paper>
          </Container>
       
        </>
      )
                
    },
    {
      label: "Update",
      content: 
        <Container className='p-2'>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 ,}}>
            <UpdateOrganisationForm
                data={selectedOrganisation}
                handleCallBackResponse={()=> console.log("")} />
          </Paper>
        </Container>
    },
    {
      label:"Admin Demand Table",
      content:<>
        <Container className='p-2'>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 ,}}> 

            <AdminDemandTable data={allAdminDemand}
                              onDetails={handledemandDetail}/>
            <Box sx={{ display:"flex",justifyContent:'flex-end',mt:"2"}}>
              <Pagination
                  page={adminpage}
                  className="float-end"
                  onChange={fetchAdminDemand}
                  count={10}
                  />
            </Box>
          </Paper>
        </Container>
      </>
    },
    {
      label:"Admin Demand Details",
      content:<>
       <Container className='p-2'>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 ,}}> 
            <AdminDetails data={adminDemand}/> 
          </Paper>
        </Container></>
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
