let city = document.getElementById("city");
let submit = document.getElementById("submit");
let icon = document.getElementById("icon");
let nameText = document.getElementById("name");
let actualText = document.getElementById("actual");
let humidityText = document.getElementById("humidity");
let windText = document.getElementById("wind");
let weatherStatusText = document.getElementById("status");
let cityText = "Barcelona"; // default city
let card = document.getElementsByClassName("card")[0];
let loading = document.getElementById("loading");

window.onload = () => {
  loadDefault();
};

const handleChange = (e) => {
  cityText = e.target.value;
};

const handleSubmit = (e) => {
  e.preventDefault();
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
const updateUI = (data) => {
  let cityName = data.name;
  let weatherStatus = data.weather[0].main;
  let w = window.innerWidth;
  let h = window.innerHeight;
  var img = new Image();

  img.addEventListener("load", () => {
    document.body.style.backgroundImage = `url(${img.src})`;
    nameText.innerText = `${data.name}`;
    actualText.innerText = `${Math.floor(data.main.temp)} °C`;
    humidityText.innerHTML = `<span class="material-symbols-outlined">
      humidity_percentage<p> ${Math.floor(data.main.humidity)} %</p>
      </span>`;
    windText.innerHTML = `<span class="material-symbols-outlined">
      air<p> ${Math.floor(data.wind.speed)}km/h </p>
      </span>`;
    icon.innerHTML = getIcon(weatherStatus);
    weatherStatusText.innerText = weatherStatus;
    city.value = "";

    card.classList.remove("hidden"); // reveal loaded weather data
    loading.classList.add("hidden"); // hide loading spinner
  });
  img.src = `https://source.unsplash.com/${w}x${h}/?${cityName}&${weatherStatus}`;
};

const loadDefault = () => {
  fetch(`http://localhost:3000/weather?city=${cityText}`)
    .then((response) => response.json())
    .then((data) => updateUI(data))
    .then((cityText = ""))
    .catch((err) => {
      console.log(err);
    });
};

const getIcon = (weatherStatus) => {
  let iconCode = "";
  weatherStatus = weatherStatus.toLowerCase();

  if (weatherStatus.includes("fog")) {
    iconCode = `<span id="tempIcon" class="material-symbols-outlined">
    foggy
    </span>`;
  } else if (weatherStatus.includes("mist")) {
    iconCode = `<span id="tempIcon" class="material-symbols-outlined">
    foggy
    </span>`;
  } else if (weatherStatus.includes("sun")) {
    iconCode = `<span id="tempIcon" class="material-symbols-outlined">
    sunny
    </span>`;
  } else if (weatherStatus.includes("rain")) {
    iconCode = `<span id="tempIcon" class="material-symbols-outlined">
    rainy
    </span>`;
  } else if (weatherStatus.includes("snow")) {
    iconCode = `<span id="tempIcon" class="material-symbols-outlined">
    snowy
    </span>`;
  } else if (weatherStatus.toLowerCase().includes("cloud")) {
    iconCode = `<span id="tempIcon" class="material-symbols-outlined">
    cloudy
    </span>`;
  } else if (weatherStatus.toLowerCase().includes("haze")) {
    iconCode = `<span id="tempIcon" class="material-symbols-outlined">
    dehaze
    </span>`;
  } else {
    iconCode = `<span id="tempIcon" class="material-symbols-outlined">
    sunny
    </span>`;
  }
  return iconCode;
};

city.addEventListener("change", handleChange);
submit.addEventListener("click", handleSubmit);
