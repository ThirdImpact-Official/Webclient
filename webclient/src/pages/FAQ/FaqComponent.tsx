import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import { Forum } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useRef, useState } from "react";
import ForumTabList from "./ForumList";
import SelectedForum from "./SelectedForum";
import CreateForumTopic from './CreateForum';

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
    const [forumData, setForumData] = useState<GetForumDto>(mockServerData[0])
    const goToTab = (index: number) => {
        if (tabsRef.current) {
          tabsRef.current.changeTab(index);
        }
    };
    const handeDetails=(org: GetForumDto)=> {
      setForumData(org);
      goToTab(1);
    }
    const tabs: TabItem[]=[
        {
            label:"Forums",
            content:
            <>
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
              <CreateForumTopic />
            </>
        },
        {
            
            label:"Created Topic",
            content:<></>
        },
        {
            
            label:"tab1",
            content:<></>
        }

    ]


    return(
    <>
        <Box>
            <GenericTabs ref={tabsRef} tabs={tabs} defaultTab={0}  ChangeTab={goToTab} />
        </Box>
    </>)
};

export  default FaqComponent;