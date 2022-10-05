import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

import NavComponent from '../NavBars/NavComponent';
import { Grid, Button, Link, Stack } from '@mui/material';
import '@fontsource/roboto/400.css';
import { Box } from '@mui/system';
import axios from 'axios';

const AllProductsComponent = ({type}) => {
  const [content, setContent] = useState([])
  useEffect(() => {
    let mounted = true
    if(mounted){
      axios.get(`http://${process.env.REACT_APP_SERVER_ADDR}/get-all/${type}`)
      .then(response => {
        setContent(response.data)
      })
      .catch(err => console.log(err))
    }
    return function cleanup(){
      mounted = false
    }
  },[])
  return (
    <Grid container>
      <Grid item xs={1.7}>
        <NavComponent/>
      </Grid>
      <Grid item xs={10.3}>
        {JSON.stringify(content)}
      </Grid>
    </Grid>
  )
}

export default AllProductsComponent;