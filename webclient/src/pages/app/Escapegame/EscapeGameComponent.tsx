import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import {  Box,Grid2,Typography,Select,FormControl,MenuItem} from '@mui/material';
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import EscapeGameOrganisationTable from './EscapeGameOrganisationTable';
import UpdateEscapeGameForm from './UpdateEscapeGame';
import EscapeGameDetails from './EscapegameDetails';
import GenericTabs, { TabItem } from '@/components/factory/GenericComponent/TabGénéric';
import AddEscapeGameDto from './AddEscapegame';
import Item from '@/components/factory/GenericComponent/Item';
import Organisation from '../Organisation';
import OrganisationDetails from '../Organisation/OrganisationDetails';
import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';
import { mock } from 'node:test';
const testObjects: GetEscapeGameDto[] = [
    {
        "eSGId": 1,
        "eSGNom": "Escape Game 1",
        "eSGCreator": "John Doe",
        "eSGTitle": "The Lost City",
        "eSGContent": "Find the hidden treasure",
        "eSGImgResources": "https://example.com/image1.jpg",
        "eSGWebsite": "https://example.com/game1",
        "eSGPhoneNumber": "123-456-7890",
        "eSG_IsDeleting": false,
        "eSG_IsForChildren": true,
        "eSG_Price_Id": 1,
        "eSG_DILE_Id": 1,
        "price": {
          "id": 1,
          "indicePrice": 19.99
        },
        "difficultyLevel": {
          "dowId": 1,
          "dowName": "Easy",
        },
        "eSG_CreationDate": "2022-01-01T12:00:00.000Z",
        "eSG_UpdateTime": "2022-01-01T12:00:00.000Z"
      },
      {
        "eSGId": 2,
        "eSGNom": "Escape Game 2",
        "eSGCreator": "Jane Doe",
        "eSGTitle": "The Haunted Mansion",
        "eSGContent": "Solve the mystery",
        "eSGImgResources": "https://example.com/image2.jpg",
        "eSGWebsite": "https://example.com/game2",
        "eSGPhoneNumber": "987-654-3210",
        "eSG_IsDeleting": false,
        "eSG_IsForChildren": false,
        "eSG_Price_Id": 2,
        "eSG_DILE_Id": 2,
        "price": {
          "id": 2,
          "indicePrice": 29.99
        },
        "difficultyLevel": {
         "dowId": 1,
          "dowName": "Easy",
       
        },
        "eSG_CreationDate": "2022-01-15T12:00:00.000Z",
        "eSG_UpdateTime": "2022-01-15T12:00:00.000Z"
      },
      {
        "eSGId": 3,
        "eSGNom": "Escape Game 3",
        "eSGCreator": "Bob Smith",
        "eSGTitle": "The Sci-Fi Adventure",
        "eSGContent": "Explore the galaxy",
        "eSGImgResources": "https://example.com/image3.jpg",
        "eSGWebsite": "https://example.com/game3",
        "eSGPhoneNumber": "555-123-4567",
        "eSG_IsDeleting": false,
        "eSG_IsForChildren": true,
        "eSG_Price_Id": 3,
        "eSG_DILE_Id": 3,
        "price": {
          "id": 3,
          "indicePrice": 39.99,
        },
        "difficultyLevel": {
          "dowId": 1,
          "dowName": "Easy",
          
        },
        "eSG_CreationDate": "2022-02-01T12:00:00.000Z",
        "eSG_UpdateTime": "2022-02-01T12:00:00.000Z"
      },
      {
        "eSGId": 4,
        "eSGNom": "Escape Game 4",
        "eSGCreator": "Alice Johnson",
        "eSGTitle": "The Pirate's Treasure",
        "eSGContent": "Find the hidden loot",
        "eSGImgResources": "https://example.com/image4.jpg",
        "eSGWebsite": "https://example.com/game4",
        "eSGPhoneNumber": "111-222-3333",
        "eSG_IsDeleting": false,
        "eSG_IsForChildren": true,
        "eSG_Price_Id": 4,
        "eSG_DILE_Id": 4,
        "price": {
            "id": 3,
            "indicePrice": 39.99,
        },
        "difficultyLevel": {
          "dowId": 4,
          "dowName": "Very Hard",
        },
         "eSG_CreationDate": "2022-02-01T12:00:00.000Z",
        "eSG_UpdateTime": "2022-02-01T12:00:00.000Z"
    },
    {
        "eSGId": 5,
        "eSGNom": "Escape Game 1",
        "eSGCreator": "John Doe",
        "eSGTitle": "The Lost City",
        "eSGContent": "Find the hidden treasure",
        "eSGImgResources": "https://example.com/image1.jpg",
        "eSGWebsite": "https://example.com/game1",
        "eSGPhoneNumber": "123-456-7890",
        "eSG_IsDeleting": false,
        "eSG_IsForChildren": true,
        "eSG_Price_Id": 1,
        "eSG_DILE_Id": 1,
        "price": {
            "id": 3,
            "indicePrice": 39.99,
        },
        "difficultyLevel": {
          "dowId": 1,
          "dowName": "Easy",
        },
        "eSG_CreationDate": "2022-01-01T12:00:00.000Z",
        "eSG_UpdateTime": "2022-01-01T12:00:00.000Z"
      },
      {
        "eSGId": 6,
        "eSGNom": "Escape Game 2",
        "eSGCreator": "Jane Doe",
        "eSGTitle": "The Haunted Mansion",
        "eSGContent": "Solve the mystery",
        "eSGImgResources": "https://example.com/image2.jpg",
        "eSGWebsite": "https://example.com/game2",
        "eSGPhoneNumber": "987-654-3210",
        "eSG_IsDeleting": false,
        "eSG_IsForChildren": false,
        "eSG_Price_Id": 2,
        "eSG_DILE_Id": 2,
        "price": {
          "id": 2,
          "indicePrice": 29.99,
        },
        "difficultyLevel": {
          "dowId": 2,
          "dowName": "Medium",
        },
        "eSG_CreationDate": "2022-01-15T12:00:00.000Z",
        "eSG_UpdateTime": "2022-01-15T12:00:00.000Z"
      },
      {
        "eSGId": 7,
        "eSGNom": "Escape Game 3",
        "eSGCreator": "Bob Smith",
        "eSGTitle": "The Sci-Fi Adventure",
        "eSGContent": "Explore the galaxy",
        "eSGImgResources": "https://example.com/image3.jpg",
        "eSGWebsite": "https://example.com/game3",
        "eSGPhoneNumber": "555-123-4567",
        "eSG_IsDeleting": false,
        "eSG_IsForChildren": true,
        "eSG_Price_Id": 3,
        "eSG_DILE_Id": 3,
        "price": {
          "id": 3,
          "indicePrice": 39.99,

        },
        "difficultyLevel": {
          "dowId": 3,
          "dowName": "Hard",
        },
        "eSG_CreationDate": "2022-02-01T12:00:00.000Z",
        "eSG_UpdateTime": "2022-02-01T12:00:00.000Z"
      }
];

