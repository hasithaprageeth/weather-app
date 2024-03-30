import "./Weather.css";

import search_icon from "../../assets/search.png";
import clear_icon from "../../assets/clear.png";
import cloud_icon from "../../assets/cloud.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";
import wind_icon from "../../assets/wind.png";
import humidity_icon from "../../assets/humidity.png";
import mist_icon from "../../assets/mist.png";
import drizzle_icon from "../../assets/drizzle.png";
import { useState } from "react";

const Weather = () => {
  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);
  const [isError, setIsError] = useState(false);

  const search = async () => {
    const searchBox = document.getElementsByClassName("search-input");
    if (searchBox[0].value === "") {
      return 0;
    }
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${
      searchBox[0].value
    }&appid=${import.meta.env.VITE_API_KEY}`;

    let response = await fetch(apiUrl);

    if (response.status == 404) {
      setIsError(true);
    } else {
      let data = await response.json();

      const city = document.getElementsByClassName("city");
      const temperature = document.getElementsByClassName("temp");
      let humidity = document.getElementsByClassName("humidity");
      let wind = document.getElementsByClassName("wind");

      city[0].innerHTML = data.name;
      temperature[0].innerHTML = Math.round(data.main.temp) + "°C";
      humidity[0].innerHTML = data.main.humidity + "%";
      wind[0].innerHTML = data.wind.speed + "km/h";

      if (data.weather[0].main == "Clouds") {
        setWeatherIcon(cloud_icon);
      } else if (data.weather[0].main == "Clear") {
        setWeatherIcon(clear_icon);
      } else if (data.weather[0].main == "Rain") {
        setWeatherIcon(rain_icon);
      } else if (data.weather[0].main == "Drizzle") {
        setWeatherIcon(drizzle_icon);
      } else if (data.weather[0].main == "Mist") {
        setWeatherIcon(mist_icon);
      } else if (data.weather[0].main == "Snow") {
        setWeatherIcon(snow_icon);
      } else {
        setWeatherIcon(clear_icon);
      }

      setIsError(false);
      searchBox[0].value = "";
    }
  };

  return (
    <div className="card">
      <div className="search">
        <input
          className="search-input"
          type="text"
          placeholder="Enter City Name"
          spellCheck="false"
        />
        <button
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="Search Icon" />
        </button>
      </div>
      <div className="error" style={{ display: isError ? "block" : "none" }}>
        <p>Invalid city name</p>
      </div>
      <div className="weather" style={{ display: isError ? "none" : "block" }}>
        <img className="weather-icon" src={weatherIcon} alt="Weather Icon" />
        <h1 className="temp">22°C</h1>
        <h2 className="city">New York</h2>
        <div className="details">
          <div className="col">
            <img src={humidity_icon} alt="Humidity Icon" />
            <div>
              <p className="humidity">50%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="Wind Icon" />
            <div>
              <p className="wind">15 Km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
