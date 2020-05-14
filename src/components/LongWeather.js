import React, { Component } from 'react';
import './LongWeather.css'

import showerRain from '../img/weatherIcons/showerRain.png'
import fewClouds from '../img/weatherIcons/fewClouds.png'
import rain from '../img/weatherIcons/rain.png'
import scatteredClouds from '../img/weatherIcons/scatteredClouds.png'
import snow from '../img/weatherIcons/snow.png'
import thunderstorm from '../img/weatherIcons/thunderstorm.png'
import brokenClouds from '../img/weatherIcons/brokenClouds.png'
import clearSky from '../img/weatherIcons/clearSky.png'
import mist from '../img/weatherIcons/mist.png'

const shortDaysName = ["NIEDZ", "PON", "WT", "ŚR", "CZW", "PT", "SOB"]

class LongWeather extends Component {


  showWeatherIcon = (icon) => {

    if (icon === "01d" || icon === "01n") return <img src={clearSky} alt="ikona pogody" />
    else if (icon === "02d" || icon === "02n") return <img src={fewClouds} alt="ikona pogody" />
    else if (icon === "03d" || icon === "03n") return <img src={scatteredClouds} alt="ikona pogody" />
    else if (icon === "04d" || icon === "04n") return <img src={brokenClouds} alt="ikona pogody" />
    else if (icon === "09d" || icon === "09n") return <img src={showerRain} alt="ikona pogody" />
    else if (icon === "10d" || icon === "10n") return <img src={rain} alt="ikona pogody" />
    else if (icon === "11d" || icon === "11n") return <img src={thunderstorm} alt="ikona pogody" />
    else if (icon === "13d" || icon === "13n") return <img src={snow} alt="ikona pogody" />
    else if (icon === "50d" || icon === "50n") return <img src={mist} alt="ikona pogody" />
    else return <span>brak ikony</span>
  }

  render() {
    const daysArray = [...this.props.weather.daysArray];
    // if (daysArray.length > 4) daysArray = daysArray.splice(1);
    const nightsArray = [...this.props.weather.nightsArray];
    // if (nightsArray.length > 4) nightsArray = nightsArray.splice(0, 4);

    const forecast = daysArray.map((day, index) => {
      const dayNumber = new Date(daysArray[index].dt_txt).getDay()
      const maxTemp = (day.main.temp < 0 && day.main.temp > -0.5) ? 0 : day.main.temp.toFixed()
      const minTemp = (nightsArray[index].main.temp < 0 && nightsArray[index].main.temp > -0.5) ? 0 : nightsArray[index].main.temp.toFixed()
      return (
        <div className="content" key={day.dt}>
          <p className="day" >{shortDaysName[dayNumber]}</p>
          <div className="smallIcon">{this.showWeatherIcon(day.weather[0].icon)}</div>
          <p className="temp">
            <span className="max">{maxTemp}&deg;</span>/
            <span className="min">{minTemp}&deg;C</span>
          </p>
        </div>
      )
    })
    return (
      <>
        {forecast}
      </>
    )
  }
}
export default LongWeather

