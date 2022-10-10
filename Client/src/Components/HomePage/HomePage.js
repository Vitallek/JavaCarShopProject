import { Button, Card } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import "primeflex/primeflex.css";
import { Carousel } from 'primereact/carousel';
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [content, setContent] = useState([])
  useEffect(() => {
    let mounted = true
    if (!mounted) return
    // axios.get(`http://${process.env.REACT_APP_SERVER_ADDR}/get-content/carousel`)
    //   .then(res => setContent(res.data))
    //   .catch(err => alert('error occured'))
    axios.get(`http://${process.env.REACT_APP_SERVER_ADDR}/get-all/volvo`)
      .then(res => setContent(res.data.slice(0, 5)))
      .catch(err => alert('error occured'))
    return () => mounted = false
  }, [])

  const itemTemplate = (element) => {
    return (
      // <div className="product-item">
        <Box sx={{display:'flex', justifyContent:'center'}}>
          <Box 
            component='img'
            src={element.image}
            sx={{width: '50%'}}
            onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
          />
        </Box>
      // </div>
    )
  }

  return (
    <Box sx={{ml:3, mt: 3}}>
      <Card>
        <Carousel
          value={content}
          numVisible={1}
          numScroll={1}
          className="custom-carousel"
          circular
          autoplayInterval={5000}
          itemTemplate={itemTemplate}
        />
      </Card>
    </Box>
  )
}

export default HomePage