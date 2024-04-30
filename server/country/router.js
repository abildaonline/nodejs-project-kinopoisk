const express = require('express')
const router = express.Router();
const writeDatacountry = require('./seed')

const {getAllcountries} = require('./controller')

router.get('/api/country', getAllcountries)
writeDatacountry()

module.exports = router
