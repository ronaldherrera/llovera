"use strict";
export { currentWeatherData, weatherData, backgroundDiaNoche, fetchData };
const myForm = document.querySelector("form");
const mySearch = document.querySelector("input#location");
const myBody = document.querySelector("body");
const mySection = document.querySelector("section.clima");
const myCarrusel = document.querySelector("section#carrusel");
const imgNube = (document.createElement("img").src =
  "./Recursos/G.3.nublado-animacion.gif");
const imgLuna = (document.createElement("img").src =
  "./Recursos/G.1.1luna-animacion.gif");
const imgSol = (document.createElement("img").src =
  "./Recursos/G.1.sol-animacion.gif");
const imgLlovizna = (document.createElement("img").src =
  "./Recursos/G.4.lluvia-animacion.gif");
const imgLluvia = (document.createElement("img").src =
  "./Recursos/G.4.lluvia-animacion.gif");
const imgTormenta = (document.createElement("img").src =
  "./Recursos/G.6.tormenta-animacion.gif");
const imgNieve = (document.createElement("img").src =
  "./Recursos/G.7.nieve-animacion.gif");
const imgNiebla = (document.createElement("img").src =
  "./Recursos/G.8.niebla-animacion.gif");
const now = new Date().toLocaleString("es-ES", {
  timeStyle: "short",
  dateStyle: "long",
});
const actGps = document.getElementById("gps");

const key = "5ffc44f30e5179f5e6420ea84b83cb9a";
const currentWeatherData = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  const resp = await fetch(url);
  const data = await resp.json();
  currentWeather(data);
};
const currentWeather = async (data) => {
  let clima = data.weather;
  let temp = Math.round(data.main.temp);
  let position = data.name;
  const hora = new Date(data.dt * 1000).getHours();
  const arrayCurrentWeather = clima.map((el) => {
    switch (el.main) {
      //despejado
      case "Clear":
        if (hora > 7 && hora < 20) {
          //dia despejado
          return `<h1>${now}</h1>
            <h2>${position}</h2>
            <h4>${temp}º</h4>
            <img src="${imgSol}">
            <p>El cielo está despejado, azul como el mar</p>
            `;
          //noche despejada
        } else {
          return `<h1>${now}</h1>
            <h2>${position}</h2>
            <h4>${temp}º</h4>
            <img src="${imgLuna}">
            <p>El cielo está despejado, mira que estrellas!!</p>`;
        }
      //nublado
      case "Clouds":
        return `<h1>${now}</h1>
            <h2>${position}</h2>
            <h4>${temp}º</h4>
            <img src="${imgNube}">
            <p>El cielo esta nublado, por lo menos no llueve.</p>`;
      //llovizna
      case "Drizzle":
        return `<h1>${now}</h1>
            <h2>${position}</h2>
            <h4>${temp}º</h4>
            <img src="${imgLlovizna}">
            <p>Está lloviznando, cala bobos lo llaman...</p>`;
      //lluvia
      case "Rain":
        return `<h1>${now}</h1>
            <h2>${position}</h2>
            <h4>${temp}º</h4>
            <img src="${imgLluvia}">
            <p>Está lloviendo, como no te tapes "tivamojah"</p>`;
      //nieve
      case "Snow":
        return `<h1>${now}</h1>
            <h2>${position}</h2>
            <h4>${temp}º</h4>
            <img src="${imgNieve}">
            <p>¡Que ilusion! ¡Esta nevando!</p>`;
      //tormenta
      case "Thunderstorm":
        return `<h1>${now}</h1>
            <h2>${position}</h2>
            <h4>${temp}º</h4>
            <img src="${imgTormenta}">
            <p>¡¡TORMENTA!! No</p>`;
      //tormenta2
      case "Squall":
        return `<h1>${now}</h1>
            <h2>${position}</h2>
            <h4>${temp}º</h4>
            <img src="${imgTormenta}">
            <p>¡¡TORMENTA!! No</p>`;
      //niebla
      case "Mist":
        return `<h1>${now}</h1>
            <h2>${position}</h2>
            <h4>${temp}º</h4>
            <img src="${imgNiebla}">
            <p>Hay niebla, mira por donde pisas</p>`;
      //niebla2
      case "Fog":
        return `<h1>${now}</h1>
            <h2>${position}</h2>
            <h4>${temp}º</h4>
            <img src="${imgNiebla}">
            <p>Hay niebla, mira por donde pisas</p>`;
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Sand":
      case "Ash":
      case "Tornado":
    }
  });
  mySection.innerHTML = arrayCurrentWeather.join("");
};
const weatherData = async (data) => {
  for (const horas of [data.hourly.slice(1, 9)]) {
    const newWeathers = horas.map((clima) => {
      return {
        hora: new Date(clima.dt * 1000).toLocaleString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temp: Math.round(clima.temp),
        meteo: clima.weather.map((el) => el.main).join(),
      };
    });
    listWeather(newWeathers);
  }
};

