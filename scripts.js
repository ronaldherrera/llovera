"use strict";

const myButton = document.querySelector("button");
const actGps = document.getElementById("gps");
const rain = document.getElementById("lluvia");
const cloud = document.getElementById("nublado");
const clear = document.getElementById("sol");
const snow = document.getElementById("nieve");
const myTime = document.createElement("p");
const myP = document.createElement("p");
const prueba = document.querySelector("section.prueba");
const thunderstorm = document.getElementById("tormenta");
const mist = document.getElementById("neblina");
const myBody = document.querySelector("body");

const succes = async (pos) => {
  const lat = await pos.coords.latitude;
  const lon = await pos.coords.longitude;
  fetchData(lat, lon);
};
async function fetchData(lat, lon) {
  const key = "5ac175d2902db4555e70111f79332e19";
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,daily&appid=${key}`;
  const resp = await fetch(url);
  const data = await resp.json();
  weatherData(data);
  backgroundDiaNoche(data);
  dataBase(data);
}

const dataBase = async (data) => {};
const weatherData = async (data) => {
  // console.log(data);
  const now = new Date(data.current.dt * 1000).toLocaleString("es-ES", {
    timeStyle: "short",
    dateStyle: "long",
  });
  for (const horas of data.hourly.slice(8, 9)) {
    console.log(horas);
    let clima = horas.weather.map((el) => el.main);
    console.log(horas.dt);
    //Se coloca la hora que horá y la temperaturá que habrá a esa hora
    myTime.textContent = `El día ${now}`;
    myP.textContent = `Habrá una temperatura media de ${horas.temp}ºC`;
    //Se incluye todas las condiciones climaticas que activan o deshabilitan cada section dependiendo del clima
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
};

const backgroundDiaNoche = async (data) => {
  const hora = new Date(data.current.dt * 1000).getHours();
  if (hora > 7 && hora < 20) {
    myBody.classList.remove("noche");
    myBody.classList.add("dia");
  } else {
    myBody.classList.remove("dia");
    myBody.classList.add("noche");
  }
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
