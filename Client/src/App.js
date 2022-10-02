import './App.css'
import Cookies from 'js-cookie'
import React, {useState, useEffect} from 'react'
import { RoleContext } from './RoleContext'
import CustomRoutes from './Components/Routes'
import axios from 'axios'

const App = () => {

  const [authorized, setAuthorized] = useState(false)
  let [contextObject, setContextObject] = useState({})

  useEffect(() => {
    if(typeof Cookies.get('token') !== 'undefined'){
      let cookies = JSON.parse(Cookies.get('token'))
      axios.post(`http://${process.env.REACT_APP_SERVER_ADDR}/token-login`, cookies.token).then(response => {
        const responseJSON = JSON.parse(response.data)
        console.log(responseJSON)
        setContextObject({role: responseJSON.msg.role})
        if(responseJSON.msg.code === 200) setAuthorized(true)
      })
    }
  },[])

  return (
    <RoleContext.Provider value={contextObject}>
      <CustomRoutes/>
    </RoleContext.Provider>
  )
}

export default App
