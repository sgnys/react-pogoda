import React from 'react';

import './Result.css';
import LongWeather from './LongWeather'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan, faTint, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'


import showerRain from '../img/weatherIcons/showerRain.png'
import fewClouds from '../img/weatherIcons/fewClouds.png'
import rain from '../img/weatherIcons/rain.png'
import scatteredClouds from '../img/weatherIcons/scatteredClouds.png'
import snow from '../img/weatherIcons/snow.png'
import thunderstorm from '../img/weatherIcons/thunderstorm.png'
import brokenClouds from '../img/weatherIcons/brokenClouds.png'
import clearSky from '../img/weatherIcons/clearSky.png'
import mist from '../img/weatherIcons/mist.png'
import clearSkyNight from '../img/weatherIcons/clearSkyNight.png'
import thunderstormNight from '../img/weatherIcons/thunderstormNight.png'
import fewCloudsNight from '../img/weatherIcons/fewCloudsNight.png'
import rainNight from '../img/weatherIcons/rainNight.png'
import scatteredCloudsNight from '../img/weatherIcons/scatteredCloudsNight.png'
import showerRainNight from '../img/weatherIcons/showerRainNight.png'
import snowNight from '../img/weatherIcons/snowNight.png'
import brokenCloudsNight from '../img/weatherIcons/brokenCloudsNight.png'
import mistNight from '../img/weatherIcons/mistNight.png'

const Result = (props) => {
  const { pressure, city, bigIcon, description, err, value, date, time, sunrise, sunset, temp, wind, humidity } = props.weather

  const firstLetter = description.substr(0, 1).toUpperCase()
  const text = description.substr(1)
  const newDescription = firstLetter + text

  const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString() // w API sunrise jest bez milisekund, aby prawidłowo zadziałała metoda toLocaleTimeString () musimy mieć wartość w milisekundach.
  const sunsetTime = new Date(sunset * 1000).toLocaleTimeString()
  let src = "";

  switch (bigIcon) {
    case "01d": src = clearSky
      break;
    case "01n": src = clearSkyNight
      break;
    case "02d": src = fewClouds
      break;
    case "02n": src = fewCloudsNight
      break;
    case "03d": src = scatteredClouds
      break;
    case "03n": src = scatteredCloudsNight
      break;
    case "04d": src = brokenClouds
      break;
    case "04n": src = brokenCloudsNight
      break;
    case "09d": src = showerRain
      break;
    case "09n": src = showerRainNight
      break;
    case "10d": src = rain
      break;
    case "10n": src = rainNight
      break;
    case "11d": src = thunderstorm
      break;
    case "11n": src = thunderstormNight
      break;
    case "13d": src = snow
      break;
    case "13n": src = snowNight
      break;
    case "50d": src = mist
      break;
    case "50n": src = mistNight
      break;
    default:
      console.log("ikona nie została odnaleziona")
      break;
  }

  let content = null
  if (city) {
    content = (
      <div className="wrap">
        <div className="cityName">
          <p>{city.toUpperCase()}</p>
          <div className="wind">
            <FontAwesomeIcon icon={faFan} spin />
            <span className="windValue">{(wind * 3.6).toFixed()} km/h</span>
          </div>
        </div>

        <div className="mainWeather">
          <div className="left">

            <div className="date">
              <p>{date}</p>
            </div>
            <div className="time">
              <p>{time}</p>
            </div>
            <div className="parameters">
              <span className="humidity">
                <FontAwesomeIcon icon={faTint} />
                {humidity} %
                </span>
              <span className="hPa">
                <FontAwesomeIcon icon={faTachometerAlt} />
                {pressure} hPa
                </span>
              <p className="sun">Wschód słońca: <span className="sunrise">{sunriseTime}</span>
                Zachód słońca: <span className="sunset">{sunsetTime}</span>
              </p>
            </div>
          </div>

          <div className="right">
            <div className="icon">
              <p>{temp.toFixed(1)} &deg;C</p>
              <img src={src} alt="" />
            </div>
            <div className="description">
              <p>{newDescription}</p>
            </div>
          </div>
        </div>

        <div className="longWeather">
          <LongWeather weather={props.weather} />
        </div>

        <div className="update">
        </div>
      </div>
    )
  }


  return (
    <div>
      {err ? <strong>{`Nie ma w bazie szukanego miasta "${value}"`}</strong> : content}
    </div>
  );
}

export default Result;