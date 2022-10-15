import React, {useRef } from 'react';
import { Register } from '../Utility/LoginAndRegister';
import Cookies from 'js-cookie';
import { sha256 } from 'crypto-hash';
import axios from 'axios';
import jwt_decode from 'jwt-decode'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const enterKey = 13
const handleEnterPush = (e, passwordInput, emailInput) => {
  if(e.keyCode === enterKey) RegisterOnClick(passwordInput, emailInput)
}

const RegisterOnClick = (passwordInput, emailInput) => {
  sha256(passwordInput, process.env.REACT_APP_PASSWORD_SALT).then(hash => {
    let passwordHash = hash
    axios.post(`http://${process.env.REACT_APP_SERVER_ADDR}/register`, {
      email: emailInput,
      password: passwordHash,
      role: 'user'
    }).then(response => {
      console.log(response)
      const responseJSON = response.data
      if (responseJSON.code === 409) {
        alert('User already exists')
        return
      }
      if (responseJSON.code === 200) {
        Cookies.set('token', JSON.stringify({
          token: responseJSON.token,
        }))
        window.location.reload()
      }
    })
  })
}

const SignUp = ({ switchForm }) => {
  const emailInput = useRef(null)
  const passwordInput = useRef(null)

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            onKeyDown={(e) => {handleEnterPush(e, passwordInput.current.value, emailInput.current.value)}}
            margin="normal"
            required
            fullWidth
            inputRef={emailInput}
            label="Имя"
            name="username"
            autoFocus
          />
          <TextField
            onKeyDown={(e) => {handleEnterPush(e, passwordInput.current.value, emailInput.current.value)}}
            margin="normal"
            required
            fullWidth
            inputRef={passwordInput}
            label="Пароль"
            name="password"
            type="password"
          />
          {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Запомнить меня"
                /> */}

          <Button
            onClick={(e) => {RegisterOnClick(passwordInput.current.value, emailInput.current.value)}}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {'Зарегистрироваться'}
          </Button>
          {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Button variant="outlined" onClick={() => {switchForm(prev => ({...prev, type: 0}))}}>
                {"Уже есть аккаунт?"}
              </Button>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp