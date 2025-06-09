let apiKey = "1e200d672c7b77a615e933bd43b6cb81";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

let searchCity = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
let weatherIcon = document.querySelector(".weatherIcon img");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Store original values from HTML
const originalCity = document.querySelector(".city").innerHTML;
const originalTemp = document.querySelector(".temp").innerHTML;
const originalHumidity = document.querySelector(".humidity").innerHTML;
const originalWind = document.querySelector(".wind").innerHTML;
const originalIconSrc = weatherIcon.src;

// Function to restore original values
function restoreOriginalValues() {
  document.querySelector(".city").innerHTML = originalCity;
  document.querySelector(".temp").innerHTML = originalTemp;
  document.querySelector(".humidity").innerHTML = originalHumidity;
  document.querySelector(".wind").innerHTML = originalWind;
  weatherIcon.src = originalIconSrc;
  weatherIcon.style.display = "block";
  document.querySelector(".error").style.display = "none";
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function checkWeather(city) {
  let response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    // document.querySelector(".weather").style.display = "block";
    weatherIcon.style.display = "block";
    weatherIcon.src = "./images/bubu-dudu-sseeyall.gif";
  } else {
    let data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    }
    document.querySelector(".error").style.display = "none";
    // document.querySelector(".weather").style.display = "block";
    weatherIcon.style.display = "block";
  }
}
searchBtn.addEventListener("click", () => {
  restoreOriginalValues();
  checkWeather(searchCity.value);
});
