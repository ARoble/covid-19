const request = require("request");

const url = "https://restcountries.eu/rest/v2/name/france";

const countryFlag = (callback) => {
  request({ url, json: true }, (error, data) => {
    callback(undefined, data.body[0].flag);
  });
};
module.exports = countryFlag;
