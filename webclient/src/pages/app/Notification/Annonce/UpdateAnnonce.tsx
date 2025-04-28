import { UpdateAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/updateAnnonceDto"
import { GetAnnonceDto } from "@/interfaces/NotificationInterface/Annonce/getAnnonceDto";
import { FC ,useState} from "react";
import { Box,Typography,TextField,Button } from "@mui/material";
interface UpdateAnnonceProps
{
    data:GetAnnonceDto;
    onSubmit:(data:UpdateAnnonceDto) => void;
}

const UpdateAnnonce: FC<UpdateAnnonceProps> = ({ data, onSubmit }) => {
  const [updateData, setUpdateData] = useState<UpdateAnnonceDto>({
    id: data.id,
    name: data.name,
    description: data.description,
  });

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(updateData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Box className="text-center">
      <Typography className="p-4" variant="h4">
        Update an Annonce
      </Typography>
      <form className="flex items-center justify-center mx-15 rounded-md space-y-2" onSubmit={handleUpdate}>
        <Box className="space-y-2">
          <Box>
            <Typography variant="h6">Name</Typography>
            <TextField
              type="text"
              name="name"
              value={updateData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </Box>
          <Box>
            <Typography variant="h6">Description</Typography>
            <TextField
              type="text"
              name="description"
              value={updateData.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </Box>
          <Box>
            <Button
                onClick={(e)=>handleChange}
                variant="contained" 
                color="primary" 
                type="submit">
              Update
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateAnnonce;