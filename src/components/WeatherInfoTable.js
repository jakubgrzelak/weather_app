import React, { Component } from 'react'
import moment from 'moment';
import Switch from "react-switch";

export default class WeatherInfoTable extends Component {
  render() {
    const weather = this.props.oneCityWeather || this.props.rememberCityData;
    return (
      <div style={{ display: 'flex' }}>
        <div className="weather-info-container">
          <div className="weather-info-city-name-container">       
            <span className="weather-info-city-name">{weather.city.name}, {weather.city.country}</span>
            {
              !this.props.hideRememberButton &&
                <div className="switch-container">
                  <span>Remeber</span>
                  <Switch 
                    onChange={() => this.props.rememberCity(weather)} 
                    checked={this.props.shouldRememberCity} 
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                </div>
            }
          </div>
          {this.renderEachDaySeparatly(weather.list)}
        </div>
        {
          !  this.props.hideRecentChecks && 
            <div className="recent-checks-container">
              {this.renderRecentCities()} 
            </div>
        }

      </div>
    );
  }

  renderEachDaySeparatly = (list) => {
    const weatherByDay = this.returnArrayDivdedIntoDays(list);

    return weatherByDay.map((wholeDayWheather, index) => {
      const oneDayWeather = wholeDayWheather.map((hourlyWeather, index) => {
        return (
          <tr key={index}>
            <th scope="row">{moment.unix(hourlyWeather.dt).format('h:mm a')}</th>
            <td><img src={`http://openweathermap.org/img/wn/${hourlyWeather.weather[0].icon}@2x.png`  } alt="weather"/></td>
            <td>
              {hourlyWeather.weather[0].main}
            </td>
            <td>{hourlyWeather.main.temp}</td>
            <td>{hourlyWeather.clouds.all}%</td>
            <td>
              {
                hourlyWeather.rain ? hourlyWeather.rain['3h'] : "-"
              }
            </td>
            <td>{hourlyWeather.wind.speed}</td>
            <td>{hourlyWeather.main.humidity}</td>
            <td>{hourlyWeather.main.pressure}</td>
          </tr>
        );
      });
      
      return (
        <div key={index} className="day-weather-container">
          <div className="day-weather-date">
            <span>{moment.unix(wholeDayWheather[0].dt).format('dddd, MMMM Do YYYY')}</span>
          </div>
          <table className="table responsive">
            <thead>
              {this.returnCorrectTableHeaders()}
            </thead>
            <tbody>
              {this.props.minimalisticVersion ? this.renderMinimalisticInfo(wholeDayWheather) : oneDayWeather}
            </tbody>
          </table>
        </div>
      );
    });
  }

  renderMinimalisticInfo = (weatherByDay) => {
    const averageDataByDay = [];

    const averageData = {
      tempMin: weatherByDay[0].main.temp_min,
      tempMax: 0, 
      clouds: 0, 
      rain: 0, 
      wind: 0, 
      humidity: 0,
      pressure: 0, 
    } 

    const clouds = [];
    const rain = [];
    const humidity = [];
    const wind = []
    const pressure = [];

    weatherByDay.forEach(hour => {
      averageData.tempMin = hour.main.temp_min < averageData.tempMin ? hour.main.temp_min : averageData.tempMin;
      averageData.tempMax = hour.main.temp_max > averageData.tempMax ? hour.main.temp_max : averageData.tempMax;
      clouds.push(hour.clouds.all);
      if (hour.rain && !isNaN(hour.rain['3h'])) rain.push(hour.rain['3h']);
      humidity.push(hour.main.humidity);
      wind.push(hour.wind.speed);
      pressure.push(hour.main.pressure);
    });

    averageData.clouds = this.average(clouds);
    averageData.rain = this.average(rain);
    averageData.wind = this.average(wind);
    averageData.humidity = this.average(humidity);
    averageData.pressure = this.average(pressure);

    averageDataByDay.push(averageData)
    return (
      <tr>
          <td>{averageData.tempMin}</td>
          <td>{averageData.tempMax}</td>
          <td>{averageData.clouds}</td>
          <td>{averageData.rain}</td>
          <td>{averageData.wind}</td>
          <td>{averageData.humidity}</td>
          <td>{averageData.pressure}</td>
      </tr>
    )
  }

  average = (numbers) => {
    let sum = 0;
    for(let i = 0; i < numbers.length; i++)
      sum += numbers[i];
    return (sum / (numbers.length || 1)).toFixed(2);
  }
  returnCorrectTableHeaders = () => {
    if (this.props.minimalisticVersion) {
      return (
        <tr>
          <th scope="col">Temp(min)</th>
          <th scope="col">Temp(max)</th>
          <th scope="col">Clouds</th>
          <th scope="col">Rain</th>
          <th scope="col">Wind</th>
          <th scope="col">Humidity</th>
          <th scope="col">Pressure</th>
        </tr>
      )
    } else {
      return (
        <tr>
          <th scope="col">Hour</th>
          <th scope="col"></th>
          <th scope="col">Description</th>
          <th scope="col">Temp</th>
          <th scope="col">Clouds</th>
          <th scope="col">Rain</th>
          <th scope="col">Wind</th>
          <th scope="col">Humidity</th>
          <th scope="col">Pressure</th>
        </tr>
      )
    }
  }

  renderRecentCities = () => {
    return (
      <ul className="list-group">
        <li className="list-group-item first-item">Recent checks</li>
        {this.renderRecentChecks()}
      </ul>
    )
  }

  renderRecentChecks = () => {
    return this.props.recentChecksData.map((cityData, index) => {
      return (
        <li onClick={() => this.props.onCityClick(cityData.city.id)} key={index} className="list-group-item">
          {cityData.city.name}, {cityData.city.country}
        </li>
      );
    });
  }

  returnArrayDivdedIntoDays = (list) => {
    const weatherByDay = [];
    let dailyWeather = [];

    list.forEach((partialWeather, index) => {
      if ((index + 1) % 8 !== 0) {
        dailyWeather.push(partialWeather);
      } else {
        dailyWeather.push(partialWeather);
        weatherByDay.push(dailyWeather);
        dailyWeather = [];
      }
    });

    return weatherByDay;
  }
}