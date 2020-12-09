// document.getElementById("searchTable").style.display = "none";
const message = document.querySelector("#message");
const searchForm = document.querySelector("form");
const search = document.querySelector("#country");

document.querySelector("table").style.display = "none";

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  fetch("http://localhost:3000/api?country=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message.textContent = data.error;
      } else {
        document.querySelector("table").style.display = "block";
        message.textContent = data.Country;
        document.querySelector("#searchActive").textContent = data.active;
        document.querySelector("#searchConfirmed").textContent = data.confirmed;
        document.querySelector("#searchDeath").textContent = data.deaths;
        document.querySelector("#searchRecovered").textContent = data.recovered;
        document.getElementById("flag").src = data.flag;
        console.log(data);
      }
    });
  });
});
