import React from 'react';
import Cookies from 'js-cookie';

import NavComponent from '../NavSidebar/NavComponent';
import { Grid, Button, Link, Stack } from '@mui/material';
import '../../App.css'
import '@fontsource/roboto/400.css';
import { Box } from '@mui/system';

const Logout = () => {
  Cookies.remove('token')
  window.location.reload()
}

const HomePageAuthorized = () => {
  
  return (
    <Grid container>
      <Grid item xs={1.7}>
        {/* <NavSidebar/> */}
        <NavComponent/>
      </Grid>
      <Grid item xs={2}>
       <Stack direction="column" spacing={2}>
          <Link href="https://trello.com/b/tlErhkn6/webapp">Trello</Link>
          <Button variant="filled" onClick={Logout}>Logout</Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default HomePageAuthorized;