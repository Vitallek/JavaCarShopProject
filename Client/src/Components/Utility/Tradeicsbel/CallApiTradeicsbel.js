import axios from "axios";

const CallApiTradeicsbel = (method, url, proxy) => {

  const axiosConfig = {
    method: method,
    //we use proxy-server to avoid CORS errors
    url: proxy,
    //and passing our url as param
    params: {
      url: url,
    },
    // headers: { 
    //   "PRIVATE-TOKEN": process.env.REACT_APP_PRIVATE_TOKEN, 
    //   headers: {
    //     'Content-Type': "application/json; charset=utf-8",
    //     "Accept": "application/json"
    //   },
    // }
  };
  return axios(axiosConfig).then((res) => {
    return res.data
  }).catch((err) => console.log(err))
}

export default CallApiTradeicsbel