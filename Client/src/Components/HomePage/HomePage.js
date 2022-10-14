import { Button, Stack, Grid, Select, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import "primeflex/primeflex.css";
import { Carousel } from 'primereact/carousel';
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useEffect, useState } from 'react';

const HomePage = ({brands}) => {
  const [content, setContent] = useState([])
  const [searchParams, setSearchParams] = useState({
    brand: '',
    model: '',
    maxPrice: 0,
    minPrice: 0,
    maxYear: 0,
    minYear: 0,
    mileage: 0
  })
  useEffect(() => {
    let mounted = true
    if (!mounted) return
    console.log(brands)
    // axios.get(`http://${process.env.REACT_APP_SERVER_ADDR}/get-content/carousel`)
    //   .then(res => setContent(res.data))
    //   .catch(err => alert('error occured'))
    axios.get(`http://${process.env.REACT_APP_SERVER_ADDR}/get-all/volvo`)
      .then(res => {
        console.log(res.data)
        setContent(res.data.slice(0, 5))
      })
      .catch(err => alert('error occured'))
    return () => mounted = false
  }, [])

  const itemTemplate = (element) => {
    return (
      // <div className="product-item">
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          component='img'
          src={element.images[Math.floor(Math.random() * (30 - 0 + 1) + 0)]}
          sx={{ width: '100%', height: '30vh' }}
          onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
        />
      </Box>
      // </div>
    )
  }

  return (
    <>
      <Grid item xs={12} sx={{ p: 2 }}>
        <Carousel
          value={content}
          numVisible={1}
          numScroll={1}
          className="custom-carousel"
          circular
          autoplayInterval={5000}
          itemTemplate={itemTemplate}
        />
      </Grid>
      <Grid item xs={12} sx={{ p: 2 }}>
        <Stack direction='row' spacing={2}>
          <Select
            labelId="brand-select"
            id="brand-select"
            label="Brand"
            value={searchParams.brand}
            onChange={(e) => setSearchParams(prev => ({ ...prev, brand: e.target.value }))}
          >
            {brands.map(brand => <MenuItem key={brand.brand} value={brand.brand}>{brand.brand}</MenuItem>)}
          </Select>
          <Select
            disable={searchParams.brand.length === 0}
            labelId="model-select"
            id="model-select"
            label="Model"
            value={searchParams.model}
            onChange={(e) => setSearchParams(prev => ({ ...prev, model: e.target.value }))}
          >
            {brands.find(brand => brand.brand === searchParams.brand) !== undefined 
            && 
            brands.find(brand => brand.brand === searchParams.brand).models.map(model => 
              <MenuItem key={model} value={model}>{model}</MenuItem>
            )}
          </Select>
          {JSON.stringify(searchParams)}
        </Stack>
      </Grid>
    </>

  )
}

export default HomePage