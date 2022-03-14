"use strict";

const myButton = document.querySelector("button");

const rain = document.getElementById("lluvia");
const cloud = document.getElementById("nublado");
const sun = document.getElementById("sol");
const cloudy = document.getElementById("cloudy");
const myPosition = document.createElement("p");

const succes = (pos) => {
  const lat = /* pos.coords.latitude;  */ 41.9038123;
  const lon = /*  pos.coords.longitude; */ -8.8746549;
  console.log(lat, lon);
  const key = "5ac175d2902db4555e70111f79332e19";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=es`
  )
    .then((response) => response.json())
    .then((data) => {
      let tiempo = data.weather;
      console.log(data);
      myPosition.textContent = `Te ubicas en ${data.name}`;
      cloud.append(myPosition);
      for (const datos of tiempo) {
        if (datos.main == "Clouds") {
          cloud.removeAttribute("hidden");
        } else if (datos.main == "Rain") {
          rain.removeAttribute("hidden");
        } else if (datos.main == "Sun") {
          sun.removeAttribute("hidden");
        } else if (datos.main == "Cloudy") {
          cloudy.removeAttribute("hidden");
        }
      }
    })
    .catch((error) => console.error(error));
};

const error = (error) => {
  console.error(error);
};
const options = {
  enableHighAccuracy: true,
  timeout: 50000,
  maximumAge: 0,
};
const handleClickButton = () => {
  const geolocation = navigator.geolocation;
  geolocation.getCurrentPosition(succes, error, options);
};

myButton.addEventListener("click", handleClickButton);
