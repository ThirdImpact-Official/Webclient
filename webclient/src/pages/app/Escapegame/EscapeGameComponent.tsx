import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import {  
  Box,Grid2,Typography,Select,FormControl,MenuItem,
  Divider,Skeleton,Button, CardHeader,Card, CardContent, CardActions,Pagination,CircularProgress} from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { useParams, data } from 'react-router-dom';
import EscapeGameOrganisationTable from './EscapeGameOrganisationTable';
import UpdateEscapeGameForm from './UpdateEscapeGame';
import EscapeGameDetails from './EscapegameDetails';
import GenericTabs, { TabItem } from '@/components/factory/GenericComponent/TabGénéric';
import AddEscapeGameForm from './AddEscapegame';
import Item from '@/components/factory/GenericComponent/Item';
import Organisation from '../Organisation';
import OrganisationDetails from '../Organisation/OrganisationDetails';
import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';
import { mock } from 'node:test';
import { EscapeGameAction } from '@/actions/EscapeGameAction';
import { OrganisationAction } from '@/actions/OrganisationActions';
import { UpdateEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/updateEscapeGameDto';
import { AddEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/addEscapeGameDto';
import { useModal } from '@/context/ContextHook/ModalContext';
import { useLoading } from '@/context/ContextHook/LoadingContext';
import { Refresh } from '@mui/icons-material';
import { PaginationResponse } from '@/interfaces/ServiceResponse';
import { FormDataHelper } from '@/classes/FormDataHelper';

const EscapeGameComponent = () => {
  //const { id } = useParams();
  const { id } = useParams();
  const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
  //Actions httpclient;
  const EscapeAction = new EscapeGameAction();
  const OrgaAction = new OrganisationAction();
  //getter Setter  ---------------
  const [page,setPage] = useState<number|null>(1);
  const [pageSize,setPageSize] = useState(5); 
  const [pageCount,setPageCount] = useState<number | null>(null);
  const [escapeGames, setEscapeGames] = useState<GetEscapeGameDto[]>();
  const [selectedEscapeGame, setSelectedEscapeGame] = useState<GetEscapeGameDto>(null);
  const [organisationData,setOrganisationData] =useState<GetOrganisationDto>(null);
  //-Context----------------------
  const Modal=useModal();
  const Loading=useLoading();
  //-------------------Methodes de handle pour les update et create
    const handleDetails = (escapeGame: GetEscapeGameDto) => {
    setSelectedEscapeGame(escapeGame);
    goToTab(1);
  };

  /**
   * Handles the update of an escape game.
   * Sets the selectedEscapeGame with the given escape game and navigates to the update tab.
   * @param escapeGame The escape game to update.
   */
  const handleUpdate = (escapeGame: GetEscapeGameDto) => {
    setSelectedEscapeGame(escapeGame);
    goToTab(3);
  };

/**
 * Navigates to the specified tab index.
 * Utilizes the tabsRef to change the current tab.
 * @param index The index of the tab to navigate to.
 */
  const goToTab = (index: number) => {
    if (tabsRef.current !== null) {
      tabsRef.current.changeTab(index);
    }
 };

  /**
   * Handles the change of the page.
   * Sets the page state to the given value.
   * @param event The change event from the pagination component.
   * @param value The new page number.
   */
  const handleChangePage =(event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleRefresh =(event: React.ChangeEvent<unknown>) => {
    setPage(1);
    fetchEscapeGames();
  }
  //-------------Function------------
  const fetchEscapeGames = async () => {
        try {
          console.log("Page Of eScapegame",page);
          const response   = await EscapeAction.getAllEscapeGamesFromOrganisation(Number.parseInt(organisationData?.orgId),page,pageSize) as PaginationResponse<GetEscapeGameDto>;
          console.log(response);
          console.log("Page Count",response.TotalPage);
          setPageCount(response.TotalPage);
          if (response.Success && response.Data && response.Data.length > 0) {
            console.log("Data retrieved successfully:", response.Data);
      
            // Set state separately from logging
            setEscapeGames(response.Data);
            
            // If there's data available, set the selected escape game
            setSelectedEscapeGame(response.Data[0]);
            
            // Log state update (will show previous state due to closure)
            console.log("State should update to:",escapeGames);
          } else {
            console.log("Response successful but no data found or empty array");
            setEscapeGames([]);
            setSelectedEscapeGame(null);
          }
        }
        catch (error) {
          console.log(error);
        }
  };
  const fetchOrganisation= async () => {
        try {

          const response = await OrgaAction.GetOrganisationByIdForCurrentUser();
          if (response.Success) {
            console.log(response.Data);
            
              setOrganisationData(response.Data as GetOrganisationDto);
            
          }
          
        } catch (error) {
          console.error(error);
        }
  }
  const handleFormSubmit = async (eventData: AddEscapeGameDto) => {
    let response;
    try {
      console.log(eventData)
      const formData= new FormData();
       // Ajoutez les champs textuels
      formData.append('ESGNom', eventData.esgNom);
      formData.append('ESGCreator', eventData.esgCreator);
      formData.append('ESGTitle', eventData.esgTitle);
      formData.append('ESGContent', eventData.esgContent);
      formData.append('ESGWebsite', eventData.esgWebsite);
      formData.append('ESGPhoneNumber', eventData.esgPhoneNumber);
      formData.append('ESG_IsForChildren', eventData.esg_IsForChildren.toString());
      formData.append('ESG_Price_Id', eventData.esg_Price_Id.toString());
      formData.append('ESG_DILE_Id', eventData.esg_DILE_Id.toString());

  // Ajoutez le fichier séparément avec le bon nom
  if (eventData.esgImgResources) {
    formData.append('ESGImgResources', eventData.esgImgResources);
  }
    console.log("Form Data",formData);
        response = await EscapeAction.createEscapeGame(formData);

        if (response.Success) {
            Modal.handleOpen();
            Modal.setDescription(response.Message);
            Modal.setTitle("Success");
        } else {
            Modal.handleOpen();
            Modal.setDescription(response.Message);
            Modal.setTitle("Error");
        }
    } catch (error) {
        Modal.handleOpen();
        Modal.setDescription(response.Message);
        Modal.setTitle("Error");
    }
  }
const handleUpdateSubmit = async (eventData: UpdateEscapeGameDto) => {
    try {
        const response = await EscapeAction.updateEscapeGame(eventData);
        if (response.Success) {
            Modal.handleOpen();
            Modal.setDescription(response.Message);
            Modal.setTitle("Success");
        } else {
            Modal.handleOpen();
            Modal.setDescription(response.Message);
            Modal.setTitle("Error");
        }
    } catch (error) {
        Modal.handleOpen();
        Modal.setDescription(error instanceof Error ? error.message : 'An error occurred');
        Modal.setTitle("Error");
    }
  }
  //-------------UseEffect------------
  useEffect(() => {
      fetchEscapeGames();
  },[page,id])

  useEffect(() => {
      fetchOrganisation();
  },[]);
  
  const tabs: TabItem[] = [
    {
      label: 'List',
      content: (
      <>
        <Card elevation={3}>
          <CardHeader action={
            <>
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
                <FormControl variant='standard' sx={{ m: 1 }} className='flex flex-row space-x-10 float-end justify-end items-end'>
                    <Button
                      variant='contained'
                      color='warning'
                      onClick={handleRefresh}>Refresh
                      <Refresh></Refresh>
                      </Button>
                </FormControl>
            </>} />
          <CardContent>
        {
          escapeGames != null ?
          <EscapeGameOrganisationTable
              data={escapeGames}
              OnDetails={handleDetails}
              OnUpdate={handleUpdate}
              />: <Skeleton></Skeleton>
        }
        </CardContent>
        <CardActions>
           <Pagination
                page={page}
                className="float-end"
                onChange={handleChangePage}
                count={pageCount}
                />
        </CardActions>
      </Card>
      </>
      ),
    },
    {
      label: 'Details',
      content: (
        <>
        <Card elevation={3}>
          <CardContent>
          {
            selectedEscapeGame != null ?
              <EscapeGameDetails
                    data={selectedEscapeGame}
                    onUpdateButton={handleUpdate}
                    displayButton={true}
              />
              :<Skeleton></Skeleton>
          }
          </CardContent>
        </Card>
        </>
      ),
    },
    {
      label: 'Create',
      content: (
        <Card elevation={3}>
          <CardContent>
            <AddEscapeGameForm
                onSubmit={handleFormSubmit} />,
          </CardContent>
        </Card>)
    },
    {
      label: 'Update',
      content: selectedEscapeGame != null ? (
        <Card elevation={3}> 
          <CardContent>
            <UpdateEscapeGameForm 
                    data={selectedEscapeGame} 
                    onSubmit={handleUpdateSubmit} />
          </CardContent>
        </Card>
      ) : (<CircularProgress/>),
    },
  ];

  return (
    <Grid2 className="flex flex-row justify-evenly items-center" container spacing={2}>
      <Box className="flex flex-row gap-4">
        <Box className='flex w-1/3 =d:w-1/3'>
          <OrganisationDetails data={organisationData} />
        </Box>
        <Box className="flex w-2/3 md:w-2/3">
          <GenericTabs
            ref={tabsRef}
            tabs={tabs}
            defaultTab={0}
            ChangeTab={goToTab}
            ariaLabel="generic tabs"
          />
        </Box>
      </Box>
    </Grid2>
  );
};
export default EscapeGameComponent;