import React, { useState } from 'react';
import { Grid } from '@mui/material';
import '../../App.css'
import '@fontsource/roboto/400.css';

import SignIn from './SignIn';
import SignUp from './SignUp';

const HomePageUnauthorized = () => {

  const [formVisibility, setFormVisible] = useState(true)
  const switchForm = () => {
    setFormVisible(!formVisibility)
  }

  return (
    <Grid container>
      {formVisibility ? <SignIn formVisibility={formVisibility} switchForm={switchForm}/> :
      <SignUp formVisibility={!formVisibility} switchForm={switchForm}/>
      }
    </Grid>
  )
}

export default HomePageUnauthorized;