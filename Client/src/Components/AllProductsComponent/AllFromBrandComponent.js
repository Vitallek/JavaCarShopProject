import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { Grid, Button, Link, Stack } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import MediaCard from './ProductCardComponent';

const AllFromBrandComponent = ({ brands }) => {
  const brandParam = useParams()
  const [content, setContent] = useState([])
  const [brand, setBrand] = useState('')
  //render component
  useEffect(() => {
    let mounted = true
    if(!mounted) return

    setBrand(brandParam.brand)

    return () => mounted = false
  }, [brandParam])
  //make api call
  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_SERVER_ADDR}/get-all/${brand.toLowerCase()}`)
      .then(response => {
        console.log(response.data)
        setContent(response.data)
      })
      .catch(err => console.log(err))
  },[brand])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack direction="row" sx={{p:1, flexWrap: 'wrap'}}>
          {content.map((element, elIndex) => <MediaCard element={element} elIndex={elIndex}/>)}
        </Stack>
      </Grid>
    </Grid>
  )
}

export default AllFromBrandComponent;