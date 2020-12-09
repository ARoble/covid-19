const request = require("request");

const countryFlag = (country, callback) => {
  const url = "https://restcountries.eu/rest/v2/name/" + country;
  request({ url, json: true }, (error, data) => {
    callback(undefined, data.body[0].flag);
  });
};
module.exports = countryFlag;
