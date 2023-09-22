import { Button, Textarea } from '@mui/joy'
import { Alert, Box } from '@mui/material'
import { Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
import axios from 'axios'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom"
import checkUrl from '../helper/checkUrl'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function AddNote() {
    const editor = useRef(null);
    const [color, setColor] = useState('')
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [alert, setAlert] = useState({ type: '', msg: '' })
    const [Hider, setHider] = useState('none')
    const [attachmentURL, setAttachmentURL] = useState('')
    const [attachmentType, setattachmentType] = useState('')
    const [route, setRoute] = useState('')
    const location = useLocation()
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        console.log(useEffect)
        const currentPath = location.pathname.split('/')[1]
        if (currentPath === "update-note") {
            setRoute('update-note')
            return () => { getDetailHandler() }
        }

    }, [id])

    const attachMentHandler = async (e) => {
        e.preventDefault()
        console.log("attachMentHandler")
        try {
            const response = await fetch(attachmentURL, { method: 'HEAD' })
            if (!response.ok) { setAlert({ type: 'error', msg: 'attachment !! responce was not ok error' }); return false }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('video')) {
                setattachmentType('video')
            } else if (contentType && contentType.includes('image')) {
                setattachmentType('image')
            } else {
                setattachmentType('unknown')
            }
        } catch (error) {
            setAlert({ type: 'error', msg: 'attachment !!something went wrong' })
        }

    }

    const token = localStorage.getItem('token')
    const getDetailHandler = async () => {
        console.log("getDetailHandler")
        const getData = await axios.get(`http://localhost:3003/api/detail-note/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        setColor(getData.data.data.color)
        setTitle(getData.data.data.title)
        setContent(getData.data.data.description)
        setAttachmentURL(getData.data.data.attachment)
        setattachmentType(getData.data.data.attachmentType)

    }

    const handler = async (e) => {
        e.preventDefault()
        console.log("handler")
        const currentPath = location.pathname
        const path = currentPath.split('/')[1];

        if (path === "update-note") {
            await updateHandler()
        }
        if (path === "add-note") {

            await addHandler()

        }
    }

    const addHandler = async () => {
        console.log("addHandler")
        if (title === '' && content === '') { setAlert({ type: 'error', msg: 'Empty Note' }); return false }
        const checkToken = localStorage.getItem('token')
        if (!checkToken) { setAlert({ type: 'error', msg: 'token something went wrong' }); return false }
        if (attachmentURL != '') {
            if (!checkUrl(attachmentURL)) { setAlert({ type: 'error', msg: 'invalid URL' }); return false }
        }


        const createNote = await axios.post('http://localhost:3003/api/add-note', {
            title: title,
            description: content,
            color: color,
            attachment: attachmentURL,
            attachmentType: attachmentType,
        }, {
            headers: {
                'Authorization': `Bearer ${checkToken}`, // Add the token to the Authorization header
                'Content-Type': 'application/json',
            }
        })

        setAlert({ type: 'success', msg: 'Note Created' });
        navigate('/view-note')

    }

    const updateHandler = async () => {
        if (title === '' && content === '') { setAlert({ type: 'error', msg: 'Empty Note' }); return false }
        const checkToken = localStorage.getItem('token')

        if (!checkToken) { setAlert({ type: 'error', msg: 'token something went wrong' }); return false }
        try {
            console.log("updateHandler")
            console.log("first")
            const path = `http://localhost:3003/api/update-note/${id}`;
            const updateData = {
                title: title,
                description: content,
                color: color,
                attachment: attachmentURL,
                attachmentType: attachmentType
            }

            console.log("2")

            const updateNote = await axios.post(path, updateData, {
                headers: {
                    'Authorization': `Bearer ${checkToken}`, // Add the token to the Authorization header
                    'Content-Type': 'application/json',
                }
            })
            console.log("3")
            navigate('/view-note')
            setAlert({ type: 'success', msg: 'Note updated' });

        } catch (error) {
            console.log(error.response.data)
            setAlert({ type: 'error', msg: error.response.data.error })
            console.log(error)
            return false
        }
    }

    return (<>
        <div>
            <Typography variant="h5" color="grey" mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                Note Color :- <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={() => { setColor('red') }} color='none'>
                        {color === 'red' ? <FavoriteBorderIcon sx={{ color: 'red' }} size="lg" /> : <FavoriteIcon sx={{ color: 'red' }} size="lg" />}
                    </Button>
                    <Button onClick={() => { setColor('pink') }} color='none'>
                        {color === 'pink' ? <FavoriteBorderIcon sx={{ color: 'pink' }} size="lg" /> : <FavoriteIcon sx={{ color: 'pink' }} size="lg" />}
                    </Button>
                    <Button onClick={() => { setColor('green') }} color='none'>
                        {color === 'green' ? <FavoriteBorderIcon size="lg" sx={{ color: 'green' }} /> : <FavoriteIcon size="lg" sx={{ color: 'green' }} />}
                    </Button>
                    <Button onClick={() => { setColor('grey') }} color='none'>
                        {color === 'grey' ? <FavoriteBorderIcon size="lg" sx={{ color: 'grey' }} /> : <FavoriteIcon size="lg" sx={{ color: 'grey' }} />}
                    </Button>
                </Box></Typography>

            <Box sx={{ width: '100%' }} component='form' onSubmit={handler}>
                {alert.type ? <Alert severity={alert.type} sx={{ mb: 3 }}>{alert.msg}</Alert> : ""}
                <Box  >
                    <Typography variant="h5" color="Grey">Title</Typography>
                    <Textarea value={title} id='title' placeholder='Title...' color="success" minRows={1} size="lg" variant="soft" sx={{ width: '100%' }} onChange={(e) => { setTitle(e.target.value); console.log(e.target.value) }} />
                </Box>

                <Box mt={2}>
                    <Typography variant="h5" color="Grey">Note</Typography>
                    <JoditEditor ref={editor} value={content} onChange={(val) => setContent(val)} />
                </Box>

                {attachmentType === "image" ? <Box sx={{ width: "100px", position: "static", objectFit: 'cover', display: "flex", justifyContent: 'center', width: "100%", height: "200px", mt: 2 }}>
                    <img src={attachmentURL} sx={{ width: '400px' }} />
                </Box> : ""}

                {attachmentType === "video" ? <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <video width="400px" controls>
                        <source type="video/mp4" src={attachmentURL}>
                        </source>
                    </video>
                </Box> : ""}

                <Box mt={2} display={Hider}>
                    <Typography variant="h5" color="Grey" mb={1}>Attachment URL</Typography>
                    <Textarea id='attchment' onChange={(e) => setAttachmentURL(e.currentTarget.value)} placeholder='attachment...' color="success" minRows={1} size="lg" variant="soft" sx={{ width: '100%' }} />
                </Box>

                <Box display='flex' justifyContent='center' mt={8}>
                    {
                        Hider === 'none' ? <Button color="neutral" size="md" onClick={() => { setHider('') }} sx={{ mr: 3 }}> Attach File </Button>
                            : <Button color="neutral" size="md" onClick={attachMentHandler} sx={{ mr: 3 }}>Submit Attach File</Button>
                    }<Button type='submit' color="primary" size="md"> {route ? "Update Note" : "Create Note"}</Button>
                </Box>
            </Box>
        </div>
    </>)
}