const mockOrganisation=  {
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
};

const EscapeGameComponent = () => {
  const { id } = useParams();
  const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
  const [escapeGames, setEscapeGames] = useState<GetEscapeGameDto[]>(testObjects);
  const [selectedEscapeGame, setSelectedEscapeGame] = useState<GetEscapeGameDto>(testObjects[0]);
   const [organisationData] =useState<GetOrganisationDto>(mockOrganisation);
  const handleDetails = (escapeGame: GetEscapeGameDto) => {
    setSelectedEscapeGame(escapeGame);
    goToTab(1);
  };

  const handleUpdate = (escapeGame: GetEscapeGameDto) => {
    setSelectedEscapeGame(escapeGame);
    goToTab(3);
  };

  const goToTab = (index: number) => {
    if (tabsRef.current !== null) {
      tabsRef.current.changeTab(index);
    }
  };

  const tabs: TabItem[] = [
    {
      label: 'List',
      content: (
      <>
        <Box className="flex gap-4 p-4 justify-end">
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
        <EscapeGameOrganisationTable
              data={escapeGames}
              OnDetails={handleDetails}
              OnUpdate={handleUpdate}
        />
      </>
      ),
    },
    {
      label: 'Details',
      content: (
        <EscapeGameDetails
              data={selectedEscapeGame}
              onUpdateButton={handleUpdate}
              displayButton={true}
        />
      ),
    },
    {
      label: 'Create',
      content: <AddEscapeGameDto />,
    },
    {
      label: 'Update',
      content: (
        <UpdateEscapeGameForm 
                data={selectedEscapeGame} 
                onSubmit={() => {}} />
      ),
    },
  ];

  return (
    <Grid2 className="flex flex-row justify-evenly items-center" container spacing={2}>
      <Box className="flex flex-row gap-4">
        <Item>
          <OrganisationDetails data={organisationData} />
        </Item>
        <Item className="flex ">
          <GenericTabs
            ref={tabsRef}
            tabs={tabs}
            defaultTab={0}
            ChangeTab={goToTab}
            ariaLabel="generic tabs"
          />
        </Item>
      </Box>
    </Grid2>
  );
};
export default EscapeGameComponent;