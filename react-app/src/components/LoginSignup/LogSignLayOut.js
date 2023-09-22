import React, {useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Tabs, Tab, Grid, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SignUp from './SignUp';
import Login from './Login';
import LogSignImage from '../img/online-registration-sign-Up.jpg'
import { Navigate } from 'react-router-dom';
  
const LogSignLayOut = () => {
    const checkToken = localStorage.getItem('token')
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = useState(1);
    return <>
        <Box sx={{ flexGrow: 1, borderBottom: 1, borderColor: 'divider' }}>
            <AppBar sx={{ position: 'static' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Tabs textcolor='inherit' value={value} onChange={(e, newVal) => { setValue(newVal) }} aria-label="tabs for login signup" indicatorColor="secondary">
                        <Tab sx={{ color: 'white' }} value={1} label="LOGIN" />
                        <Tab to='/login' sx={{ color: 'white' }} value={2} label="SIGNUP" />
                    </Tabs>
                </Toolbar>
            </AppBar>
        </Box>
        <Grid container mt={1} position='fixed' sx={{ height: '100%' }}>
            <Grid item xs={12} sm={7} md={6} lg={6}>
                <Card style={{ height: '100%' }} >
                    {checkToken? <Navigate to='/view-note'/>:(value === 1 ? <Login /> : <SignUp />)}
                </Card>
            </Grid>
            {isXsScreen ? null :
                <Grid item xs={0} sm={5} md={6} lg={6}>
                    <Card style={{ height: '100%' }}>
                        <img src={LogSignImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Card>
                </Grid>
            }
        </Grid>
    </>
}

export default LogSignLayOut