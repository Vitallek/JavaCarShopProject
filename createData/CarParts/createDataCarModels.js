const fs = require('fs')
const vinGenerator = require('vin-generator')
const amount = 150
const carsModelsPhotosAllData = JSON.parse(fs.readFileSync('./photos/carsPhotos.json'))
const carsModelsPhotosLinks = []
carsModelsPhotosAllData.forEach(brand => {
  let links = []
  brand.photos.results.forEach(el => {
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
const sedan = []
const wagon = []
const suv = []
const sport = []
const compact = []
const types = [
  {type: 'sedan', arr: sedan}, 
  {type: 'wagon', arr: wagon}, 
  {type: 'suv', arr: suv}, 
  {type: 'sport', arr: sport}, 
  {type: 'compact', arr: compact}, 
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
types.forEach(bodyType => {
  for(let i = 0; i < amount; i++){
    const randomBrandIndex = randomIntFromInterval(0,carsModels.length - 1)
    const randomModelIndex = randomIntFromInterval(0, carsModels[randomBrandIndex].models.length - 1)
    const brandPhotoObject = carsModelsPhotosLinks.find(el => el.brand === carsModels[randomBrandIndex].brand)
    if(typeof brandPhotoObject === 'undefined') continue
    const images = brandPhotoObject.photos
    const year = randomIntFromInterval(2000,new Date().getFullYear())
    let gen = 0
    let price = randomIntFromInterval(400,10000)
    let miles = randomIntFromInterval(200000,300000)
    for(tempYear = 2000; tempYear <= new Date().getFullYear(); tempYear+=4 ){
      if (tempYear > year) break;
      gen+= 1
      price = randomIntFromInterval(price,  price * 2)
      miles = miles - randomIntFromInterval(0,30000)
      if (miles < 0) miles = 0
    }
    bodyType.arr.push({
        brand: carsModels[randomBrandIndex].brand,
        model: carsModels[randomBrandIndex].models[randomModelIndex],
        year: year,
        gen: gen,
        color: colors[randomIntFromInterval(0, colors.length - 1)],
        price: price,
        bodyType: bodyType.type,
        mileage: miles,
        fuelType: fuelTypes[randomIntFromInterval(0, fuelTypes.length - 1)],
        VIN: vinGenerator.generateVin(),
        transmission: transmissions[randomIntFromInterval(0, transmissions.length - 1)],
        images: images,
        convenience: convenience[randomIntFromInterval(0, convenience.length - 1)],
        entertainment: entertainment[randomIntFromInterval(0, entertainment.length - 1)],
        safety: safety[randomIntFromInterval(0, safety.length - 1)],
        exterior: exterior[randomIntFromInterval(0, exterior.length - 1)],
        seating: seating[randomIntFromInterval(0, seating.length - 1)]
    })
  }
})
const result = [{
  brands: carsModels,
  sedan: sedan,
  wagon: wagon,
  sport: sport,
  compact: compact
}]
fs.writeFileSync('./result.json', JSON.stringify(result, null, '\t'))

const {MongoClient} = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017')
createDB = async () => {
  await client.connect()
  const db = client.db('Vehicles')
  const brandsColl = db.collection('Brands')
  const sedanColl = db.collection('Sedan')
  const wagonColl = db.collection('Wagon')
  const sportColl = db.collection('Sport')
  const compactColl = db.collection('Compact')
  brandsColl.drop()
  sedanColl.drop()
  wagonColl.drop()
  sportColl.drop()
  compactColl.drop()
  await brandsColl.insertMany(carsModels)
  await sedanColl.insertMany(sedan)
  await wagonColl.insertMany(wagon)
  await sportColl.insertMany(sport)
  await compactColl.insertMany(compact)
  client.close()
}
createDB()