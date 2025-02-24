import ModalComponent from "@/components/factory/GenericComponent/Modal";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import UserOrganisationTable from "./UserOrganisationTable";
import UserOrganisationDetails from "./UserOrganisationDetails";
import { GetOrganisationDto } from "@/interfaces/Organisation/getOrganisationDto";
import { GetUserDto } from "@/interfaces/User/GetUserDto";
import OrganisationDetails from "../OrganisationDetails";
import { useParams } from "react-router-dom";
import { OrganisationAction } from "@/actions/OrganisationActions";
import AddUserOrganisation from "./AddUserOrganisation";
import removefromOrganisation from './RemoveFromOrganisation';
import RemoveFromOrganisation from "./RemoveFromOrganisation";


enum ViewState {
  LIST = "LIST",
  DETAIL = "DETAIL",
  UPDATE = "UPDATE",
  // Ajoutez d'autres états si nécessaire (ex : CREATE)
}
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
  const [selectedOrganisation, setSelectedOrganisation] = useState<GetOrganisationDto | null>(selOrganisation);
  const [users, setUsers] = useState<GetUserDto[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<GetUserDto | null>(null);
  const [viewState, setViewState] = useState<ViewState>(ViewState.LIST);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUserDetails = (user: GetUserDto) => {
    setSelectedUser(user);
    setViewState(ViewState.DETAIL);
  };

  const handleUserUpdate = (user: GetUserDto) => {
    setSelectedUser(user);
    setViewState(ViewState.UPDATE);
  };

  const handleGoBackToList = () => {
    setViewState(ViewState.LIST);
    setSelectedOrganisation(null);
    setSelectedUser(null);
  };

  useEffect(() => {
    
  const organisationAction = new OrganisationAction();
    const fetchOrganisation = async () => {
      setIsLoading(true);
      try {
        const responseOrganisation = await organisationAction.GetOrganisationById(Number.parseInt(id, 10));
        const responseUser = await organisationAction.GetUserOrganisation(Number.parseInt(id, 10));

        if (responseOrganisation.Success) {
          setSelectedOrganisation(responseOrganisation.Data as GetOrganisationDto);
        }
        if (responseUser.Success) {
          setUsers(responseUser.Data as GetUserDto[]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchOrganisation();
    }
  }, [id]);


    return (
      <Box display="flex" flex={4}>
        <Box flex={1} className="bg-white rounded-md p-10 mx-4">
          <OrganisationDetails 
              data={selectedOrganisation} />
        </Box>
        <Box flexGrow={1}>
        
          {viewState === ViewState.LIST && (
            <>
              <ModalComponent
              children={
                <AddUserOrganisation 
                    organisationId={selectedOrganisation?.orgId as number} />
              }
              ButtonTitle="Add User"
              Description="Add a user to an organisation"
              Title="Add User"
              />
            <UserOrganisationTable
                GetUserDto={users}
                onDetails={handleUserDetails}
                onUpdate={handleUserUpdate}
            />
            </>
          )}
        </Box>
        <Box ml={2} className="bg-white rounded-md w-75vh" flex={2}>
          {viewState === ViewState.DETAIL && selectedUser && (
            <>
              <UserOrganisationDetails 
                  data={selectedUser} />
              <Button 
                  onClick={handleGoBackToList}>Back to List</Button>
            </>
          )}
          {viewState === ViewState.UPDATE && selectedUser && (
            <>
             
               <RemoveFromOrganisation organisationId={selectedOrganisation?.orgId as number} userId={selectedUser.userId} />
              <Button onClick={handleGoBackToList}>Back to List</Button>
            </>
          )}
        </Box>
      </Box>
    );
  
};

export default UserOrganisationComponent;
