import { Input, Button } from '@mui/joy'
import { Alert, Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import isValidEmail from '../helper/checkEmail'
import isValidPassword from '../helper/checkPassword'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


function Login() {
  const [alert, setAlert] = useState({ type: '', message: '' })
      const navigator = useNavigate()
  const loginHandler = async (e) => {
    // console.log(e)
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (email === '') { setAlert({ type: 'error', message: 'email is missing' }); return false };
    if (password === '') { setAlert({ type: 'error', message: 'password is missing' }); return false }

    if (email && password) {
      if (!isValidEmail(email)) { setAlert({ type: 'error', message: 'inValid Email' }); return false }
      if (!isValidPassword(password)) { setAlert({ type: 'error', message: 'password must be combination of letters, numbers, and special characters minimum length 8 characters ex: rC@mB93d' }); return false }
    }

    try {
      const Data = await axios.post('http://localhost:3003/api/login', {
        email: email,
        password: password
      })

      setAlert({ type: 'success', message: Data.data.msg });
      localStorage.setItem('token', Data.data.token)

      navigator("/")
      return true
    } catch (error) {
      const errorHandle = error.response.data
      setAlert({ type: 'error', message: errorHandle.msg });
    }
  }



  return (
    <>
      <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
        <Box onSubmit={loginHandler} width={'80%'} component='form'>
          <Typography variant="h4" color="rgb(129 123 227 / 87%)" mb={4}>LOGIN</Typography>
          <Input id='email' sx={{ mb: 2 }} color="neutral" size="md" variant="soft" placeholder="Email ID...." />
          <Input id='password' sx={{ mb: 2 }} color="neutral" size="md" variant="soft" placeholder="Password..." />
          <Box sx={{ mb: 2 }} textAlign='center' mt={3}>
            <Button type="submit" variant="soft">LOGIN</Button>
          </Box>
          <Alert severity={alert.type}>{alert.message}</Alert>

        </Box>
      </div>
    </>
  )
}
export default Login