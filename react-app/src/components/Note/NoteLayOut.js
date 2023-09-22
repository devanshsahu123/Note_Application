import React from 'react'
import NoteNaveBar from './NoteNaveBar'
import NoteTabs from './NoteTabs'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function NoteLayOut() {
    return (<>
        <NoteNaveBar />
        <Box sx={{display:'flex' }}>
            <Box>
                <NoteTabs />
            </Box>
            <Box ml={2} mr={2} mt={2} sx={{width:'100%'}}>
                <Outlet/>
            </Box>
        </Box>

    </>)
}
