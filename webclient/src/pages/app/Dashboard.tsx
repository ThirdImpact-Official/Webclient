import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Box, Card, CardContent, Typography, Button,Stack } from '@mui/material';

/**
 * Dashboard component that renders a simple dashboard view. 
 * It displays cards in a grid layout.
 * @returns {React.ReactElement}
 */
const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <p>Redirecting...</p>;
  }

  return (
    <Stack
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        columnGap: 0,
        rowGap: 0,
        height: '100vh',
        p: 2,
      }}
    >
      <Box sx={{ gridArea: '1 / 1 / 2 / 3', height: '100%' }}>
        <Card onClick={() => navigate('/profile')} sx={{ height: '100%' ,width:'70%' }}>
          <CardContent sx={{ backgroundColor: '#f44336', color: '#fff' }}>
            <Typography variant="h5" gutterBottom>
              Profile
            </Typography>
            <Typography variant="body2">
              View and edit your profile information.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ gridArea: '1 / 3 / 2 / 6' }}>
        <Card onClick={() => navigate('/notification')} sx={{ height: '100%',width:'70%' }}>
          <CardContent sx={{ backgroundColor: '#e91e63', color: '#fff' }}>
            <Typography variant="h5" gutterBottom>
              Notifications
            </Typography>
            <Typography variant="body2">
              You have 3 unread notifications.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ gridArea: '2 / 1 / 6 / 3' }}>
        <Card sx={{ height: '100%',width:'70%' }}>
          <CardContent sx={{ backgroundColor: '#9c27b0', color: '#fff' }}>
            <Typography variant="h5" gutterBottom>
              Overview
            </Typography>
            <Typography variant="body2">
              Here is a quick overview of your activity and stats.
            </Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => navigate('/stats')}>
              View Stats
            </Button>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ gridArea: '2 / 3 / 3 / 6' }}>
        <Card sx={{ height: '100%',width:'70%' }}>
          <CardContent sx={{ backgroundColor: '#673ab7', color: '#fff' }}>
            <Typography variant="h6">Forum</Typography>
            <Typography variant="body2">Access frequent tools easily.</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ gridArea: '3 / 3 / 4 / 6' }}>
        <Card sx={{ height: '100%',width:'70%' }}>
          <CardContent sx={{ backgroundColor: '#3f51b5', color: '#fff' }}>
            <Typography variant="h6">Messages</Typography>
            <Typography variant="body2">Check your inbox for new messages.</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ gridArea: '4 / 3 / 5 / 6' }}>
        <Card  sx={{ height: '100%',width:'70%' }}>
          <CardContent sx={{ backgroundColor: '#2196f3', color: '#fff' }}>
            <Typography variant="h6">vos EscapeGame</Typography>
            <Typography variant="body2">You have 2 pending tasks.</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ gridArea: '5 / 3 / 6 / 6' }}>
        <Card sx={{ height: '100%',width:'70%' }}>
          <CardContent sx={{ backgroundColor: '#03a9f4', color: '#fff' }}>
            <Typography variant="h6">Settings</Typography>
            <Typography variant="body2">Manage your account preferences.</Typography>
            <Button size="small" onClick={() => navigate('/settings')} sx={{ mt: 1 }} variant="outlined" color="inherit">
              Go to Settings
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
};

export default Dashboard;
