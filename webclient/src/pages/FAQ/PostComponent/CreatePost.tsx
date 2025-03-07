import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { AddPostForumDto } from '@/interfaces/PublicationInterface/Post/addPostForumDto';

interface AddPostFormProps {
    onSubmit: (data: AddPostForumDto) => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onSubmit }) => {
    const [content, setContent] = useState<string>('');
    const [userId, setUserId] = useState<number>(0);
    const [forumId, setForumId] = useState<number | ''>('');
    const [postParentId, setPostParentId] = useState<number | ''>('');

    // Gère la soumission du formulaire
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data: AddPostForumDto = {
            content,
            userId,
            forumId: forumId === '' ? null : forumId,
            postparentId: postParentId === '' ? null : postParentId,
        };
        onSubmit(data); // Appelle la fonction onSubmit avec les données
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                Ajouter un post
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Contenu du post"
                    fullWidth
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    sx={{ marginBottom: 2 }}
                />

              

                <Button type="submit" variant="contained" color="primary">
                    Soumettre
                </Button>
            </form>
        </Box>
    );
};

export default AddPostForm;