const genres = require('./genres')

const getAllgenres = async(req, res) =>{
    const data = await genres.find()
    res.send({data})
}

module.exports = {getAllgenres}
