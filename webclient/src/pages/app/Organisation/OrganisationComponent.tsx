import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Pagination,
  Paper,
  Skeleton,
  Container,
  Divider,
  Button,
  FormControl,
  CardHeader,
  CardContent,
  Card, 
  Typography,
  CardActionArea,
  CardActions,
  CircularProgress
} from '@mui/material';
import { Refresh } from '@mui/icons-material';

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
import Organisation from '../Organisation';


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
  const handleAdminPageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
    try 
    {
        setAdminPage(value);
        const response: ServiceResponse<GetAdminDemandDto> | PaginationResponse<GetAdminDemandDto> = await adminDemandAction.GetAdminDemandPage(value, 5);
        setAllAdminDemand(Array.isArray(response.Data) ? response.Data : []);
    } catch (error) 
    {
        console.error('Failed to load organisations:', error);
    }
  }
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
  //---------------refresh handler
  const handleRefreshOrganisation = () => {
      setPage(1);
  }
  const handlerefreshAdminDemand = () => {
    setAdminPage(1);
  }

  useEffect(() => {
    fetchOrganisations();
  }, [page]);
  useEffect(() => {
    fetchAdminDemand();
  }, [adminpage]);
  
  const tab: TabItem[] =[
    {
      label: "Add  Organisation",
      content: <>
          <Card className='p-2'>
              <CardContent>
                  <AddNewOrganisation />  
              </CardContent>
          </Card>
      </>
    },
    {
      label: "Table",
      content: organisations != null ?(
      <>          
        <Card>
            <CardHeader
              title={
                  <>
                      <Typography variant="h4">Organisation</Typography>
                  </>
              }
              action={
                  <>
                  <FormControl>
                      <Button
                          onClick={handleRefreshOrganisation}
                          variant="contained"
                          color="warning">Referesh  
                              <Refresh className="ps-1" /> 
                          </Button>
                  </FormControl>
                  </>
              }
            />
          <CardContent>
          <OrganisationTable
              Organisation={organisations}
              OnDetails={handleOrganisationDetail}
              OnUpdate={handleOrganisationUpdate}
              onAddress={handleAddressDetail}
              />
          </CardContent>
          <CardActions>
            <Pagination
                page={page}
                className="float-end"
                onChange={handlePageChange}
                count={10}
                />
          </CardActions>
        </Card>
    </>):<Skeleton></Skeleton>
    },
    {
      label: "Details",
      content:(
        <>
    
          <Card className='p-2'>
            <CardContent>
              <OrganisationDetails 
                  data={selectedOrganisation} />
            </CardContent>
          </Card>
       
        </>
      )
    },
    {
      label: "Update",
      content: 
        <Card elevation={3} className='p-2'>
          <CardContent>
            <UpdateOrganisationForm
                data={selectedOrganisation}
                handleCallBackResponse={()=> console.log("")} />
          </CardContent>
        </Card>
    },
    {
      label:"Admin Demand Table",
      content:<>
        <Card elevation={3} className='p-2'>
        <CardHeader
          title={
              <>
                  <Typography variant="h4">Demande Administrateur</Typography>
              </>
          }
          action={
              <>
            
              <FormControl>
                  <Button
                      variant="contained"
                      onClick={handlerefreshAdminDemand}
                      color="warning">Referesh  
                          <Refresh className="ps-1" /> 
                      </Button>
              </FormControl>
              </>
          }
        />
          <CardContent> 
            <AdminDemandTable data={allAdminDemand}
                              onDetails={handledemandDetail}/>
          </CardContent>
          <CardActions>
            <Box sx={{ display:"flex",justifyContent:'flex-end',mt:"2"}}>
              <Pagination
                  page={adminpage}
                  className="float-end"
                  onChange={handleAdminPageChange}
                  count={10}
                  />
            </Box>
          </CardActions>
        </Card>
      </>
    },
    {
      label:"Admin Demand Details",
      content: adminDemand != null ?(<>
       <Card elevation={3} className='p-2'>
          <CardContent> 
            <AdminDetails data={adminDemand}/> 
          </CardContent>
        </Card></>):(
          <Card>
            <CardContent className="text-center justify-center items-center flex flex-col">
              <CircularProgress />
            </CardContent>
          </Card>)
    }]

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
