const fs = require('fs')
// console.log(JSON.parse(fs.readFileSync('result.json')).length)
// return
const vinGenerator = require('vin-generator')
const carsModelsPhotosAllData = JSON.parse(fs.readFileSync('./photos/carsPhotos.json'))
const carsModelsPhotosLinks = []
carsModelsPhotosAllData.forEach(brand => {
  let links = []
  brand.photos.forEach(el => {
    links.push(el.urls.regular)
  })
  carsModelsPhotosLinks.push({
    brand: brand.brand,
    photos: links
  })
})
const carsModels = JSON.parse(fs.readFileSync('./carsModels.json'))
const colors = JSON.parse(fs.readFileSync('./colorsRaw.json'))
colors.forEach(el => {
  delete el.rgb
  delete el.families
})
const randomIntFromInterval = (min, max) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const types = [
  'Hatchback',
  'Sedan',
  'MUV/SUV',
  'Coupe',
  'Convertible',
  'Wagon',
  'Van',
  'Jeep'
]
const fuelTypes = ['petrol', 'diesel', 'electric', 'hybrid']
const transmissions = ['auto', 'manual', 'sequential']
const convenience = [
  'Adaptive Cruise Control',
  'Heated Seats',
  'Navigation System',
  'Remote Start'
]
const entertainment = [
  'Apple CarPlay/Android Auto',
  'Bluetooth',
  'HomeLink',
  'Premium Sound System'
]
const exterior = [
  'Alloy Wheels',
  'Sunroof/Moonroof'
]
const safety = [
  'Backup Camera',
  'Brake Assist',
  'Stability Control'
]
const seating = [
  'Leather Seats',
  'Memory Seat',
  'Third Row Seating'
]

const amount = 30
let result = []
carsModels.forEach((brand, brandIndex) => {
  const resultPerBrand = []
  for (let i = 0; i < amount; i++) {
    const randomModelIndex = randomIntFromInterval(0, carsModels[brandIndex].models.length - 1)
    const brandPhotoObject = carsModelsPhotosLinks.find(el => el.brand === carsModels[brandIndex].brand)
    if (typeof brandPhotoObject === 'undefined') continue
    const images = brandPhotoObject.photos
    const year = randomIntFromInterval(2000, new Date().getFullYear())
    let gen = 0
    let price = randomIntFromInterval(400, 10000)
    let miles = randomIntFromInterval(200000, 300000)
    for (tempYear = 2000; tempYear <= new Date().getFullYear(); tempYear += 4) {
      if (tempYear > year) break;
      gen += 1
      price = randomIntFromInterval(price, price * 2)
      miles = miles - randomIntFromInterval(0, 30000)
      if (miles < 0) miles = 0
    }
    resultPerBrand.push({
      brand: brand.brand,
      model: carsModels[brandIndex].models[randomModelIndex],
      year: year,
      gen: gen,
      color: colors[randomIntFromInterval(0, colors.length - 1)],
      price: price,
      bodyType: types[randomIntFromInterval(0, types.length - 1)],
      mileage: miles,
      fuelType: fuelTypes[randomIntFromInterval(0, fuelTypes.length - 1)],
      VIN: vinGenerator.generateVin(),
      transmission: transmissions[randomIntFromInterval(0, transmissions.length - 1)],
      images: images,
      convenience: convenience[randomIntFromInterval(0, convenience.length - 1)],
      entertainment: entertainment[randomIntFromInterval(0, entertainment.length - 1)],
      safety: safety[randomIntFromInterval(0, safety.length - 1)],
      exterior: exterior[randomIntFromInterval(0, exterior.length - 1)],
      seating: seating[randomIntFromInterval(0, seating.length - 1)],
      status: 0
    })
  }
  result.push({
    brand: brand.brand,
    data: resultPerBrand
  })
})
fs.writeFileSync('./result.json', JSON.stringify(result, null, '\t'))

const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://localhost:3002')
createDB = async () => {
  await client.connect()
  client.db('Vehicles').dropDatabase()
  const db = client.db('Vehicles')
  await db.collection('brands').insertMany(carsModels)
  for (const element of result) {
    // try {db.collection(element.brand.toLowerCase()).drop()} catch (error) {}
    const coll = db.collection(element.brand.toLowerCase().replace(/ /g,'-'))
    coll.createIndex({model:1})
    coll.createIndex({price:1})
    coll.createIndex({year:1})
    await coll.insertMany(element.data)
  }
  client.close()
}
createDB()