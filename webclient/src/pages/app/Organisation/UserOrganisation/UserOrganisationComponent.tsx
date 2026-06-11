import ModalComponent from "@/components/factory/GenericComponent/Modal";
import { Box, Button, Skeleton, Typography, MenuItem, Select, FormControl, Paper, Container, Grid2, Card, CardContent, InputLabel, CardHeader, CircularProgress, CardActionArea} from '@mui/material';
import { useEffect, useRef, useState} from 'react';
import UserOrganisationTable from "./UserOrganisationTable";
import UserOrganisationDetails from "./UserOrganisationDetails";
import { GetOrganisationDto } from "@/interfaces/OrganisationInterface/Organisation/getOrganisationDto";
import { GetUserDto } from "@/interfaces/User/GetUserDto";
import OrganisationDetails from "../OrganisationDetails";
import { useParams } from "react-router-dom";
import { OrganisationAction } from "@/actions/OrganisationActions";
import RemoveFromOrganisation from "./RemoveFromOrganisation";
import AddUserOrganisation from "./AddUserOrganisation";
import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { Console } from "console";
import { ServiceResponse } from "@/interfaces/ServiceResponse";
import Item from '@/components/factory/GenericComponent/Item';
import { Refresh } from "@mui/icons-material";
import { UpdateOrganisationDto } from "@/interfaces/OrganisationInterface/Organisation/updateOrganisationDto";
import UpdateOrganisationForm from '../UpdateOrganisation';
import { on } from 'events';


