const {
  readAllScores,
  readTopThree,
  readMostRecent,
  insertScore
} = require('./model.js');
const Promise = require('bluebird');

const handleResponse = (res, code, data) => res.status(code).send(data);
const handleError = (res, err) => res.status(500).send(err);

module.exports = {
  getAll(req, res) {
    let resObj = {};
    let promiseArray = [readAllScores(), readTopThree(), readMostRecent()];
    Promise.all(promiseArray)
      .then(data => {
        resObj.allScores = data[0].rows;
        resObj.topThree = data[1].rows;
        resObj.recent = data[2].rows;
        return handleResponse(res, 200, resObj);
      })
      .catch(err => console.log(err));
  },
  postScores(req, res) {
    console.log(req.body);
    let date = new Date();
    console.log(date.toUTCString());
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const d = new Date(date.getTime() - userTimezoneOffset);
    console.log(d.toString);
    req.body.date = d;
    console.log(req.body);
    insertScore(req.body)
      .then(result => handleResponse(res, 201, result.command))
      .catch(err => handleError(res, err));
  }
};