"use strict";

const myButton = document.getElementById("boton");
const mySection = document.querySelector("section");
const text = document.querySelector("p");
const succes = (pos) => {
  const lat = pos.coords.latitude; /* 41.9038123; */
  const lon = pos.coords.longitude; /* -8.8746549; */
  console.log(lat, lon);
  const key = "5ac175d2902db4555e70111f79332e19";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${key}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let tiempo = data.minutely;
      for (const datos of tiempo) {
        let horas = datos.dt.toTimeString();
        console.log(horas);
      }
      /* for (const datos of tiempo) {
        text.textContent = datos.main;
        mySection.append(text); */
      //   }
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
}; /*  */

myButton.addEventListener("click", handleClickButton);