const UserOrganisationComponent = () => {

  const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
  const goToTab = (index: number) => {
      if (tabsRef.current) {
        tabsRef.current.changeTab(index);
      }
  };
  const [selectedOrganisation, setSelectedOrganisation] = useState<GetOrganisationDto|null>(null);
  const [users, setUsers] = useState<GetUserDto[] |null>(new Array<GetUserDto>());
  const [selectedUser, setSelectedUser] = useState<GetUserDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [page,setpage] =useState<number>(1);
  const handleUserDetails = (user: GetUserDto) => {
    setSelectedUser(user);
    goToTab(1)
  };
const handleDeactivation=async ()=>{
    try
    {
      const response = await organisationAction.DeleteOrganisation(selectedOrganisation.orgId);
      if( response.Success)
      {
        setSelectedOrganisation(response.Data as GetOrganisationDto);
      }
      else
      {
      
      }
    }
    catch
    {
      console .log("Error")
    }
    handlerefresh();
  }
  const handleUserUpdate = (user: GetUserDto) => {
    setSelectedUser(user);
      goToTab(2)
  };

  const handleGoBackToList = () => {
    goToTab(0);
  };

  const organisationAction = new OrganisationAction();
  
  const fetchOrganisation = async () => {
    setIsLoading(true);
    try {
      const responseOrganisation = await organisationAction.GetOrganisationByIdForCurrentUser();
      
      if (responseOrganisation.Success) {
        //assigniation du serviceresponse de l'organisation
        const organisationfromResponse =Array.isArray(responseOrganisation.Data) ? 
        responseOrganisation.Data[0] 
        : responseOrganisation.Data;
        console.log("----------------------");
        console.log(organisationfromResponse);
        //assignation a l'etat de l'organisation
        setSelectedOrganisation(organisationfromResponse as GetOrganisationDto);
        console.log("---------------------");
        console.log('Get selected organisation', selectedOrganisation.address);
        console.log(selectedOrganisation);
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
    
  };
  const fetchUserOrganisation = async () => {
    try {
      
      const responseUser = await organisationAction.GetUserOrganisationlst();
      if (responseUser.Success) {
        setUsers(responseUser.Data as GetUserDto[]);
      }
    }
    catch (e) {
      console.log(e);
    }
  }
  const handlerefresh= async()=>
  {
    const response= await organisationAction.GetOrganisationByIdForCurrentUser();
    if(response.Success)
    {

      setSelectedOrganisation(response.Data as GetOrganisationDto)
    }
  }
  const Handlereactivation= async()=>{
    const response = await organisationAction.reactivateOrganisation(selectedOrganisation.orgId);
    handlerefresh();
  }
  //-----useEffect---------------------
  useEffect(() => {
 
      fetchOrganisation();
   
  }, [setSelectedOrganisation]);

  useEffect(() => {
   
      fetchUserOrganisation()
    
  },[page]);

  //----select ORgan
  useEffect(() => {
    if (selectedOrganisation) {
      console.log("État mis à jour - selectedOrganisation:", selectedOrganisation);
    }
  }, [selectedOrganisation]);
  //--------TablColumns ----------------

  const colt: TabItem[] =[
      {
        label:"Table",
        content: users !=null ? ( 
          <Card  sx={{ p: 3}}>
            <CardHeader 
              title={
                <Typography>Escapegame From : {selectedOrganisation?.name}</Typography>
              }
              action={<>
                <Box >
                    <FormControl size="small" 
                        sx={{ minWidth: 123,ps:2,pe:2,ms:2 }} 
                        variant="standard">
                    <Typography variant="h5">Filtre</Typography>
                    
                      <Select>
                        <MenuItem>All</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">inActive</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl>
                    <ModalComponent
                        children={
                          <AddUserOrganisation 
                              organisationId={selectedOrganisation?.orgId as number} />
                        }
                        ButtonTitle="Add User"
                        Description="Add a user to an organisation"
                        Title="Add User"/>
                  </FormControl>
                    <FormControl size="small" sx={{ minWidth: 123 }} variant="standard">
                      <Button
                          variant="contained"
                          color="warning" 
                          onClick={fetchUserOrganisation}>Refresh
                        <Refresh/>
                      </Button>
                    </FormControl>
                </Box>
              </>
              }
             />
            <CardContent>
              <Grid2 container>
                <Grid2  className="flex gap-4 justify-start p-4">
                </Grid2>
                <Grid2  className="flex flex-row space-x-10 float-end justify-end items-end">
                </Grid2>
              <Box>
                <UserOrganisationTable
                    GetUserDto={users}
                    onDetails={handleUserDetails}
                    onUpdate={handleUserUpdate}
                />
              </Box>  
              </Grid2>
            </CardContent>
            </Card>
        ):<Skeleton width={210} height={118}></Skeleton>
      },
      {
        label:"User details",
        content:( selectedUser !=null ?
          <Card >
            <CardContent>
              <Grid2 className="">
                <Grid2>
                    <UserOrganisationDetails 
                        data={selectedUser} />
                    <Button 
                        onClick={handleGoBackToList}>Back to List</Button>
                </Grid2>
            </Grid2>
            </CardContent>
          </Card>
         :<Card>
            <CardContent >
              <Box className="p-4 m-4 text-center">
                <Typography>
                  Veuillez Selectionner un Utilisateur 
                </Typography>
              </Box>
            </CardContent>
         </Card>
        )
      },
      {
        label:"Delete",
        content:( selectedUser !=null ?
          <Card >
            <CardContent>
              <Grid2>
                <Grid2>
                  <RemoveFromOrganisation organisationId={selectedOrganisation?.orgId} userId={selectedUser.id} />
                    <Button onClick={handleGoBackToList}>Back to List</Button>
                </Grid2>
            </Grid2>
            </CardContent>
          </Card>
         :<Card>
            <CardContent >
              <Box className="p-4 m-4 text-center">
                <Typography>
                  Veuillez Selectionner un Utilisateur 
                </Typography>
              </Box>
            </CardContent>
         </Card>
        )
      },
       {
            label: "Update",
            content: selectedOrganisation ? (
              <Card elevation={3} className='p-2'>
                <CardContent>
                  <UpdateOrganisationForm
                      data={selectedOrganisation}
                      handleCallBackResponse={handlerefresh} />
                </CardContent>
              </Card>):(
                <Card>
                  <CardContent className="text-center items-end">
                    <CircularProgress/>
                  </CardContent>
                </Card>
              )
          },
          {
            label:"Reactivation",
            content: selectedOrganisation ? (
              <>
              <Box className="items-center p-10 m-10 justify-center text-center">
                <Card>
                  <CardContent>
                  <Typography>
                    vous lez vous réactiver cette organisation ?
                  </Typography>
                  </CardContent>
                  <CardActionArea>
                    <Button   disabled={selectedOrganisation.isActive} onClick={Handlereactivation}>
                      réactiver 
                    </Button>
                  </CardActionArea>
                </Card>
              </Box>
              </>
            ):(
              <Card>
                  <CardContent>
                    <CircularProgress />
                    </CardContent>
              </Card>
            )
          }

    ]

      
        return (
          <Box className="container mx-auto py-3">
          <div className="flex flex-col md:flex-row gap-4">
        
            {/* Left Column - Organisation Details */}
            <div className="w-full md:w-1/3">
              <Grid2>
                <CardContent>
                  {isLoading ? (
                    <Skeleton width={210} height={118} />
                  ) : (
                    <OrganisationDetails data={selectedOrganisation} onDeactivate={handleDeactivation} />
                  )}
                </CardContent>
              </Grid2>
            </div>
        
            {/* Right Column - Tabs */}
            <div className="w-full md:w-2/3">
              <Grid2>
                <CardContent>
                  {isLoading ? (
                    <Skeleton width={210} height={118} />
                  ) : (
                    <GenericTabs
                      ref={tabsRef}
                      tabs={colt}
                      defaultTab={0}
                      ChangeTab={goToTab}
                    />
                  )}
                </CardContent>
              </Grid2>
            </div>
        
          </div>
        </Box>
        
        );
    
  
};

export default UserOrganisationComponent;
