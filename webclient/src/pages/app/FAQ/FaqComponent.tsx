import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import { AddForumDto } from "@/interfaces/PublicationInterface/Forum/addForumDto";
import {UpdateForumDto} from "@/interfaces/PublicationInterface/Forum/updateForumDto";
import { Forum } from "@mui/icons-material";
import { Box ,Snackbar,CircularProgress,Alert, Typography, FormControl, Select, MenuItem, Grid2, Skeleton,Pagination,Button,Card,CardContent } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ForumTabList from "./ForumComponent/ForumList";
import SelectedForum from "./ForumComponent/SelectedForum";
import CreateForumTopic from './ForumComponent/CreateForum';
import UpdateForumTopic from "./ForumComponent/UpdateForum";
import { ForumAction } from "@/actions/ForumAction";
import { PostAction } from "@/actions/PostAction";
import { OrganisationAction } from "@/actions/OrganisationActions";
import { GetOrganisationDto } from "@/interfaces/OrganisationInterface/Organisation/getOrganisationDto";
import Organisation from "../Organisation";



const FaqComponent = () => {
    //data to set up
    const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
    //-------variable-------
    const [page,setPage]= useState<number>(1);
    const [serverData, setServerData] = useState<GetForumDto[]>();
    const [forumData, setForumData] = useState<GetForumDto | null>(null);
    const[organisation,setorgansiation]= useState<GetOrganisationDto | null>(null);
    const [isloading,setloading] = useState<boolean>(false);
    const [error,setError] =useState<string>("");
    //setup filtering  
    const [filter, setFilter] = useState();
    //-------Api-------
    const ForAction= new ForumAction();
    const postAction= new PostAction();
    const organisationAction=new OrganisationAction();
    /**
     * Navigates to the specified tab index.
     * Utilizes the tabsRef to change the current tab.
     * @param index The index of the tab to navigate to.
    */
  const fetchOrganisation= async ()=> {
    const response= await organisationAction.GetOrganisationByIdForCurrentUser();
    if(response.Success)
    {
      setorgansiation(response.Data as GetOrganisationDto);
    }else{
      setError("unable to retrieve the organisations");
    }
  }
   const goToTab = (index: number) => {
     if (tabsRef.current) {
       tabsRef.current.changeTab(index);
      }
      
    };
    //-----------Handlres---
    const handlePageChange = async (event: React.ChangeEvent<unknown>, value: number) => {
      try 
      {
        setPage(value);
        const response = await ForAction.getAllForums(value, 5);
        setServerData(Array.isArray(response.Data) ? response.Data : []);
      } catch (error) 
      {
        console.error('Failed to load organisations:', error);
      }
    };
    
    /**
     * Handles the selection of a forum in the forum list.
     * Sets the selected forum in the state and displays a success message.
     * Then, it navigates to the second tab, where the selected forum is displayed.
     * @param org The selected forum.
    */
   const handeDetails=(org: GetForumDto)=> {
     setForumData(org);
     setSnackbarMessage("Forum Selected");
     setSnackbarOpen(true);
     goToTab(1);
    }
    
    /**
     * Handles the submission of a new or updated forum.
     * If the submission is successful, it will display a success message.
     * If the submission fails, it will display an error message.
     * @param data The data to be submitted, either a new forum or an updated forum.
    */
   const isUpdateForumDto = (data: any): data is UpdateForumDto => {
     return data && typeof data === "object" && "id" in data;
    };
    
    
    const onSubmit =async  (data: AddForumDto | UpdateForumDto) =>
      {
        if(data === null || data === undefined) {
          setSnackbarMessage(" Unable to submit Successfully");
          setSnackbarOpen(true);
          return;
        }
        if(isUpdateForumDto(data)){
          const response= await ForAction.updateForum(data);
          if(response.Success)
          {
            setSnackbarMessage("Forum Updated Successfully");
            setSnackbarOpen(true);
          }
          else{
            setSnackbarMessage(" Unable to submit Successfully");
            setSnackbarOpen(true);
          }
          console.log("Data submitted:", data);
        }
        else{
          const response= await ForAction.createForum(data);
           if(response.Success)
          {
            setSnackbarMessage("Forum Updated Successfully");
            setSnackbarOpen(true);
          }
          else{
            setSnackbarMessage(" Unable to submit Successfully");
            setSnackbarOpen(true);
          }
          console.log("Data submitted:", data);
        }
      }
      //------------Handlers-------
      /**
       * Closes the snackbar.
      */
     //-------use a snackbar 
     const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
     const [snackbarMessage, setSnackbarMessage] = useState<string>("");
     const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    }
    /*
      Handle the addition of a new forum
      and Provide a toast notification
    */
    const handleAddForum=(data:AddForumDto)=> 
    {

      onSubmit(data);
      setSnackbarMessage("Forum Created Successfully");
      setSnackbarOpen(true);
    };
    /*
      Handle the addition of an updated forum
      and Provide a toast notification
    */
    const handleUpdateForum=(data:UpdateForumDto)=> 
    {
      onSubmit(data);
      setSnackbarMessage("Forum Updated Successfully");
      setSnackbarOpen(true);
    };

    //--------UseEffects
    const fetchForums = async () => {
      try {
        const response = await ForAction.GetForumoRganisation(page, 5);
        console.log(response);
        console.log(page);
        if(response.Success)
          {
            setServerData(response.Data as GetForumDto[]);
          }
      } catch (error) {
        console.error("Error fetching forums:", error);
      }
    }


  useEffect(() => {
    const fetchData = async () => {
        await fetchOrganisation();
        if (organisation) {
            await fetchForums();
        }
    };
    fetchData();
}, []);

