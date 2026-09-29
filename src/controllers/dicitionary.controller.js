const Word = require("../models/word.model");

// Add word function
const addWord = async (req, res) => {
  try {
    //  extract work from request body that sent by user
    const { word } = req.body;

    // validation
    if (!word) {
      return res.status(400).json({
        message: "word is required",
      });
    }

    const convertWord = word.trim().toLowerCase();

    // check id word is alredy present in database
    const existingWord = await Word.findOne({
      word: convertWord,
    });

    if (existingWord) {
      return res.status(400).json({
        message: "word already exists",
      });
    }
    // create a entry in database with frequency
    const validWord = await Word.create({
      word: convertWord,
      frequency: 1,
    });

    return res.status(201).json({
      message: "word added  successfully",
      word: validWord.word,
      frequency: validWord.frequency,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

//  search word function
const searchWord = async (req, res) => {
  try {
    // extract word from params
    const { word } = req.params;

    if (!word) {
      return res.status(400).json({
        message: "Word is required",
      });
    }

    const validWord = word.trim().toLowerCase();

    //  find the word in database and increase the frequency by 1
    const result = await Word.findOneAndUpdate(
      { word: validWord },
      { $inc: { frequency: 1 } },
      { new: true },
    );

    //  validation if result not found in database
    if (!result) {
      return res.status(400).json({
        result: "not found",
      });
    }
    // return response with found and word data
    return res.status(201).json({
      result: "Found",
      word: validWord,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "something went wrong",
    });
  }
};

//  word suggestions function

const seggestionWords = async (req, res) => {
  try {
    // extract url from params
    const {prefixWord} = req.params;
    // get k from parameter 
    const k = parseInt(req.query.k);

    //  validation prefix
    if(!prefixWord){
       return res.status(400).json({
        message:"prefix Word is required",
       });
    }
     
    //  validate k if is not found or less thamn zero
    if(!k || k <= 0){
      return res.status(401).json({
        message:"k must be a positive number"
      });
    }
    //  trim extra spaces and convert into lower case
    const validPrefixWord = prefixWord.trim().toLowerCase();
      
    // mongodb query that word must be start with the starting word of parameter
     const words =  await Word.find({
       word:{
         $regex: `^${escapeRegex(validPrefixWord)}`,
         $options:"i",
       }
     }).sort({
       frequency:-1,
       word:1,
     }).limit(k).select("word -_id");

     const suggestions = words.map((item) => item.word);

     return res.json(suggestions);

  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

// protect from special charcters 
const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}; 

module.exports = {
  addWord,
  searchWord,
  seggestionWords,
};
