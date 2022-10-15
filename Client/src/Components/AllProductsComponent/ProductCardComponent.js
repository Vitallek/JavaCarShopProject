import {useContext, useEffect, useState, useRef} from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import { UserInfoContext } from '../../UserInfoContext';
import { Toast } from 'primereact/toast';

const MediaCard = ({buyVehicle,element, elIndex}) => {
  const userInfoContext = useContext(UserInfoContext)
  const [cardStatus, setCardStatus] = useState(0)
  const toast = useRef(null)
  useEffect(() => {
    if(cardStatus === 1){
      setTimeout(() => {
        setCardStatus(2)
      }, 3000);
    }
  }, [cardStatus])
  return (
    <Card sx={{ maxWidth: 345, m:2 }}>
      <Toast ref={toast} />
      <CardMedia
        component="img"
        height="140"
        image={element.images[elIndex]}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${element.brand} ${element.model} ${element.year} - ${element.price}$`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`
          - Color - ${element.color.name}
          - Transmission - ${element.transmission}
          - ${element.entertainment}
          - ${element.convenience}
          - ${element.fuelType}
          - ${element.safety}
          - ${element.seating}
          `}
        </Typography>
      </CardContent>
      <CardActions>
        {cardStatus === 0 && 
        <Button 
          size="small" 
          onClick={() => {
            if(userInfoContext.auth === false) {
              toast.current.show({severity:'error', summary: 'Ошибка', detail:'Пожалуйста, авторизуйтесь', life: 3000});
              return
            }
            setCardStatus(1)
            buyVehicle(element, setCardStatus)
          }} 
        >
          Купить
        </Button>}
        {cardStatus === 1 && 
        <LoadingButton  
          loading
          size="small" 
        >
          Купить
        </LoadingButton >}
        {cardStatus === 2 && 
        <Button  
          disabled
          size="small" 
        >
          Купить
        </Button >}
      </CardActions>
    </Card>
  );
}
export default MediaCard