useEffect(() => {
    if (organisation) {
        fetchForums();
    }
}, [page, organisation]);
  
    ///-------
    const tabs: TabItem[]=[
        {
            label:"Forums",
            content:
            <>
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
                <FormControl className='flex flex-row space-x-10 float-end justify-end items-end'>
                  <Button
                    variant='contained'
                    color='warning'
                    onClick={fetchForums}>Refresh</Button>
                </FormControl>
                </Box>
                {
                  serverData !=null ? 
                  <ForumTabList data={serverData}  OnDetails={handeDetails}/>
                  : <Skeleton width={500} height={100} />
                  
                }
                 <Pagination
                          page={page}
                          className="float-end"
                          onChange={handlePageChange}
                          count={10}
                      />
            </>
        },
        {
            
            label:"Selected Topic",
            content : forumData!=null ?(
              <>
                <SelectedForum selectedForum={forumData}/>
              </>
            ):<Skeleton width={500} height={100}/>
        },
        {
            
            label:"Create Topic",
            content: organisation !==null ? (<>
              <CreateForumTopic organisationId={organisation.orgId} OnSubmit={handleAddForum} />
            </>):<><CircularProgress /></>
        },
        {
            
            label:"update Topic",
            content: forumData !== null ? (<>
              <UpdateForumTopic 
                data={forumData} 
                OnSubmit={handleUpdateForum}  /> 
            </>) : (<><Box className="flex justify-center items-center">
                <CircularProgress />
              </Box>
              </>)
        }, 
    ]
    if(isloading)
    return (
      <Card>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    )
    if(error)
    {
      return (
        <Card>
          <CardContent>
            <Typography variant="h5" color="error">
              {error}
            </Typography>
          </CardContent>
        </Card>
      )
    }
    return(
    <Grid2>
        <section>
          <GenericTabs ref={tabsRef} tabs={tabs} defaultTab={0}  ChangeTab={goToTab} />
          <Snackbar
           open={snackbarOpen}
           autoHideDuration={30}
           onClose={()=> handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} security="success">
                  {snackbarMessage}
              </Alert>
          </Snackbar>  
        </section>
    </Grid2>)
};

export  default FaqComponent;