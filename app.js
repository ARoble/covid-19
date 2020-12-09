const express = require("express");
const path = require("path");
const hbs = require("hbs");

const commaNumber = require("comma-number");
const covidStats = require("./utils/covidStats");
const countryFlag = require("./utils/countryFlag");

const app = express();

const publicPath = path.join(__dirname, "public");
const partialsPath = path.join(__dirname, "templates/partials");
const viewPath = path.join(__dirname, "templates");

app.set("view engine", "hbs");
app.set("views", viewPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  covidStats.covidStats(
    (
      error,
      { newCases, totalCases, totalDeaths, totalRecovered, message, date }
    ) => {
      if (error) {
        return res.send(error);
      }
      res.render("index", {
        newCases: commaNumber(newCases),
        totalCases: commaNumber(totalCases),
        totalDeaths: commaNumber(totalDeaths),
        totalRecovered: commaNumber(totalRecovered),
        message,
        date,
      });
    }
  );
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
  });
});

app.get("/api", (req, res) => {
  if (!req.query.country) {
    return res.send({
      Error: "Please provide an address",
    });
  }

  covidStats.byCountry(
    req.query.country,
    (error, { confirmed, deaths, recovered, active, date }) => {
      if (error) {
        res.send(error);
      }

      countryFlag(req.query.country, (error, data) => {
        res.send({
          data,
          confirmed: commaNumber(confirmed),
          deaths: commaNumber(deaths),
          recovered: commaNumber(recovered),
          active: commaNumber(active),
          flag: data,
        });
      });
    }
  );
});

app.use("/flag", (req, res) => {
  countryFlag((error, data) => {
    res.send({
      data,
    });
  });
});

app.listen(3000, () => {
  console.log("Port is running on port 3000");
});
