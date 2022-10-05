import React from 'react';
import Cookies from 'js-cookie';

import NavComponent from '../NavBars/NavComponent';
import { Grid, Button, Link, Stack } from '@mui/material';
import '../../App.css'
import '@fontsource/roboto/400.css';
import { Box } from '@mui/system';

const Logout = () => {
  Cookies.remove('token')
  window.location.reload()
}

const HomePage = () => {
  
  return (
    <Grid container>
      <Grid item xs={1.7}>
        {/* <NavSidebar/> */}
        <NavComponent/>
      </Grid>
    </Grid>
  )
}

export default HomePage;