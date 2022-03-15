"use strict";

const myButton = document.querySelector("button");
const actGps = document.getElementById("gps");
const rain = document.getElementById("lluvia");
const cloud = document.getElementById("nublado");
const clear = document.getElementById("sol");
const cloudy = document.getElementById("cloudy");
const myPosition = document.createElement("p");
const thunderstorm = document.getElementById("tormenta");
const mist = document.getElementById("neblina");

const succes = (pos) => {
  console.log(pos);
  const lat = /* pos.coords.latitude; */ 41.9038123;
  const lon = /* pos.coords.longitude; */ -8.8746549;
  console.log(lat, lon);
  const key = "5ac175d2902db4555e70111f79332e19";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,daily&appid=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (const horas of data.hourly.slice(0, 9)) {
        let tiempo = horas.weather;
        for (const datos of tiempo) {
          console.log(datos);
          if (datos.main == "Clouds") {
            cloud.append(myPosition);
            cloud.removeAttribute("hidden");
          } else if (datos.main == "Rain" || datos.main == "Drizzle") {
            rain.append(myPosition);
            rain.removeAttribute("hidden");
          } else if (datos.main == "Clear") {
            clear.append(myPosition);
            clear.removeAttribute("hidden");
          } else if (datos.main == "Cloudy") {
            cloudy.append(myPosition);
            cloudy.removeAttribute("hidden");
          } else if (datos.main == "Thunderstorm") {
            thunderstorm.append(myPosition);
            thunderstorm.removeAttribute("hidden");
          } else if (
            datos.main == "Mist" ||
            datos.main == "Smoke" ||
            datos.main == "Haze" ||
            datos.main == "Dust" ||
            datos.main == "Fog" ||
            datos.main == "Sand" ||
            datos.main == "Ash" ||
            datos.main == "Squall" ||
            datos.main == "Tornado"
          ) {
            mist.append(myPosition);
            mist.removeAttribute("hidden");
          }
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
  timeout: 5000,
  maximumAge: 0,
};
const handleClickButton = () => {
  const geolocation = navigator.geolocation;
  geolocation.getCurrentPosition(succes, error, options);
  console.log(geolocation);
  actGps.classList.remove("activo");
};

myButton.addEventListener("click", handleClickButton);
