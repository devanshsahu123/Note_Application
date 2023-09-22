import { AppBar, Box, Tab, Tabs } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import NotesIcon from '@mui/icons-material/Notes';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/joy';
export default function NoteTabs() {
    const navigate = useNavigate()
    return (<>
        <Box>
            <AppBar
                sx={{
                    position: 'inherit',
                    width: '200px',
                    height: '100vh',
                    flexDirection: 'inherit',
                    alignItems: 'flex-start',
                    backgroundColor: '#008080',
                }}>
                <Box >
                    <Box sx={{ width: '180px' }} textcolor='white' orientation='vertical' >
                        <Button onClick={()=>navigate('/view-note')} sx={{ fontFamily: 'cursive', width: "160px", backgroundColor: 'green', pl: 0, mt: 2, borderRadius: '0% 30% 30% 0%' ,'&:hover': {
      backgroundColor: '#8BC34A'} }} >
                            <div style={{ display: 'flex', alignItems: 'center', height:"40px"}}>
                                <NotesIcon sx={{ mr: 1, mt: 0, ml: 1, mb: 0 ,fontSize:'x-large'}} />
                                <span style={{ marginLeft: '1px',fontSize:'medium' }}>View Note</span>
                            </div>
                        </Button>
                    </Box>
                </Box>
            </AppBar>
        </Box>


    </>)
}
