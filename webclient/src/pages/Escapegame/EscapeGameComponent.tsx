import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import {  Box,Grid2} from '@mui/material';
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import EscapeGameOrganisationTable from './EscapeGameOrganisationTable';
import UpdateEscapeGameForm from './UpdateEscapeGame';
import EscapeGameDetails from './EscapegameDetails';
import GenericTabs, { TabItem } from '@/components/factory/GenericComponent/TabGénéric';
import AddEscapeGameDto from './AddEscapegame';
import Item from '@/components/factory/GenericComponent/Item';

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


const EscapeGameComponent = () => {
  const { id } = useParams();
  const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
  const [escapeGames, setEscapeGames] = useState<GetEscapeGameDto[]>(testObjects);
  const [selectedEscapeGame, setSelectedEscapeGame] = useState<GetEscapeGameDto>(testObjects[0]);

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
        <EscapeGameOrganisationTable
              data={escapeGames}
              OnDetails={handleDetails}
              OnUpdate={handleUpdate}
        />
      ),
    },
    {
      label: 'Details',
      content: (
        <EscapeGameDetails
              data={selectedEscapeGame}
              onUpdateButton={handleUpdate}
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
    <Grid2 container spacing={2}>
      <Item>
        <GenericTabs
          ref={tabsRef}
          tabs={tabs}
          defaultTab={0}
          ChangeTab={goToTab}
          ariaLabel="generic tabs"
        />
      </Item>
      <Box className="w-5/6 mx-10 px-10 bg-white rounded-md"></Box>
    </Grid2>
  );
};
export default EscapeGameComponent;