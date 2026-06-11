import { Button, TextField, Typography,Box } from "@mui/material";
import { useState } from "react";
import { UpdateForumDto } from "@/interfaces/PublicationInterface/Forum/updateForumDto";
import { GetForumDto } from "@/interfaces/PublicationInterface/Forum/getForumDto";
import { FC } from "react";

interface UpdateForumProps {
    data: GetForumDto;
    OnSubmit:(data:UpdateForumDto)=>void
}

const UpdateForumTopic:FC<UpdateForumProps>=({data,OnSubmit}) => {
    const [formData,setFormData] =useState<UpdateForumDto>({
        id: data.id,
        title:data.title,
        content:data.content,
        userId:data.userId
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Fonction pour soumettre le formulaire
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logique pour envoyer les données à un backend ou effectuer une autre action
        OnSubmit(formData);
        console.log("Form data submitted:", formData);
    };

    return(
        <>
              <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2, bgcolor: 'white' }}>
                <Typography variant="h5" gutterBottom>Modifier le sujet {formData.id}</Typography>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography>Titre</Typography>
                            <TextField 
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Entrez le titre du sujet"
                                fullWidth
                                required
                            />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography>Contenu</Typography>
                            <TextField 
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                placeholder="Décrivez votre sujet"
                                multiline
                                rows={4}
                                fullWidth
                                required
                            />
                        </Box>
                    
                        <Box className="flex justify-center">
                            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                                Modifier
                            </Button>
                        </Box>
                    </form>
            </Box>
        </>
    )
}
export default UpdateForumTopic;
