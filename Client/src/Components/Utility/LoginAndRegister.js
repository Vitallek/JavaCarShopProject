import axios from "axios";

export const LogIn = (url, username, password) => {

  return axios.get(url, {
    params: {
      username: username.toLowerCase(),
      password: password,
    }}).then((res) => {
    return res.data
  }).catch((err) => console.log(err))
}

export const Register = (url, username, password) => {

  return axios.post(url, {
    credentials: {
      username: username.toLowerCase(),
      password: password,
  }}).then((res) => {
    return res.data
  }).catch((err) => console.log(err))
}