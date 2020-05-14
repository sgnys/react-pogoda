import React, {
  Component
} from 'react';
import './App.css';
import Form from './Form'
import Result from './Result'

const ApiKeyCurrentWeather = "6270a08038197d804b4e5f37eb3729ba";
const ApiKeyForecastWeather = "a3c80a9a7c718fdf83b1899283b37514"
const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piatek", "Sobota"]
const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"]

class App extends Component {

  state = {
    value: "",
    date: "",
    time: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    humidity: "",
    feelsLike: "",
    description: "",
    bigIcon: "",
    isSubmitted: false,
    err: false,
    daysArray: [],
    nightsArray: [],
  }

  handleInputCityChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  handleCitySearch = (e) => {
    e.preventDefault()
    this.setState(prevState => ({
      isSubmitted: true
    }))

    if (this.state.value) {
      const APICurrentWeather = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${ApiKeyCurrentWeather}&units=metric&lang=pl`

      fetch(APICurrentWeather)
        .then(response => {
          if (response.ok) {
            return response
          } else {
            throw Error(response.status)
          }
        })
        .then(response => response.json())
        .then(data => {
          const dayName = days[new Date().getDay()]
          const dayNumber = new Date().getDate()
          const month = months[new Date().getMonth()]
          const year = new Date().getFullYear()
          const date = `${dayName}, ${dayNumber > 9 ? dayNumber : "0" + dayNumber} ${month} ${year}`
          const hour = new Date().getHours()
          const minutes = new Date().getMinutes()
          const time = `${hour > 9 ? hour : "0" + hour} : ${minutes > 9 ? minutes : "0" + minutes}`

          this.setState((prevState) => ({
            value: "",
            date,
            time,
            city: prevState.value,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            pressure: data.main.pressure,
            description: data.weather[0].description,
            wind: data.wind.speed, //m/s
            humidity: data.main.humidity, //wilgotność
            feelsLike: data.main.feels_like, //odczuwalna temp
            bigIcon: data.weather[0].icon,
            err: false,
          }))
        })
        .catch(err => {
          console.log(err + " nie połączono z  " + APICurrentWeather)
          this.setState(prevState => ({
            err: true,
          }))
        })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isSubmitted) {

      const APIForecastWeather = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.value}&appid=${ApiKeyForecastWeather}&units=metric&lang=pl`

      if (this.state.value) {
        fetch(APIForecastWeather)
          .then(response => {
            if (response.ok) {
              return response
            } else {
              throw Error(response.status)
            }
          })
          .then(response => response.json())
          .then(data => {
            let dayNumber = new Date().getDate()
            dayNumber = dayNumber > 9 ? dayNumber : "0" + dayNumber

            let nextDaysArray = data.list.filter(el => (el.dt_txt.includes("15:00:00") && new Date(el.dt_txt).getDate() !== dayNumber)) //ważne
            console.log("days", nextDaysArray)
            nextDaysArray.splice(4)
            console.log("days", nextDaysArray)
            let nextNightsArray = data.list.filter(el => (el.dt_txt.includes("03:00:00") && new Date(el.dt_txt).getDate() !== dayNumber))
            console.log("nights", nextNightsArray)
            nextNightsArray.splice(4)
            console.log("nights", nextNightsArray)

            this.setState(prevState => ({
              isSubmitted: false,
              daysArray: nextDaysArray,
              nightsArray: nextNightsArray,
            }))
          })
          .catch(err => {
            console.log(err + " nie połączono z  " + APIForecastWeather)
          })
      }
    }
  }

  render() {
    return (< >
      <div className="weather" >
        <h1 > Aplikacja pogody </h1>
        <Form change={this.handleInputCityChange}
          submit={this.handleCitySearch}
          value={this.state.value}
        />
        < Result weather={this.state}
        />
      </div >
    </>
    );
  }
}

export default App;