const listWeather = async (newWeathers) => {
  const hora = new Date(newWeathers.dt * 1000).getHours();
  const arrayHTMLweather = newWeathers.map((clima) => {
    switch (clima.meteo) {
      //despejado
      case "Clear":
        if (hora > 7 && hora < 20) {
          //dia despejado
          return ` <li>
          <img src="${imgSol}">
          <h5>${clima.temp}º</h5>
          <h5>${clima.hora}</h5>`;
          //noche despejada
        } else {
          return ` <li>
          <img src="${imgLuna}">
          <h5>${clima.temp}º</h5>
          <h5>${clima.hora}</h5>`;
        }
      //nublado
      case "Clouds":
        return ` <li>
          <img src="${imgNube}">
          <h5>${clima.temp}º</h5>
          <h5>${clima.hora}</h5>`;
      //llovizna
      case "Drizzle":
        return ` <li>
          <img src="${imgLlovizna}">
          <h5>${clima.temp}º</h5>
          <h5>${clima.hora}</h5>`;
      //lluvia
      case "Rain":
        return ` <li>
          <img src="${imgLluvia}">
          <h5>${clima.temp}º</h5>
          <h5>${clima.hora}</h5>`;
      //nieve
      case "Snow":
        return ` <li>
          <img src="${imgNieve}">
          <h5>${clima.temp}º</h5>
          <h5>${clima.hora}</h5>`;
      //tormenta
      case "Thunderstorm":
        return ` <li>
          <img src="${imgTormenta}">
          <h5>${clima.temp}º</h5>
          <h5>${clima.hora}</h5>`;
      //tormenta2
      case "Squall":
        return ` <li>
          <img src="${imgTormenta}">
          <h5>${clima.temp}º</h5>
          <h5>${clima.hora}</h5>`;
      //niebla
      case "Mist":
        return ` <li>
          <img src="${imgNiebla}">
          <h5>${clima.temp}º</h5>
          <h5>${clima.hora}</h5>`;
      //niebla2
      case "Fog":
        return ` <li>
          <img src="${imgNiebla}">
          <h5>${clima.temp}º</h5>
          <h5>${clima.hora}</h5>`;
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Sand":
      case "Ash":
      case "Tornado":
    }
  });
  myCarrusel.innerHTML = `<ul>${arrayHTMLweather.join("")}</ul>`;
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
async function fetchData(lat, lon) {
  const key = "5ffc44f30e5179f5e6420ea84b83cb9a";
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,daily&appid=${key}`;
  const resp = await fetch(url);
  const data = await resp.json();
  weatherData(data);
  backgroundDiaNoche(data);
}
const getCoordsCity = async (city) => {
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
  );
  const data = await resp.json();
  const lat = data.coord.lat;
  const lon = data.coord.lon;
  console.log(data);
  fetchData(lat, lon);
  currentWeatherData(lat, lon);
};

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(mySearch.value);
  getCoordsCity(mySearch.value);
  actGps.style.display = "none";
});
