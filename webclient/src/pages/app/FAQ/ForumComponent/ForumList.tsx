import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import { Divider, Box, Typography, Button, Pagination, TableContainer, TableRow, TableCell,Paper, Table,TableBody} from '@mui/material';
import { DataGrid, GridEventListener } from '@mui/x-data-grid';
import FormatUtils from "@/classes/FormUtils";
import ForumTabItem from "./ForumTabItem"; 


interface ForumTabListProps {
    data: GetForumDto[];
    OnDetails: (org: GetForumDto) => void;
}
const ForumTabList:React.FC<ForumTabListProps>=({data,OnDetails})=> {

    const handledetails=(org:GetForumDto) => {
        OnDetails(org);
    }

    return(
        <>
        <Box className="flex items-center justify-center  mx-15 rounded-md ">
     
        </Box>
        <Box className="space-y-4">
          
            <TableContainer >
                <Table>
                    <TableBody>
                        {
                            data.map((item)=>{
                                return(
                                    <TableRow key={item.id.toString()}>
                                        <TableCell  key={item.id.toString()}>
                                            <ForumTabItem 
                                            dataitem={item} 
                                            children={
                                                <Box>
                                                    <Button onClick={() => handledetails(item)}>
                                                        View
                                                    </Button>
                                                </Box>
                                            }/>
                                        </TableCell> 
                                </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
          
        </Box>
        </>
    );
}
export default ForumTabList;
