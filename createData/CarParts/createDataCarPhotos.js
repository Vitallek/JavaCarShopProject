const axios = require('axios')
const axiosConfig = (query) => {
    return {
        method: 'get',
        url: `https://api.unsplash.com/search/photos?query=${query}&per_page=30&page=1`,
        headers: {
            'Authorization': 'Client-ID QmOcgkOnjiOK3jwyuiPOk3BA8rIVDtnskS73GnXJRK8',
            'Cookie': 'ugid=98ffbccdf78370197a591a0e5115b0b35547002'
        }
    }
}
const fs = require('fs')
const carsModels = JSON.parse(fs.readFileSync('./carsModels.json'))
let result = []
let i = 0
setInterval(function () {
    if(i===carsModels.length) {
        clearInterval(this)
        return
    }
    axios(axiosConfig(carsModels[i].brand)).then(res => {
        result.push({
            brand: carsModels[i].brand,
            photos: res.data
        })
        fs.writeFile('./photos/carsPhotos.json', JSON.stringify(result, null, '\t'), () => {})
    }).catch(err => {
        clearInterval(this)
        console.log(err)
    })
    console.log(carsModels[i].brand)
    i++
},1000)
