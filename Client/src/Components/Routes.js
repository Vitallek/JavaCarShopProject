import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { Grid } from "@mui/material";
import ProtectedRoutes from "./ProtectedRoutes";
import NavComponent from './NavBars/NavComponent'
import { RoleContext } from "../RoleContext";
import HomePage from "./HomePage/HomePage";

const processBrandsList = (brands) => {
  const menu = []
  brands.forEach(brand => {
    menu.push({
      //   icon: <HomeRoundedIcon />,
      title: brand.brand,
      to: `/${brand.brand}-all`,
      items: brand.models.map(model => ({
        //   icon: <HomeRoundedIcon />,
        title: model,
        to: `/${brand.model}-${brand.model}`,
        items: []
      }))
    })
  })
  console.log(menu)
  return menu
}

const CustomRoutes = ({}) => {
  const props = useContext(RoleContext)

  const [menu, setMenu] = useState(['Empty'])
  useEffect(() => {
    let mouted = true
    if(!mouted) return
    axios.get(`http://${process.env.REACT_APP_SERVER_ADDR}/get-all/brands`)
      .then(res => setMenu(processBrandsList(res.data)))
      .catch(err => alert('error occured'))
    return () => mouted = false
  },[])

  return (
    <BrowserRouter>
      <NavComponent menu={menu}/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/bodyKit" element={<AllProductsComponent type={'bodyKit'}/>} />
          <Route path="/wheels" element={<AllProductsComponent type={'wheels'}/>} />
          <Route path="/consumables" element={<AllProductsComponent type={'consumables'}/>} />
          <Route path="/calipers" element={<AllProductsComponent type={'calipers'}/>} /> */}
          {props.role === 'admin' ? <ProtectedRoutes/> : null}
        </Routes>
    </BrowserRouter>
    // <Grid container>
    //   <Grid item xs={1.7} sx={{minWidth: 168}} className='navContainer'>
    //     <NavComponent menu={menu}/>
    //   </Grid>
    //   <Grid item xs={10}>
    //     <Routes>
    //       <Route path="/" element={<HomePage />} />
    //       {/* <Route path="/bodyKit" element={<AllProductsComponent type={'bodyKit'}/>} />
    //       <Route path="/wheels" element={<AllProductsComponent type={'wheels'}/>} />
    //       <Route path="/consumables" element={<AllProductsComponent type={'consumables'}/>} />
    //       <Route path="/calipers" element={<AllProductsComponent type={'calipers'}/>} /> */}
    //       {props.role === 'admin' ? <ProtectedRoutes/> : null}
    //     </Routes> 
    //   </Grid>     
    // </Grid>
  );
};

export default CustomRoutes;
