const express = require("express");
const path = require("path");
const hbs = require("hbs");
const commaNumber = require("comma-number");
const covidStats = require("./utils/covidStats");

const app = express();

const publicPath = path.join(__dirname, "public");
const partialsPath = path.join(__dirname, "templates/partials");
const viewPath = path.join(__dirname, "templates");

app.set("view engine", "hbs");
app.set("views", viewPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  covidStats(
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

app.listen(3000, () => {
  console.log("Port is running on port 3000");
});
