import './LoadingScreen.css'
import { CircularProgress, Grid } from '@mui/material';

const LoadingScreen = ({loadingScreen}) => {

    return (
        <> 
            <Grid container className={`${loadingScreen}`} alignItems="center">
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <CircularProgress />
                </Grid>
            </Grid>
        </>
    )
}

export default LoadingScreen;
