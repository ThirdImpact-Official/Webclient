import ModalComponent from "@/components/factory/GenericComponent/Modal";
import { Box, Button, Skeleton, Typography, MenuItem, Select, FormControl, Paper, Container, Grid2, Card, CardContent, InputLabel } from '@mui/material';
import { useEffect, useRef, useState } from "react";
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




const UserOrganisationComponent = () => {
  const { id } = useParams<{ id: string }>();
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

  const handleUserDetails = (user: GetUserDto) => {
    setSelectedUser(user);
    goToTab(1)
  };

  const handleUserUpdate = (user: GetUserDto) => {
    setSelectedUser(user);
      goToTab(2)
  };

  const handleGoBackToList = () => {
    goToTab(0);
  };

  const organisationAction = new OrganisationAction();
  useEffect(() => {
    
    const fetchOrganisation = async () => {
      setIsLoading(true);
      try {
        const responseOrganisation = await organisationAction.GetOrganisationById(Number.parseInt(id, 10));
        
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
    if (id) {
      fetchOrganisation();
      fetchUserOrganisation();
    }
  }, [id]);
  useEffect(() => {
    if (selectedOrganisation) {
      console.log("État mis à jour - selectedOrganisation:", selectedOrganisation);
    }
  }, [selectedOrganisation]);
  const colt: TabItem[] =[
      {
        label:"Table",
        content: users !=null ? ( 
          <Card  sx={{ p: 3}}>
            <CardContent>
              <Grid2 container>
                <Grid2  className="flex gap-4 justify-start p-4">
                  <ModalComponent
                      children={
                        <AddUserOrganisation 
                            organisationId={selectedOrganisation?.orgId as number} />
                      }
                      ButtonTitle="Add User"
                      Description="Add a user to an organisation"
                      Title="Add User"/>
                </Grid2>
                <Grid2  className="flex flex-end gap-4 float-end justify-end items-end">
                  <Typography variant="h5">Filtre</Typography>
                  <FormControl size="small" sx={{ minWidth: 123 }} variant="standard">
                    <InputLabel>Activity</InputLabel>
                    <Select>
                      <MenuItem>All</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">inActive</MenuItem>
                    </Select>
                  </FormControl>
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
         :<Skeleton width={0} height={0} />
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
        :
        <Skeleton width={0} height={0}/>
        )
      }

    ]

      
        return (
          <Box className="container mx-auto py-3">
          <div className="flex flex-col md:flex-row gap-4">
        
            {/* Left Column - Organisation Details */}
            <div className="w-full md:w-1/3">
              <Card elevation={3} sx={{ borderRadius: 2 }}>
                <CardContent>
                  {isLoading ? (
                    <Skeleton width={210} height={118} />
                  ) : (
                    <OrganisationDetails data={selectedOrganisation} />
                  )}
                </CardContent>
              </Card>
            </div>
        
            {/* Right Column - Tabs */}
            <div className="w-full md:w-2/3">
              <Card elevation={3} sx={{ borderRadius: 2 }}>
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
              </Card>
            </div>
        
          </div>
        </Box>
        
        );
    
  
};

export default UserOrganisationComponent;
