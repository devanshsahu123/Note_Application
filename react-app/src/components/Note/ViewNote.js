import { Box, Grid, Button } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';

export default function ViewNote() {
    const [listData, setListData] = useState([])
    const [open, setOpen] = useState(false)
    const [key, setKey] = useState(0)
    const [noteDetail, setNoteDetail] = useState([])
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {
        return () => listNote()

    }, [])

    const listNote = async () => {
        const getNote = await axios.get(`http://localhost:3003/api/list-note`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setListData(getNote.data.notes)
        return true
    }

    const deleteHandler = async (delteNoteId) => {
        // console.log(e)
        // e.preventDefault()
        const deleteNote = await axios.delete(`http://localhost:3003/api/delete-note/${delteNoteId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setKey((prevKey) => prevKey + 1);
        return listNote()
    }

    const viewHandler = async(id) => {

        const noteDetail = await axios.get(`http://localhost:3003/api/detail-note/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setNoteDetail(noteDetail.data.data)
        console.log(noteDetail, "noteDetail")
        setOpen(true)
        return
    }



    return (<>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: '', width: '100%' }} spacing={2}>

            {listData.map((list) => (
                <div key={list._id} xs={12} sm={6} md={4} style={{ margin: '10px', maxWidth: "180px", maxHeight: "200px" }}>
                    <Box sx={{ width: '100%', height: '200px', mb: '5px' }}>
                        <div onClick={() => { viewHandler(list._id) }}>
                            <Paper elevation={3} sx={{ flexGrow: "1", background: `${list.color}`, overflow: "hidden", height: "162px" }}>
                                <b>{list.title}</b>
                                <div dangerouslySetInnerHTML={{ __html: list.description }} />
                            </Paper >
                        </div>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: "2px", justifyContent: 'space-around' }}>
                            <Button onClick={() => navigate(`/update-note/${list._id}`)} size='md' color="neutral" variant="soft" sx={{ width: "80px" }} >Update</Button>
                            <Button onClick={() => deleteHandler(list._id)} size='md' color="neutral" variant="soft" sx={{ width: "80px" }}><DeleteIcon /></Button>
                        </Box>
                    </Box>
                </div>))}
{

            <div>
                <Dialog
                    open={open}
                    onClose={()=>setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                      <b>{noteDetail.title}</b>  
                    </DialogTitle>
                    <DialogContent sx={{backgroundColor:`${noteDetail.color}`}}>
                        <DialogContentText id="alert-dialog-description" sx={{width: "500px"}}>
                        <div dangerouslySetInnerHTML={{ __html: noteDetail.description }} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions   sx={{backgroundColor:`${noteDetail.color}`}}>
                        <Button onClick={()=>setOpen(false)} autoFocus>
                            close Note
                        </Button>
                    </DialogActions>
                </Dialog>
            </div> }
            

        </Box>
        <Button onClick={() => navigate('/add-note')} sx={{
            backgroundColor: 'ActiveBorder', height: '50px', width: '50px', borderRadius: '100% 100% 100% 100%',
            position: 'fixed', bottom: '20px', right: '20px'
        }}>
            <NoteAddIcon sx={{ mr: 1, mt: 0, ml: 1, mb: 0, color: 'White', fontSize: '2rem' }} />
        </Button>

    </>)
}
