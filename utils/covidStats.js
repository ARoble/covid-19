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

module.exports = covidStats;
