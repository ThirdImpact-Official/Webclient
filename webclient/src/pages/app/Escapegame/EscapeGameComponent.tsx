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
import EscapeGameOrganisation from '../../../../../../MobileApp/EscapeGameNextDoor/app/Organisation/EscapeGame/EscapeGameOrganisation';
import WorkLayout from '@/components/app/Layout/WorkLayout';
const EscapeGameComponent = () => {
  //const { id } = useParams();
  const { id } = useParams();
  const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
  //Actions httpclient;
  const EscapeAction = new EscapeGameAction();
  const OrgaAction = new OrganisationAction();
  //getter Setter  ---------------
  const [page,setPage] = useState<number|null>(1);
  const [totalPage,setTotalPage]=useState<number>(0);
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
            setTotalPage(response.TotalPage);
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
      console.log()
       const formData= new FormData();
      formData.append("ESGID",eventData.esgId.toString())
      formData.append('ESGNom', eventData.esgNom);
      formData.append('ESGCreator', eventData.esgCreator);
      formData.append('ESGTitle', eventData.esgTitle);
      formData.append('ESGContent', eventData.esgContent);
      formData.append('ESGWebsite', eventData.esgWebsite);
      formData.append('ESGPhoneNumber', eventData.esgPhoneNumber);
      formData.append('ESG_IsForChildren', eventData.esg_IsForChildren.toString());
      formData.append('ESG_Price_Id', eventData.esg_Price_Id.toString());
      formData.append('ESG_DILE_Id', eventData.esg_DILE_Id.toString());
      formData.append('Language', eventData.language.toString());
      formData.append('MaxPlayer', eventData.maxPlayers.toString());
      formData.append('Minplayer', eventData.minPlayers.toString());
      // Ajoutez le fichier séparément avec le bon nom
      if (eventData.esgImgResources) {
        formData.append('ESGImgResources', eventData.esgImgResources);
      }
      console.log(formData);
        const response = await EscapeAction.updateEscapeGame(formData);
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
  /**
   * 
   * @param item 
   */
  const handleDelete= async (item: GetEscapeGameDto)=>{
    try
    {
      const response = await EscapeAction.deleteEscapeGame(item.esgId);
      if(response.Success)
      if (response.Success) {
            Modal.handleOpen();
            Modal.setDescription(response.Message);
            Modal.setTitle("Success");
        } else {
            Modal.handleOpen();
            Modal.setDescription(response.Message);
            Modal.setTitle("Error");
        }
    }
    catch(error)
    {

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
  <Card
    elevation={0}
    sx={{
      border: "1px solid #d0d7de",
      borderRadius: "6px",
      backgroundColor: "#ffffff",
      p: 2,
    }}
  >
    {/* Header GitHub-style */}
    <CardHeader
      title={
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#24292f" }}>
          Filtres
        </Typography>
      }
      action={
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Selects */}
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <Select defaultValue="">
              <MenuItem value="">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <Select defaultValue="">
              <MenuItem value="">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <Select defaultValue="">
              <MenuItem value="">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
            </Select>
          </FormControl>

          {/* Refresh Button */}
          <Button
            variant="contained"
            color="warning"
            onClick={handleRefresh}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            Refresh
            <Refresh fontSize="small" />
          </Button>
        </Box>
      }
      sx={{
        borderBottom: "1px solid #d8dee4",
        pb: 1,
        mb: 2,
      }}
    />

    {/* Table */}
    <CardContent sx={{ p: 0 }}>
      {escapeGames ? (
        <EscapeGameOrganisationTable
          data={escapeGames}
          OnDetails={handleDetails}
          OnUpdate={handleUpdate}
        />
      ) : (
        <Skeleton variant="rectangular" height={200} />
      )}
    </CardContent>

    {/* Pagination */}
    <CardActions
      sx={{
        borderTop: "1px solid #d8dee4",
        pt: 2,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Pagination
        page={page}
        onChange={handleChangePage}
        count={pageCount}
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: "6px",
            border: "1px solid #d0d7de",
          },
          "& .Mui-selected": {
            backgroundColor: "#0969da",
            color: "#ffffff",
            borderColor: "#0969da",
          },
        }}
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
                    onDeleteButton={handleDelete}
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
  <WorkLayout
    title="Organisation"
    subtitle="Manage organisation details and settings"
    sidebar={
      <Box sx={{ p: 1 }}>
        <OrganisationDetails data={organisationData} />
      </Box>
    }
  >
    <Box sx={{ width: "100%", p: 1 }}>
      <GenericTabs
        ref={tabsRef}
        tabs={tabs}
        defaultTab={0}
        ChangeTab={goToTab}
        ariaLabel="generic tabs"
      />
    </Box>
  </WorkLayout>
);

};
export default EscapeGameComponent;