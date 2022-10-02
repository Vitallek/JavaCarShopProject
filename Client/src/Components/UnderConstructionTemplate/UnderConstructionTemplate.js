import React from 'react'
import { Grid } from '@mui/material'
import NavComponent from '../NavSidebar/NavComponent'
import {ReactComponent as UnderConstructionSVG} from './underConstruction.svg'

const UnderConstructionTemplate = () => {

  return (
    <Grid container>
      <Grid item xs={1.7}>
        <NavComponent />
      </Grid>
      <Grid container item xs={10}>
        <UnderConstructionSVG/>
      </Grid>
    </Grid>
  )
}

export default UnderConstructionTemplate
