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

export default HomePage;

const content2 = [
  {
    "_id": {
      "timestamp": 1665002823,
      "counter": 73204,
      "randomValue1": 13114285,
      "randomValue2": -5021
    },
    "brand": "Volvo",
    "model": "260",
    "year": 2013,
    "gen": 4,
    "color": {
      "name": "DARKMAGENTA",
      "hex": "#8B008B"
    },
    "price": 12778,
    "bodyType": "Coupe",
    "mileage": 150571,
    "fuelType": "diesel",
    "VIN": "3GTP2WE32B4RWZZ5H",
    "transmission": "sequential",
    "images": [
      "https://images.unsplash.com/photo-1495397112255-e790bee720b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1515007901416-0b738ca9e0f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1555646283-5d0eecd84adf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwzfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1599834866654-76cee31c30c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw0fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1605647381739-9bba88b1c5d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw1fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1526478512290-5397e7d2ca6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw2fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1524847390379-2fb0cc1953a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw3fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1647887639815-9271a0a380b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw4fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1512772432849-f685f947c18f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw5fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1599834913612-e1afcef37547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1608926418601-0c6b00f46739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1611669980020-b23bd0f929cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1619772602509-c526dd4da14b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxM3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642482905821-1b9efdad58f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1583679037884-3ebe77889d8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642476229393-9dab5f44a2ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1610635974060-9284319ceac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxN3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1664188288368-92de235c947a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxOHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1569077216496-c002dd8d887d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxOXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1645884775774-a352ae3d503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642610136960-19ff93935252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1635841817484-aa6947a6208e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1635841817451-90df75c2a90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyM3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1626831374238-967d49762c5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1608050819323-87a1f3f617ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1617461573000-05d79e87e725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1557323137-bd6bd20fe022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyN3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1645884359860-f6258ae7d937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyOHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1504030980921-8ebcd4ca2ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyOXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1605821750756-946988f72f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwzMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080"
    ],
    "convenience": "Adaptive Cruise Control",
    "entertainment": "Premium Sound System",
    "safety": "Stability Control",
    "exterior": "Sunroof/Moonroof",
    "seating": "Leather Seats",
    "status": 0
  },
  {
    "_id": {
      "timestamp": 1665002823,
      "counter": 73205,
      "randomValue1": 13114285,
      "randomValue2": -5021
    },
    "brand": "Volvo",
    "model": "850",
    "year": 2017,
    "gen": 5,
    "color": {
      "name": "VIOLET",
      "hex": "#EE82EE"
    },
    "price": 53533,
    "bodyType": "Wagon",
    "mileage": 156084,
    "fuelType": "petrol",
    "VIN": "JA31W5FV9B5V0ULGV",
    "transmission": "auto",
    "images": [
      "https://images.unsplash.com/photo-1495397112255-e790bee720b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1515007901416-0b738ca9e0f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1555646283-5d0eecd84adf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwzfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1599834866654-76cee31c30c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw0fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1605647381739-9bba88b1c5d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw1fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1526478512290-5397e7d2ca6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw2fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1524847390379-2fb0cc1953a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw3fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1647887639815-9271a0a380b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw4fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1512772432849-f685f947c18f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw5fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1599834913612-e1afcef37547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1608926418601-0c6b00f46739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1611669980020-b23bd0f929cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1619772602509-c526dd4da14b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxM3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642482905821-1b9efdad58f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1583679037884-3ebe77889d8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642476229393-9dab5f44a2ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1610635974060-9284319ceac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxN3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1664188288368-92de235c947a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxOHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1569077216496-c002dd8d887d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxOXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1645884775774-a352ae3d503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642610136960-19ff93935252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1635841817484-aa6947a6208e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1635841817451-90df75c2a90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyM3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1626831374238-967d49762c5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1608050819323-87a1f3f617ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1617461573000-05d79e87e725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1557323137-bd6bd20fe022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyN3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1645884359860-f6258ae7d937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyOHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1504030980921-8ebcd4ca2ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyOXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1605821750756-946988f72f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwzMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080"
    ],
    "convenience": "Heated Seats",
    "entertainment": "Bluetooth",
    "safety": "Stability Control",
    "exterior": "Alloy Wheels",
    "seating": "Third Row Seating",
    "status": 0
  },
  {
    "_id": {
      "timestamp": 1665002823,
      "counter": 73206,
      "randomValue1": 13114285,
      "randomValue2": -5021
    },
    "brand": "Volvo",
    "model": "960",
    "year": 2021,
    "gen": 6,
    "color": {
      "name": "GREEN",
      "hex": "#008000"
    },
    "price": 10175,
    "bodyType": "Wagon",
    "mileage": 118559,
    "fuelType": "petrol",
    "VIN": "1G1ZT61N271ZYBRXG",
    "transmission": "auto",
    "images": [
      "https://images.unsplash.com/photo-1495397112255-e790bee720b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1515007901416-0b738ca9e0f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1555646283-5d0eecd84adf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwzfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1599834866654-76cee31c30c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw0fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1605647381739-9bba88b1c5d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw1fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1526478512290-5397e7d2ca6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw2fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1524847390379-2fb0cc1953a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw3fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1647887639815-9271a0a380b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw4fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1512772432849-f685f947c18f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw5fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1599834913612-e1afcef37547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1608926418601-0c6b00f46739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1611669980020-b23bd0f929cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1619772602509-c526dd4da14b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxM3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642482905821-1b9efdad58f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1583679037884-3ebe77889d8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642476229393-9dab5f44a2ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1610635974060-9284319ceac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxN3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1664188288368-92de235c947a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxOHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1569077216496-c002dd8d887d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxOXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1645884775774-a352ae3d503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642610136960-19ff93935252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1635841817484-aa6947a6208e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1635841817451-90df75c2a90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyM3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1626831374238-967d49762c5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1608050819323-87a1f3f617ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1617461573000-05d79e87e725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1557323137-bd6bd20fe022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyN3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1645884359860-f6258ae7d937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyOHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1504030980921-8ebcd4ca2ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyOXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1605821750756-946988f72f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwzMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080"
    ],
    "convenience": "Navigation System",
    "entertainment": "Bluetooth",
    "safety": "Backup Camera",
    "exterior": "Sunroof/Moonroof",
    "seating": "Third Row Seating",
    "status": 0
  },
  {
    "_id": {
      "timestamp": 1665002823,
      "counter": 73207,
      "randomValue1": 13114285,
      "randomValue2": -5021
    },
    "brand": "Volvo",
    "model": "960",
    "year": 2021,
    "gen": 6,
    "color": {
      "name": "GRAY",
      "hex": "#808080"
    },
    "price": 21133,
    "bodyType": "Hatchback",
    "mileage": 226807,
    "fuelType": "petrol",
    "VIN": "3MEHM07199XUK62MY",
    "transmission": "auto",
    "images": [
      "https://images.unsplash.com/photo-1495397112255-e790bee720b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1515007901416-0b738ca9e0f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1555646283-5d0eecd84adf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwzfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1599834866654-76cee31c30c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw0fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1605647381739-9bba88b1c5d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw1fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1526478512290-5397e7d2ca6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw2fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1524847390379-2fb0cc1953a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw3fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1647887639815-9271a0a380b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw4fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1512772432849-f685f947c18f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw5fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1599834913612-e1afcef37547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1608926418601-0c6b00f46739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1611669980020-b23bd0f929cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1619772602509-c526dd4da14b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxM3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642482905821-1b9efdad58f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1583679037884-3ebe77889d8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642476229393-9dab5f44a2ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1610635974060-9284319ceac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxN3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1664188288368-92de235c947a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxOHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1569077216496-c002dd8d887d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxOXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1645884775774-a352ae3d503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642610136960-19ff93935252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1635841817484-aa6947a6208e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1635841817451-90df75c2a90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyM3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1626831374238-967d49762c5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1608050819323-87a1f3f617ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1617461573000-05d79e87e725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1557323137-bd6bd20fe022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyN3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1645884359860-f6258ae7d937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyOHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1504030980921-8ebcd4ca2ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyOXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1605821750756-946988f72f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwzMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080"
    ],
    "convenience": "Navigation System",
    "entertainment": "Premium Sound System",
    "safety": "Brake Assist",
    "exterior": "Sunroof/Moonroof",
    "seating": "Third Row Seating",
    "status": 0
  },
  {
    "_id": {
      "timestamp": 1665002823,
      "counter": 73208,
      "randomValue1": 13114285,
      "randomValue2": -5021
    },
    "brand": "Volvo",
    "model": "XC70",
    "year": 2017,
    "gen": 5,
    "color": {
      "name": "LIGHTGREEN",
      "hex": "#90EE90"
    },
    "price": 24849,
    "bodyType": "Wagon",
    "mileage": 154397,
    "fuelType": "hybrid",
    "VIN": "1HGCG3256YFV0H2RK",
    "transmission": "sequential",
    "images": [
      "https://images.unsplash.com/photo-1495397112255-e790bee720b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1515007901416-0b738ca9e0f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1555646283-5d0eecd84adf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwzfHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1599834866654-76cee31c30c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw0fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1605647381739-9bba88b1c5d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw1fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1526478512290-5397e7d2ca6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw2fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1524847390379-2fb0cc1953a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw3fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1647887639815-9271a0a380b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw4fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1512772432849-f685f947c18f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHw5fHxWb2x2byUyMGNhcnxlbnwwfHx8fDE2NjQ5NzYzMTg&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1599834913612-e1afcef37547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1608926418601-0c6b00f46739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1611669980020-b23bd0f929cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxMnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1619772602509-c526dd4da14b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxM3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642482905821-1b9efdad58f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1583679037884-3ebe77889d8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642476229393-9dab5f44a2ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxNnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1610635974060-9284319ceac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxN3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1664188288368-92de235c947a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxOHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1569077216496-c002dd8d887d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwxOXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1645884775774-a352ae3d503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1642610136960-19ff93935252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1635841817484-aa6947a6208e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyMnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1635841817451-90df75c2a90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyM3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1626831374238-967d49762c5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1608050819323-87a1f3f617ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1617461573000-05d79e87e725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyNnx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1557323137-bd6bd20fe022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyN3x8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1645884359860-f6258ae7d937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyOHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1504030980921-8ebcd4ca2ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwyOXx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080",
      "https://images.unsplash.com/photo-1605821750756-946988f72f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjY4Nzd8MHwxfHNlYXJjaHwzMHx8Vm9sdm8lMjBjYXJ8ZW58MHx8fHwxNjY0OTc2MzE4&ixlib=rb-1.2.1&q=80&w=1080"
    ],
    "convenience": "Adaptive Cruise Control",
    "entertainment": "HomeLink",
    "safety": "Stability Control",
    "exterior": "Sunroof/Moonroof",
    "seating": "Memory Seat",
    "status": 0
  }
]