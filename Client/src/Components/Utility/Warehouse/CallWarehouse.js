import axios from "axios";

export const GetWarehouse = (url) => {
  return axios.get(url).then((res) => {
      return res.data
  }).catch((err) => console.log(err))
}

export const GetLogs = (url) => {
  return axios.get(url).then(response => {
    return response.data
  }).catch((err) => console.log(err))
  // return axios.get(url).then((res) => {
  //     return res.data
  // }).catch((err) => console.log(err))
}

export const UpdateWarehouse = (url, modifiedWarehouse, msg) => {
  return axios.post(url, {
    modifiedWarehouse: modifiedWarehouse,
    msg: msg
  }).then((res) => {
      return res.data
  }).catch((err) => console.log(err))
}

export const PrintBox = (url, boxNumber) => {
  return axios.get(url, {responseType: "arraybuffer", params: { boxNumber: boxNumber }}).then((res) => {
    return res.data
  }).catch((err) => console.log(err))
}