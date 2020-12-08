const request = require("request");
const dateFormat = require("dateformat");

const covidStats = (callback) => {
  const url = "https://api.covid19api.com/summary";

  request({ url, json: true }, (error, data) => {
    if (error) {
      callback("Unable to connect to the API fam", undefined);
    } else {
      callback(undefined, {
        newCases: data.body.Global.NewConfirmed,
        totalCases: data.body.Global.TotalConfirmed,
        totalDeaths: data.body.Global.TotalDeaths,
        totalRecovered: data.body.Global.TotalRecovered,
        message: data.body.Message,
        date: dateFormat(data.body.Date, "fullDate"),
      });
    }
  });
};

// const allData = (callback) => {
//   const url = "https://api.covid19api.com/countries";

//   request({ url, json: true }, (error, data) => {
//     callback(undefined, data);
//   });
// };

const byCountry = (country, callback) => {
  const url = "https://api.covid19api.com/total/country/" + country;

  request({ url, json: true }, (error, data) => {
    //console.log(data.body.message);
    if (error) {
      callback("error connecting to server", undefined);
    } else if (data.body.message) {
      callback(data.body, undefined);
    } else {
      callback(undefined, {
        confirmed: data.body[data.body.length - 1].Confirmed,
        deaths: data.body[data.body.length - 1].Deaths,
        recovered: data.body[data.body.length - 1].Recovered,
        active: data.body[data.body.length - 1].Active,
        date: data.body[data.body.length - 1].Date,
      }),
        console.log(data.body[data.body.length - 1].Country);
    }
  });
};

module.exports.covidStats = covidStats;
module.exports.byCountry = byCountry;
