/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import "../index.css";
import { GiSunrise } from "react-icons/gi";
import { GiSunset } from "react-icons/gi";
import { WiStrongWind } from "react-icons/wi";
import { WiThermometerExterior } from "react-icons/wi";
import { WiThermometer } from "react-icons/wi";
import { WiWindDeg } from "react-icons/wi";
import { useEffect, useState } from "react";

export default function MainInfo({
  country,
  city,
  temp,
  icon,
  skyType,
  wind,
  windSpeed,
  maxTemp,
  minTemp,
  sunrise,
  sunset,
  setCurPosition,
  degree,
}) {
  const curDate = new Date().toLocaleDateString();
  const [sunriseTime, setSunriseTime] = useState(null);
  const [sunsetTime, setSunsetTime] = useState(null);

  useEffect(() => {
    const minutes = new Date(sunrise * 1e3).getMinutes();
    const hours = new Date(sunrise * 1e3).getHours();
    setSunriseTime(
      (sunriseTime) =>
        (sunriseTime = `${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }`)
    );
  }, [sunrise]);

  useEffect(() => {
    const minutes = new Date(sunset * 1e3).getMinutes();
    const hours = new Date(sunset * 1e3).getHours();
    setSunsetTime(
      (sunsetTime) =>
        (sunsetTime = `${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }`)
    );
  }, [sunset]);

  let windDirection;
  if (wind > 11.25 && wind <= 33.75) {
    windDirection = "N/NE";
  } else if (wind > 33.75 && wind <= 56.25) {
    windDirection = "NE";
  } else if (wind > 56.25 && wind <= 78.75) {
    windDirection = "E/NE";
  } else if (wind > 78.75 && wind <= 101.25) {
    windDirection = "E";
  } else if (wind > 101.25 && wind <= 123.75) {
    windDirection = "E/SE";
  } else if (wind > 123.75 && wind <= 146.25) {
    windDirection = "SE";
  } else if (wind > 146.25 && wind <= 168.75) {
    windDirection = "S/SE";
  } else if (wind > 168.75 && wind <= 191.25) {
    windDirection = "S";
  } else if (wind > 191.25 && wind <= 213.75) {
    windDirection = "S/SW";
  } else if (wind > 213.75 && wind <= 236.25) {
    windDirection = "SW";
  } else if (wind > 236.25 && wind <= 258.75) {
    windDirection = "W/SW";
  } else if (wind > 258.75 && wind <= 281.25) {
    windDirection = "W";
  } else if (wind > 281.25 && wind <= 303.75) {
    windDirection = "W/NW";
  } else if (wind > 303.75 && wind <= 326.25) {
    windDirection = "NW";
  } else if (wind > 326.25 && wind <= 348.75) {
    windDirection = "N/NW";
  } else {
    windDirection = "N";
  }

  return (
    <div className="dayInfo ">
      <div className="cityInfo">
        <h1 className="city">{city ? city : country}</h1>
        <p>{city ? country : ""}</p>
        <p>{curDate}</p>
      </div>

      <div className="curTemp">
        <p className="temperature">
          {(degree == "celsius"
            ? temp - 273.15
            : (temp - 273.15) * 1.8 + 32
          ).toFixed(1)}{" "}
          <span className="degree"> {degree == "celsius" ? "°C" : "°F"}</span>
        </p>
        <p>{skyType}</p>
        <img src={`../../public/imgs/${icon}@2x.png`} />
      </div>
      <div className="weatherContainer">
        <p className="weatherInfo">
          <WiThermometer className="icon" />{" "}
          {(degree == "celsius"
            ? maxTemp - 273.15
            : (maxTemp - 273.15) * 1.8 + 32
          ).toFixed(1)}
          {degree == "celsius" ? "°C" : "°F"}
        </p>
        <p className="weatherInfo">
          <WiThermometerExterior className="icon" />{" "}
          {(degree == "celsius"
            ? minTemp - 273.15
            : (minTemp - 273.15) * 1.8 + 32
          ).toFixed(1)}{" "}
          {degree == "celsius" ? "°C" : "°F"}
        </p>
      </div>
      <div className="weatherContainer">
        <p className="weatherInfo">
          <WiStrongWind className="icon" /> {windSpeed}
        </p>
        <p className="weatherInfo">
          {" "}
          <WiWindDeg className="icon" /> {windDirection}
        </p>
      </div>
      <div className="weatherContainer">
        <p className="weatherInfo">
          <GiSunrise className="icon" /> {sunriseTime}
        </p>
        <p className="weatherInfo">
          <GiSunset className="icon" /> {sunsetTime}
        </p>
      </div>
      <button className="positionBtn" onClick={setCurPosition}>
        Current location
      </button>
    </div>
  );
}
