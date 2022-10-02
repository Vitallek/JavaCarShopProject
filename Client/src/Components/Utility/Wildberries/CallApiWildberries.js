import axios from "axios";

export const PrintSupply = (url) => {
  return axios.get(url, {responseType: "arraybuffer"}).then((res) => {
    return res.data
  }).catch((err) => console.log(err))
}

export const PrintSupplyStickers = (url) => {
  return axios.get(url, {responseType: "arraybuffer"}).then((res) => {
    return res.data
  }).catch((err) => console.log(err))
}

export const PrintInvoiceDocument = (url) => {
  return axios.get(url).then((res) => {
    return res.data
  }).catch((err) => console.log(err))
}

export const getWbWarehouseConfig = (url) => {
  return axios.get(url).then((res) => {
    return res.data
  }).catch((err) => console.log(err))
}

export const updateWbWarehouseConfig = (url, config) => {
  return axios.post(url, {
    config: config
  }).then((res) => {
    return res.data
  }).catch((err) => console.log(err))
}

export const saveFile = (url, data) => {
  return axios.post(url, data).then(res => {
    console.log(res)
    if (res.status === 200) {
      Notification.requestPermission().then(() => {
        const notification = new Notification('Уведомление', {
          body: res.data, 
          tag: 'fileUpload'}
        )
          setTimeout(() => {
            notification.close()
        }, 3000);
      })
    }
  }).catch(err => console.log(err))
}

export const getFinOrdersList = (url) => {
  return axios.get(url).then(res => {
    return res.data
  })
} 

export const GetSTC_Report = (url, data) => {
  return axios.post(url, data).then(res => {
    return res.data
  })
} 

const CallApiWildberries = (method, url, proxy, data) => {

  const axiosConfig = {
    method: method,
    //we use proxy-server to avoid CORS errors
    url: proxy,
    //and passing our url as param
    params: {
      url: url,
    },
    headers: {
      'Content-Type': "application/json; charset=utf-8",
      "Accept": "application/json"
    },
    data: {
      data: data,
    }
  }
  
  return axios(axiosConfig).then((res) => {
    return res.data
  }).catch((err) => console.log(err))
}

export default CallApiWildberries
