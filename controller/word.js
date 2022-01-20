const { getItem } = require('../DBActions');
const { queryParams } = require('../mockData');
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
