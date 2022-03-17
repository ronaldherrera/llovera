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

//Formateo de hora del dispositivo. De timestamp a horas
function time(time) {
  let secs = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  secs = secs < 10 ? "0" + secs : secs;
  return `${hours}:${minutes}:${secs}`;
}

//Función que accede a la latitud y longitud del sistema. A su vez, accede a la API de openweathermap
const succes = (pos) => {
  const lat = /* pos.coords.latitude; */ 41.9038123;
  const lon = /* pos.coords.longitude; */ -8.8746549;
  console.log(pos);
  const ahora = pos.timestamp + 1000 * 60 * 60;
  const enOchoHoras = ahora + 8 * 1000 * 60 * 60;
  //Esto guardarlo en localStorage
  const key = "5ac175d2902db4555e70111f79332e19";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,daily&appid=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const now = data.current.dt; //Se recoge la hora actual
      const sunset = data.current.sunset; //Se recogen los datos del amanecer para poner el modo noche
      console.log(now);
      if (now <= sunset) {
        myBody.classList = "day";
      } else {
        myBody.classList = "night";
      }
      for (const horas of data.hourly.slice(8, 9)) {
        let clima = horas.weather.map((el) => el.main);
        console.log(horas.dt);
        //Se coloca la hora que horá y la temperaturá que habrá a esa hora
        myTime.textContent = `A las ${time(enOchoHoras)}`;
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
    })

    .catch((error) => console.error(error));
};

//Mostrar el error en caso de que algo falle
const error = (error) => {
  console.error(error);
};

//Se crean opciones de proximidad para obtener la posición mas acertada posible
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

//Se accede a la geolocalización a través del navegador
const handleClickButton = () => {
  const geolocation = navigator.geolocation;
  geolocation.getCurrentPosition(succes, error, options);
  actGps.classList.remove("activo");
};
//Se crea el evento con el botón
myButton.addEventListener("click", handleClickButton);
