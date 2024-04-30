const country = require('./country')

const getAllcountries = async(req, res) => {
    const data = await country.find();
    res.status(200).send({data})
}

module.exports = {
    getAllcountries
}