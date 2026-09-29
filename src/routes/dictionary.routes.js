const express =  require("express");

// import router from express to define routes
const router =  express.Router();

const {
  searchWord,
  addWord,
  seggestionWords
} = require('../controllers/dicitionary.controller')


// defined all routes 
router.get("/search/:word", searchWord);
router.get("/suggest/:prefixWord" , seggestionWords);
router.post('/words', addWord);

module.exports = router;