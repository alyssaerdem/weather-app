let city = document.getElementById("city");
let submit = document.getElementById("submit");
let icon = document.getElementById("icon");
let nameText = document.getElementById("name");
let actualText = document.getElementById("actual");
let feelsText = document.getElementById("feels");
let humidityText = document.getElementById("humidity");
let windText = document.getElementById("wind");
let cityText = "Amsterdam";

window.onload = () => {
  loadDefault();
};

handleChange = (e) => {
  cityText = e.target.value;
};

handleSubmit = (e) => {
  e.preventDefault();
  console.log(cityText);
  fetch(`http://localhost:3000/weather?city=${cityText}`)
    .then((response) => {
      if (response.status !== 200) {
        throw "An error occured. Please check your spelling and try again.";
      }
      return response.json();
    })
    .then((data) => updateUI(data))
    .catch((err) => {
      console.log(err);
      alert(err);
    });
};

updateUI = (data) => {
  console.log(data);
  let iconStatus = data.weather[0].main;
  let iconCode = data.weather[0].icon;
  let iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";

  nameText.innerText = data.name;
  actualText.innerText = `Temperature ${Math.floor(data.main.temp)} °C`;
  feelsText.innerText = `Feels like ${Math.floor(data.main.feels_like)} °C`;
  humidityText.innerText = `Humidity ${Math.floor(data.main.humidity)} %`;
  windText.innerText = `Wind speed ${Math.floor(data.wind.speed)} km/h`;
  icon.src = iconurl;

  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" +
    data.name +
    "&" +
    data.iconStatus +
    "')";
};

loadDefault = () => {
  fetch(`http://localhost:3000/weather?city=${cityText}`)
    .then((response) => response.json())
    .then((data) => updateUI(data))
    .then((cityText = ""))
    .catch((err) => {
      console.log(err);
    });
};

city.addEventListener("change", handleChange);
submit.addEventListener("click", handleSubmit);
