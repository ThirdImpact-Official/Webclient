import ModalComponent from "@/components/factory/GenericComponent/Modal";
import { Box, Button, Skeleton,Typography,MenuItem,Select,FormControl } from "@mui/material";
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



const mockUsers: GetUserDto[] = [
  {
    userId: 1,
    username: 'johnDoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    picture: 'https://example.com/john-doe.jpg',
    emailVerified: true,
    reportCount: 0,
    roleId: 1
  },
  {
    userId: 2,
    username: 'janeDoe',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    picture: 'https://example.com/jane-doe.jpg',
    emailVerified: false,
    reportCount: 2,
    roleId: 2
  },
  {
    userId: 3,
    username: 'bobSmith',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@example.com',
    picture: 'https://example.com/bob-smith.jpg',
    emailVerified: true,
    reportCount: 1,
    roleId: 1
  },
  {
    userId: 4,
    username: 'aliceJohnson',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    picture: 'https://example.com/alice-johnson.jpg',
    emailVerified: false,
    reportCount: 0,
    roleId: null
  }
];
const selOrganisation = {
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
}
const UserOrganisationComponent = () => {
  const { id } = useParams<{ id: string }>();
  const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
  const goToTab = (index: number) => {
      if (tabsRef.current) {
        tabsRef.current.changeTab(index);
      }
  };
  const [selectedOrganisation, setSelectedOrganisation] = useState<GetOrganisationDto >();
  const [users, setUsers] = useState<GetUserDto[]>(new Array<GetUserDto>());
  const [selectedUser, setSelectedUser] = useState<GetUserDto | null>(mockUsers[0]);
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
        
        const responseUser = await organisationAction.GetUserOrganisation(Number.parseInt(id, 10));
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
        content:( 
          <>
              <Box className="flex gap-4 justify-start">
                <ModalComponent
                    children={
                      <AddUserOrganisation 
                          organisationId={selectedOrganisation?.orgId as number} />
                    }
                    ButtonTitle="Add User"
                    Description="Add a user to an organisation"
                    Title="Add User"/>
              </Box>
              <Box className="flex gap-4 justify-end">
                <Typography variant="h5">Filtre</Typography>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <Select>
                    <MenuItem>A</MenuItem>
                    <MenuItem>B</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <Select>
                    <MenuItem>A</MenuItem>
                    <MenuItem>B</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <Select>
                    <MenuItem>A</MenuItem>
                    <MenuItem>B</MenuItem>
                  </Select>
                </FormControl>
                </Box>
            <UserOrganisationTable
                GetUserDto={users}
                onDetails={handleUserDetails}
                onUpdate={handleUserUpdate}
            />
            </>
        )
      },
      {
        label:"User details",
        content:(
          <>
          <UserOrganisationDetails 
              data={selectedUser} />
          <Button 
              onClick={handleGoBackToList}>Back to List</Button>
        </>
        )
      },
      {
        label:"Delete",
        content:(
          <>
            <RemoveFromOrganisation organisationId={selectedOrganisation?.orgId} userId={selectedUser.userId} />
              <Button onClick={handleGoBackToList}>Back to List</Button>
          </>
        )
      }

    ]

      
        return (
          <Box display="flex" flex={4}>
            <Box flex={1} className="bg-white rounded-md p-10 mx-4">
              {isLoading ? (
                
                <Skeleton 
                  width={210}
                  height={118}/>
              ): (
                <OrganisationDetails 
                    data={selectedOrganisation} />
              )}
            </Box>
            <Box flexGrow={1}>
            {
              isLoading ? (
                <Skeleton
                width={210}
                height={118} />
              ): (
            
                <GenericTabs /// <reference path="" />
                      ref={tabsRef}
                      tabs={colt}
                      defaultTab={0}
                      ChangeTab={goToTab}
                    />
              )
            }
            </Box>
          
          </Box>
        );
    
  
};

export default UserOrganisationComponent;
