"use strict";

const myButton = document.querySelector("button");
const actGps = document.getElementById("gps");
const rain = document.getElementById("lluvia");
const cloud = document.getElementById("nublado");
const clear = document.getElementById("sol");
const snow = document.getElementById("nieve");
const myTime = document.createElement("p");
const myP = document.createElement("p");
const thunderstorm = document.getElementById("tormenta");
const mist = document.getElementById("neblina");
const myBody = document.querySelector("body");

function time(time) {
  let secs = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  secs = secs < 10 ? "0" + secs : secs;
  return `${hours}:${minutes}:${secs}`;
}
const succes = (pos) => {
  const lat = /* pos.coords.latitude; */ 41.9038123;
  const lon = /* pos.coords.longitude; */ -8.8746549;
  console.log(pos);
  const key = "5ac175d2902db4555e70111f79332e19";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,daily&appid=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const now = data.current.dt;
      const sunset = data.current.sunset;
      console.log(now);
      if (now >= sunset) {
        myBody.classList = "day";
      } else {
        myBody.classList = "night";
      }
      for (const horas of data.hourly.slice(8, 9)) {
        let clima = horas.weather.map((el) => el.main);
        console.log(horas.dt);
        myTime.textContent = `A las ${time(horas.dt - now)}`;
        myP.textContent = `Habrá una temperatura media de ${horas.temp}ºC`;

        if (clima == "Clouds") {
          cloud.prepend(myTime);
          cloud.append(myP);
          cloud.removeAttribute("hidden");
        } else if (clima == "Rain" || clima == "Drizzle") {
          rain.prepend(myTime);
          rain.append(myP);
          rain.removeAttribute("hidden");
        } else if (clima == "Clear") {
          clear.prepend(myTime);
          clear.append(myP);
          clear.removeAttribute("hidden");
        } else if (clima == "Snow") {
          snow.prepend(myTime);
          snow.append(myP);
          snow.removeAttribute("hidden");
        } else if (clima == "Thunderstorm") {
          thunderstorm.prepend(myTime);
          thunderstorm.append(myP);
          thunderstorm.removeAttribute("hidden");
        } else if (
          clima == "Mist" ||
          clima == "Smoke" ||
          clima == "Haze" ||
          clima == "Dust" ||
          clima == "Fog" ||
          clima == "Sand" ||
          clima == "Ash" ||
          clima == "Squall" ||
          clima == "Tornado"
        ) {
          mist.prepend(myTime);
          mist.append(myP);
          mist.removeAttribute("hidden");
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
  actGps.classList.remove("activo");
};

myButton.addEventListener("click", handleClickButton);
