"use strict";

const myButton = document.querySelector("button");
const actGps = document.getElementById("gps");
const rain = document.getElementById("lluvia");
const cloud = document.getElementById("nublado");
const clear = document.getElementById("despejado");
const snow = document.getElementById("nieve");
const myTime = document.createElement("p");
const myP = document.createElement("p");
const prueba = document.querySelector("section.prueba");
const thunderstorm = document.getElementById("tormenta");
const mist = document.getElementById("neblina");
const myBody = document.querySelector("body");
const myTemp = document.createElement("p");
const myUl = document.querySelector("ul");
const imgNube = (document.createElement("img").src =
  "./Recursos/G.3.nublado-animacion.gif");
const imgLuna = (document.createElement("img").src =
  "./Recursos/G.1.1luna-animacion.gif");
const imgSol = (document.createElement("img").src =
  "./Recursos/G.1.sol-animacion.gif");
const imgPocasNubes = (document.createElement("img").src =
  "./Recursos/G.2.pocas-nubes-animacion.gif");
const imgLluvia = (document.createElement("img").src =
  "./Recursos/G.4.lluvia-animacion.gif");
const imgTormenta = (document.createElement("img").src =
  "./Recursos/G.6.tormenta-animacion.gif");
const imgNieve = (document.createElement("img").src =
  "./Recursos/G.7.nieve-animacion.gif");
const imgNiebla = (document.createElement("img").src =
  "./Recursos/G.8.niebla-animacion.gif");

const sol = document.getElementById("sol");
const luna = document.getElementById("luna");
const now = new Date().toLocaleString("es-ES", {
  timeStyle: "short",
  dateStyle: "long",
});
const succes = async (pos) => {
  const lat = await pos.coords.latitude;
  const lon = await pos.coords.longitude;
  fetchData(lat, lon);
  currentWeatherData(lat, lon);
};

async function fetchData(lat, lon) {
  const key = "5ac175d2902db4555e70111f79332e19";
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,daily&appid=${key}`;
  const resp = await fetch(url);
  const data = await resp.json();
  weatherData(data);
  backgroundDiaNoche(data);
}

const currentWeatherData = async (lat, lon) => {
  const key = "5ac175d2902db4555e70111f79332e19";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
  const resp = await fetch(url);
  const data = await resp.json();
  myP.textContent = ` ${data.name}`;
  let clima = data.weather;
  console.log(data);
  for (const datos of clima) {
    myTemp.textContent = `${datos.temp}`;
    myTime.textContent = `${now}`;
    const hora = new Date(data.dt * 1000).getHours();
    if (hora > 7 && hora < 20) {
      sol.removeAttribute("hidden");
    } else {
      luna.removeAttribute("hidden");
    }
    switch (datos.main) {
      case "Clouds":
        cloud.prepend(myTime),
          cloud.append(myP),
          cloud.removeAttribute("hidden");
        break;
      case "Rain":
      case "Drizzle":
        rain.prepend(myTime), rain.append(myP), rain.removeAttribute("hidden");
        break;
      case "Clear":
        clear.prepend(myTime),
          clear.append(myP),
          clear.removeAttribute("hidden");
        break;
      case "Snow":
        snow.prepend(myTime), snow.append(myP), snow.removeAttribute("hidden");
        break;
      case "Thunderstorm":
        thunderstorm.prepend(myTime),
          thunderstorm.append(myP),
          thunderstorm.removeAttribute("hidden");
        break;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
        mist.prepend(myTime);
        mist.append(myP);
        mist.removeAttribute("hidden");
        break;
    }
  }
};
const weatherData = async (data) => {
  // console.log(data);

  for (const horas of [data.hourly.slice(1, 9)]) {
    console.log(horas);
    //Se coloca la hora que horá y la temperaturá que habrá a esa hora
    const newWeathers = horas.map((clima) => {
      return {
        hora: new Date(clima.dt * 1000).toLocaleString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temp: clima.temp,
        meteo: clima.weather.map((el) => el.main),
      };
    });

    listWeather(newWeathers);
  }
};

const listWeather = async (newWeather) => {
  const arrayHTMLweather = newWeather.map((clima) => {
    return `
    <li>
    <p>${clima.hora}</p>
    <img src="${imgNube}">
    <p>${clima.temp}º</p>`;
  });
  myUl.innerHTML = `<ul>${arrayHTMLweather.join("")}</ul>`;
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
  carrusel.removeAttribute("hidden");
  actGps.classList.remove("activo");
};

myButton.addEventListener("click", handleClickButton);
