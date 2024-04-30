const express = require("express");
const router = express.Router();
const genres = require("../genres/genres");
const country = require("../country/country");
const  User = require("../auth/user");
const  Film = require("../Films/Film");
const Rate = require("../Rates/Rates");

router.get("/", async (req, res) => {
  const options = {}
  const genreModel = await genres.findOne({key : req.query.genre})
  if(genreModel){
    options.genre = genreModel._id
    res.locals.genre = req.query.genre
  }
  let page = 0
  const limit = 3
  if(req.query.page && req.query.page > 0){
    page = req.query.page
  }
  if(req.query.search && req.query.search.length > 0){
    options.$or = [
      {
        titleRus: new RegExp(req.query.search , 'i')
      },
      {
        titleEng: new RegExp(req.query.search , 'i')
      }
    ]
    res.locals.search = req.query.search
  }

  const totalFilms = await Film.countDocuments(options)
  const allgenres = await genres.find()
  const films = await Film.find(options).limit(limit).skip(page * limit).populate('genre').populate('country')
  const user = req.user ? await User.findById(req.user._id) : {}
  res.render("index", { genres: allgenres, user,films, pages : Math.ceil(totalFilms / limit)});
});

router.get("/login", (req, res) => {
  res.render("login", { user: req.user ? req.user : {} });
});

router.get("/register", (req, res) => {
  res.render("register", { user: req.user ? req.user : {} });
});

router.get('/profile/:id', async(req, res) =>{
    const allgenres = await genres.find()
    const user = await User.findById(req.params.id).populate('toWatch')
    .populate({path: 'toWatch', populate: {path: 'country'}})
    .populate({path: 'toWatch', populate: {path: 'genre'}})
    if(user){
      res.render("profile", {genres: allgenres, user: user, loginUser: req.user})
    }
})

router.get('/admin/:id', async(req, res) =>{
  const allgenres = await genres.find()
  const user = await User.findById(req.params.id)
  const films = await Film.find().populate('country').populate('genre').populate('author')
  res.render("adminProfile", {genres: allgenres, loginUser: req.user ? req.user: {} , user: user , films: films})
})

router.get('/new', async(req, res) =>{
    const allgenres = await genres.find()
    const allcountries = await country.find()
    res.render("newFilm", {genres: allgenres, countries: allcountries, user: req.user ? req.user: {}})
})

router.get('/edit/:id', async(req, res) =>{
    const allgenres = await genres.find()
    const allcountries = await country.find()
    const film = await Film.findById(req.params.id)
    res.render("editFilm", {genres: allgenres, countries: allcountries, user: req.user ? req.user: {}, film})
})
router.get('/not-found', (req, res) => {
  res.render("notFound")
})

router.get('/detail/:id', async(req, res) => {
  const rates = await Rate.find({filmId: req.params.id}).populate('authorId')
  let averageRate = 0;
  for(let i = 0; i < rates.length; i++){
    averageRate+= rates[i].rate
  }
  const film = await Film.findById(req.params.id).populate('country').populate('genre')
  res.render("detail", {user: req.user ? req.user : {}, film: film, rates: rates, averageRate: (averageRate / rates.length).toFixed(1)})
})

module.exports = router;
