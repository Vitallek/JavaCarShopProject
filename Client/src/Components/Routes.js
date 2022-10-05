import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import axios from 'axios';
import { Grid } from "@mui/material";
import ProtectedRoutes from "./ProtectedRoutes";
import NavComponent from './NavBars/NavComponent'
import { RoleContext } from "../RoleContext";
import HomePage from "./HomePage/HomePage";
import AllFromBrandComponent from "./AllProductsComponent/AllFromBrandComponent";
import HomePageUnauthorized from "./HomePage/HomePageUnauthorized";

const processBrandsList = (brands) => {
  const menu = []
  brands.forEach(brand => {
    menu.push({
      //   icon: <HomeRoundedIcon />,
      title: `${brand.brand} (${parseInt(Math.random() * 60)})`,
      to: `/vehicles/${brand.brand.replace(/ /g,'-')}`,
      items: []
    })
  })
  return menu
}

const CustomRoutes = ({}) => {
  const props = useContext(RoleContext)

  const [menu, setMenu] = useState(['Empty'])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    let mouted = true
    if(!mouted) return
    axios.get(`http://${process.env.REACT_APP_SERVER_ADDR}/get-all/brands`)
      .then(res => setBrands(res.data))
      .catch(err => alert('error occured'))
    return () => mouted = false
  },[])

  useEffect(() => {
    setMenu(processBrandsList(brands))
  }, [brands])
  return (
    <BrowserRouter>
      <Grid container flexWrap='nowrap'>
        <Grid item xs={2} sx={{ maxWidth: 250, minWidth: 216, height: '100%' }} className='navContainer'>
          <NavComponent menu={menu}/>
        </Grid>
        <Grid container item xs={9.5} direction='column' flexWrap='nowrap'>
          <Grid item xs={12} sx={{maxHeight: 50}}>
            top nav bar
          </Grid>
          <Grid item xs={12}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<HomePageUnauthorized />} />
              <Route path='/vehicles'>
                <Route path='/vehicles/:brand' element={<AllFromBrandComponent brands={brands}/>}/>
              </Route>
              {props.role === 'admin' ? <ProtectedRoutes/> : null}
            </Routes>
          </Grid>
        </Grid>
      </Grid>
    </BrowserRouter>
  )
}

export default CustomRoutes;
