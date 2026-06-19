import GenericTabs, { TabItem } from "@/components/factory/GenericComponent/TabGénéric";
import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import { AddForumDto } from "@/interfaces/PublicationInterface/Forum/addForumDto";
import { UpdateForumDto } from "@/interfaces/PublicationInterface/Forum/updateForumDto";
import { Box, Snackbar, CircularProgress, Alert, Typography, FormControl, Select, MenuItem, Button, Card, CardContent, Pagination, Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ForumTabList from "./ForumComponent/ForumList";
import SelectedForum from "./ForumComponent/SelectedForum";
import CreateForumTopic from './ForumComponent/CreateForum';
import UpdateForumTopic from "./ForumComponent/UpdateForum";
import { ForumAction } from "@/actions/ForumAction";
import { OrganisationAction } from "@/actions/OrganisationActions";
import { GetOrganisationDto } from "@/interfaces/OrganisationInterface/Organisation/getOrganisationDto";
import { PaginationResponse } from "@/interfaces/ServiceResponse";
import { Car } from "lucide-react";
import Organisation from "../Organisation";
import OrganisationDetails from "../Organisation/OrganisationDetails";
import { data } from 'react-router-dom';
import WorkLayout from "@/components/app/Layout/WorkLayout";

const FaqComponent = () => {
  const tabsRef = useRef<{ changeTab: (index: number) => void } | null>(null);

  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [serverData, setServerData] = useState<GetForumDto[]>([]);
  const [forumData, setForumData] = useState<GetForumDto | null>(null);
  const [organisation, setOrganisation] = useState<GetOrganisationDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const forumAction = new ForumAction();
  const organisationAction = new OrganisationAction();

  const goToTab = (index: number) => {
    tabsRef.current?.changeTab(index);
  };

  const handleSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handlePageChange = async (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDetails = (forum: GetForumDto) => {
    setForumData(forum);
    handleSnackbar("Forum selected");
    goToTab(1);
  };

  const isUpdateForumDto = (data: any): data is UpdateForumDto =>
    data && typeof data === "object" && "id" in data;

  const onSubmit = async (data: AddForumDto | UpdateForumDto) => {
    if (!data) {
      handleSnackbar("Invalid submission");
      return;
    }

    const response = isUpdateForumDto(data)
      ? await forumAction.updateForum(data)
      : await forumAction.createForum(data);
    
      console.log(response);
    if (response.Success) {
      handleSnackbar(isUpdateForumDto(data) ? "Forum updated successfully" : "Forum created successfully");
      fetchForums(); // Refresh list
    } else {
      handleSnackbar("Submission failed");
    }
  };

  const handleAddForum = (data: AddForumDto) => onSubmit(data);
  const handleUpdateForum = (data: UpdateForumDto) => onSubmit(data);

  const fetchOrganisation = async () => {
    const res = await organisationAction.GetOrganisationByIdForCurrentUser();
    if (res.Success) {
      setOrganisation(res.Data as GetOrganisationDto);
    } else {
      setError("Unable to retrieve the organisation");
    }
  };

  const fetchForums = async () => {
    if (!organisation) return;
    try {
      setIsLoading(true);
      const response = await forumAction.GetForumoRganisation(page, 5) as PaginationResponse<GetForumDto>;
      console.log(response);
      if (response.Success) {
        setServerData(response.Data ?? []);
        setTotalPage(response.TotalPage ?? 1);
      } else {
        setError("Unable to fetch forums");
      }
    } catch (err) {
      console.error("Error fetching forums:", err);
      setError("Error fetching forums");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchOrganisation();
    };
    init();
  }, []);

  useEffect(() => {
    
      fetchForums();
   
  }, [organisation, page]);

  const tabs: TabItem[] = [
    {
      label: "Forums",
      content: (
        <>
          <Box className="flex gap-4 justify-end">
            <Typography variant="h5">Filtre</Typography>
            {[1, 2, 3].map((_, i) => (
              <FormControl key={i} sx={{ m: 1 }} variant="standard">
                <Select>
                  <MenuItem>A</MenuItem>
                  <MenuItem>B</MenuItem>
                </Select>
              </FormControl>
            ))}
            <FormControl className="flex flex-row space-x-10 float-end justify-end items-end">
              <Button variant="contained" color="success">Ajouter</Button>
            </FormControl>
            <FormControl className="flex flex-row space-x-10 float-end justify-end items-end">
              <Button variant="contained" color="warning" onClick={fetchForums}>Refresh</Button>
            </FormControl>
          </Box>
          {isLoading ? (
            <Skeleton width={500} height={100} />
          ) : (
            <>
              <ForumTabList data={serverData} OnDetails={handleDetails} />
              <Pagination
                page={page}
                className="float-end"
                onChange={handlePageChange}
                count={totalPage}
              />
            </>
          )}
        </>
      ),
    },
    {
      label: "Selected Topic",
      content: forumData ? (
        <SelectedForum selectedForum={forumData} />
      ) : (
        <Skeleton width={500} height={100} />
      ),
    },
    {
      label: "Create Topic",
      content: organisation ? (
        <Card>
          <CardContent>
           <CreateForumTopic organisationId={organisation.orgId} OnSubmit={handleAddForum} />

          </CardContent>
        </Card>
      ) : (
        <Box className="flex justify-center items-center"><CircularProgress /></Box>
      ),
    },
    {
      label: "Update Topic",
      content: forumData ? (
        <Card>
          <UpdateForumTopic data={forumData} OnSubmit={handleUpdateForum} />
        </Card>
      ) : (
        <Box className="flex justify-center items-center"><CircularProgress /></Box>
      ),
    },
  ];

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" color="error">{error}</Typography>
        </CardContent>
      </Card>
    );
  }
  if(isLoading)
  {
     <Card>
        <CardContent>
         <CircularProgress />
        </CardContent>
      </Card>
  }
  return (
    <WorkLayout title="FAQ" 
      subtitle="Frequently Asked Questions"
    sidebar={
      <Box>
        <OrganisationDetails data={organisation}   />
      </Box>
    }
    >

    <Box className="flex flex-row justify-center items-center ">
      <GenericTabs ref={tabsRef} tabs={tabs} defaultTab={0} ChangeTab={goToTab} />
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">{snackbarMessage}</Alert>
      </Snackbar>

    </Box>
    </WorkLayout>
  );
};

export default FaqComponent;
