import axios from "axios";

export const GetCart = (url, username) => {
    return axios.get(url, {
        params: {
            username: username,
        }
    }).then((res) => {
        return res.data
    }).catch((err) => console.log(err))
}

export const UpdateCart = (url, username, cart) => {
    return axios.put(url, {
        cart: cart,
        username: username
    }).then((res) => {
        return res.data
    }).catch((err) => console.log(err))
}