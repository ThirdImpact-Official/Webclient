import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import { Divider, Box, Typography, Button, Pagination, TableContainer, TableRow, TableCell,Paper, Table } from '@mui/material';
import FormatUtils from "@/classes/FormUtils";
import ForumTabItem from "../FAQ/ForumComponent/ForumTabItem"; 


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
            <Typography variant="h3">Forum</Typography>
        </Box>
        <Box className="space-y-4">

            <TableContainer component={Paper}>
                <Table>
                    
                    {
                        data.map((item)=>{
                            return(
                                <TableRow>
                                    <TableCell>
                                        <ForumTabItem key={item.id} dataitem={item} OnDetails={handledetails}/>
                                    </TableCell> 
                            </TableRow>
                            )
                        }
                    
                        )
                    }
                </Table>
            </TableContainer>
            <Box>
                <Pagination />
            </Box>
        </Box>
        </>
    );
}
export default ForumTabList;
