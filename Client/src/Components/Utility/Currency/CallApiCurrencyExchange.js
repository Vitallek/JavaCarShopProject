import axios from "axios";

export const CallApiCurrencyExchange = (symbol) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://${process.env.REACT_APP_SERVER_ADDR}/get-nbrb-exchange?symbol=${symbol}`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}