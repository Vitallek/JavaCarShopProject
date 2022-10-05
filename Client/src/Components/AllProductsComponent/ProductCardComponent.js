import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MediaCard = ({element, elIndex}) => {
  return (
    <Card sx={{ maxWidth: 345, m:2 }}>
      <CardMedia
        component="img"
        height="140"
        image={element.images[elIndex]}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${element.brand} ${element.model} ${element.year}`}
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
        <Button size="small">Купить</Button>
      </CardActions>
    </Card>
  );
}
export default MediaCard