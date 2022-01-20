const express = require("express");
const router = express.Router();
const { getWordsPos, getWord, getRandword} = require("../controller/word");

router.get("/part-of-speech/:part", getRandword);
router.get("/:word/:pos", getWord);
router.get("/:word", getWordsPos);





module.exports = router;
