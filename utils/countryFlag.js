const request = require("request");

const countryFlag = (country, callback) => {
  const url = "https://restcountries.eu/rest/v2/name/" + country;
  console.log(country);
  request({ url, json: true }, (error, data) => {
    if (error) {
      callback(error, undefined);
    } else if (data.body.message) {
      callback(undefined, data.body.message);
    } else {
      callback(undefined, data);
    }
  });
};
// data.body[0].flag
module.exports = countryFlag;
