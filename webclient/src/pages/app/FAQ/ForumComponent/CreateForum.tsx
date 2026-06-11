import { Button, TextField, Typography,Box } from "@mui/material";
import { FC, useState } from "react";
import { AddForumDto } from "@/interfaces/PublicationInterface/Forum/addForumDto";
import { on } from "events";
//title: string;
//content: string;

interface CreateforumProps {
    organisationId: number;
    OnSubmit: (data: AddForumDto) => void;
}
const CreateForumTopic:FC<CreateforumProps>=({OnSubmit,organisationId})=> {
    const [formData,setFormData] =useState<AddForumDto>({
        title: "",
        content: "",
        userId:0,
        organizationId:organisationId
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
        console.log("Form data submitted:", formData);
        OnSubmit(formData);
    };
    return(
        <>
              <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2, bgcolor: 'white' }}>
                <Typography variant="h5" gutterBottom>Créer un nouveau sujet</Typography>
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
                                Ajouter
                            </Button>
                        </Box>
                    </form>
            </Box>
        </>
    )
}
export default CreateForumTopic;