import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import {  Box,Grid2,Typography,Select,FormControl,MenuItem, Skeleton} from '@mui/material';
import { useState, useRef, useEffect } from 'react';
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
import { EscapeGameAction } from '@/actions/EscapeGameAction';
import { OrganisationAction } from '@/actions/OrganisationActions';


const EscapeGameComponent = () => {
  //const { id } = useParams();
  const { id } = useParams();
  const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
  //Actions httpclient;
  const EscapeAction = new EscapeGameAction();
  const OrgaAction = new OrganisationAction();
  //getter Setter  ---------------
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(5); 
  const [escapeGames, setEscapeGames] = useState<GetEscapeGameDto[]>(null);
  const [selectedEscapeGame, setSelectedEscapeGame] = useState<GetEscapeGameDto>(null);
  const [organisationData,setOrganisationData] =useState<GetOrganisationDto>(null);
  //-------------------Methodes de handle pour les update et create
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
  
  //-------------Function------------

  const fetchEscapeGames = async () => {
        try {
          const response = await EscapeAction.getAllEscapeGamesFromOrganisation(Number.parseInt(id),page,pageSize);
    
          if (response.Success) {
            setEscapeGames(response.Data as GetEscapeGameDto[]);
            console.log(response.Data);
            setSelectedEscapeGame(response.Data[0]);
            console.log(response.Data[0]);
          }
        }
        catch (error) {
          console.log(error);
        }
      };
  
  const fetchOrganisation= async () => {
        try {
          const response = await OrgaAction.GetOrganisationById(Number.parseInt(id));
          if (response.Success) {
            console.log(response.Data);
            setOrganisationData(response.Data as GetOrganisationDto);
          }
          
        } catch (error) {
          console.error(error);
        }
      }
  //-------------Useeffect------------

  useEffect(() => {
    if(id != null){
      fetchEscapeGames();
      fetchOrganisation();
    }
  },[id]);
  
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
        {
          escapeGames != null ?
          <EscapeGameOrganisationTable
                data={escapeGames}
                OnDetails={handleDetails}
                OnUpdate={handleUpdate}
          />: <Skeleton></Skeleton>

        }
      </>
      ),
    },
    {
      label: 'Details',
      content: (
        <>
        {
         
          selectedEscapeGame != null ?
            <EscapeGameDetails
                  data={selectedEscapeGame}
                  onUpdateButton={handleUpdate}
                  displayButton={true}
            />
            : <Skeleton></Skeleton>

        }
        </>
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