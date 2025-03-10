import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import { AddForumDto } from "@/interfaces/PublicationInterface/Forum/addForumDto";
import {UpdateForumDto} from "@/interfaces/PublicationInterface/Forum/updateForumDto";
import { Forum } from "@mui/icons-material";
import { Box ,Snackbar,CircularProgress,Alert, Typography } from "@mui/material";
import { useRef, useState } from "react";
import ForumTabList from "./ForumComponent/ForumList";
import SelectedForum from "./ForumComponent/SelectedForum";
import CreateForumTopic from './ForumComponent/CreateForum';
import UpdateForumTopic from "./ForumComponent/UpdateForum";


const mockServerData = [
    {
      "id": 1,
      "title": "Welcome to our forum!",
      "content": "This is the first post on our forum.",
      "userId": 1,
      "creationDate": "2022-01-01T12:00:00.000Z",
      "updateDate": "2022-01-01T12:00:00.000Z"
    },
    {
      "id": 2,
      "title": "Another post",
      "content": "This is another post on our forum.",
      "userId": 2,
      "creationDate": "2022-01-05T14:30:00.000Z",
      "updateDate": "2022-01-05T14:30:00.000Z"
    },
    {
      "id": 3,
      "title": "A post with a long title",
      "content": "This is a post with a really long title that should wrap to multiple lines.",
      "userId": 1,
      "creationDate": "2022-01-10T10:00:00.000Z",
      "updateDate": "2022-01-10T10:00:00.000Z"
    },
    {
      "id": 4,
      "title": "A new post",
      "content": "This is a brand new post on our forum.",
      "userId": 3,
      "creationDate": "2022-01-15T12:00:00.000Z",
      "updateDate": "2022-01-15T12:00:00.000Z"
    },
    {
      "id": 5,
      "title": "A post with a question",
      "content": "This is a post with a question that needs to be answered.",
      "userId": 2,
      "creationDate": "2022-01-20T14:30:00.000Z",
      "updateDate": "2022-01-20T14:30:00.000Z"
    },
    {
      "id": 6,
      "title": "A post with a funny joke",
      "content": "This is a post with a funny joke that will make you laugh.",
      "userId": 1,
      "creationDate": "2022-01-25T10:00:00.000Z",
      "updateDate": "2022-01-25T10:00:00.000Z"
    }
  ]
const FaqComponent = () => {

    const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);
    const [serverData, setServerData] = useState<GetForumDto[]>(mockServerData);
    const [forumData, setForumData] = useState<GetForumDto>(mockServerData[0]);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const goToTab = (index: number) => {
        if (tabsRef.current) {
          tabsRef.current.changeTab(index);
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

    const onSubmit = (data: AddForumDto | UpdateForumDto) => {
        if(data === null || data === undefined) {
          setSnackbarMessage(" Unable to submit Successfully");
          setSnackbarOpen(true);
          return;
        }
      if(isUpdateForumDto(data)) 
      {
        console.log("Data submitted:", data);
      }
      else{
          console.log("Data submitted:", data);
        }
    }
    
    /**
     * Closes the snackbar.
     */
    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    }
    const handleAddForum=(data:AddForumDto)=> 
    {
      onSubmit(data);
      setSnackbarMessage("Forum Created Successfully");
      setSnackbarOpen(true);
    };

    const handleUpdateForum=(data:UpdateForumDto)=> 
    {
      onSubmit(data);
      setSnackbarMessage("Forum Updated Successfully");
      setSnackbarOpen(true);
    };

    const tabs: TabItem[]=[
        {
            label:"Forums",
            content:
            <>
                <nav>
                  <Typography variant="h2">Filtre</Typography>
                  <>
                  </>
                </nav>
                <ForumTabList data={serverData}  OnDetails={handeDetails}/>
            </>
        },
        {
            
            label:"Selected Topic",
            content:
            <>
              <SelectedForum selectedForum={forumData}/>
            </>
        },
        {
            
            label:"Create Topic",
            content:<>
              <CreateForumTopic OnSubmit={handleAddForum} />
            </>
        },
        {
            
            label:"update Topic",
            content:<>
              <UpdateForumTopic data={forumData} OnSubmit={handleUpdateForum}  /> 
            </>
        }, 
    ]

    return(
    <>
        <Box>
       
          <GenericTabs ref={tabsRef} tabs={tabs} defaultTab={0}  ChangeTab={goToTab} />
          <Snackbar
           open={snackbarOpen}
           autoHideDuration={30}
           onClose={()=> handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} security="success">
                  {snackbarMessage}
              </Alert>
          </Snackbar>  
        </Box>
    </>)
};

export  default FaqComponent;