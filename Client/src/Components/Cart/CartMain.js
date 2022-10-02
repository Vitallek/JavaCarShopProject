import '../../App.css'
import React from 'react'
import NavComponent from '../NavSidebar/NavComponent';
import CartTable from './CartTable'

import {Grid, Typography} from '@mui/material'
import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto/400.css';

const CartMain = ({cart, setCart}) => {

  const category = createTheme({
    typography: {
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      fontSize: 15,
    },
  });
  
  return (
    <Grid container>
      <Grid item xs={1.7}>
        <NavComponent />
      </Grid>
      <Grid item container spacing={2} xs={10}>
        <Grid item xs={10}>
          <Typography variant="subtitle1"
            theme={category}
            sx={{
              ml: 3,
              mt: 3,
            }}>
            Корзина
          </Typography>
        </Grid>
        <Grid container item xs={12} sx={{p:2}}>
          <CartTable cart={cart} setCart={setCart}/>
        </Grid>
      </Grid>
    </Grid>
 )
}

export default CartMain;
