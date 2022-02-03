const { getItem, scanTable } = require('../DBActions');
const { queryParams,scanParams } = require('../mockData');
exports.getWord = async (req, res, next) => {
  try {
    const { word, pos } = req.params;
    const defenitions = await getItem(queryParams(word));
    if (defenitions.length === 0) return next(new Error(`no such word in db`));
    const res = { data: [] };
    for (let def of defenitions) {
      if (def.pos === pos) {
        res.data.push(def);
      }
    }
    if (res.data.length === 0) {
      return next(new Error('no part-of-speech for this word in db'));
    }
    return res.status(200).json(res);
  } catch (error) {
    next(error);
  }
};
exports.getWordsPos = async (req, res, next) => {
    try {
      const { word } = req.params;
      const defenitions = await getItem(queryParams(word));
      if (defenitions.length === 0) return next(new Error(`no such word in db`));
      const res = { data: [] };
      for (let def of defenitions) {
        if (!res.data.includes(def.pos)) {
          res.data.push(def.pos);
        }
      }
      if (res.data.length === 0) {
        return next(new Error('no part-of-speech for this word in db'));
      }
      return res.status(200).json(res);
    } catch (error) {
      next(error);
    }
  };

  exports.getRandword = async (req, res, next) => {
    try {
      const { pos } = req.params;
      //getting all defs from scan table
      const defenitions = await scanTable(scanParams);
      if (defenitions.length === 0) return next(new Error(`no word in db`));
      //filtering out all the defenitions that is not from pos
      const filtered = defenitions.filter(Object.keys(def => !Object.keys(def).includes(pos)));
      if (filtered.length === 0) return next(new Error(`no word in db with that pos`)); 
      //getting random word
      const rand = Math.floor(Math.random() * defenitions.length);
      res.data.push(filtered[rand]);
      return res.status(200).json({ data: filtered[rand] });
    } catch (error) {
      next(error);
    }
  };

