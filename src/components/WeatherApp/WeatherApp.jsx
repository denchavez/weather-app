import React, { useState } from 'react';
import {
  ClearIcon,
  CloudIcon,
  DrizzleIcon,
  HumidityIcon,
  RainIcon,
  SearchIcon,
  SnowIcon,
  WindIcon,
} from '../assets/index';
import './WeatherApp.css';

const WeatherApp = () => {
  // const api_key = '2be0334d89f1cc38d8e0c4d88fe0183f';
  const api_key = process.env.REACT_APP_API_KEY;

  const [icon, setIcon] = useState(CloudIcon);

  const search = async() => {
    const element = document.getElementsByClassName('city-input');
    if (element[0].value === '') {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=imperial&appid=${api_key}`
    let response = await fetch(url);
    let data = await response.json();

    const humidity = document.getElementsByClassName('humidity-percent');
    const wind = document.getElementsByClassName('wind-rate');
    const temperature = document.getElementsByClassName('weather-temp');
    const location = document.getElementsByClassName('weather-location');

    humidity[0].innerHTML = Math.floor(data.main.humidity) + '%';
    wind[0].innerHTML = Math.floor(data.wind.speed) + ' m/h';
    temperature[0].innerHTML = Math.floor(data.main.temp) + '°F';
    location[0].innerHTML = data.name;

    if(data.weather[0].description === 'clear sky') {
      setIcon(ClearIcon)
    } else if (data.weather[0].description === 'few clouds') {
      setIcon(CloudIcon)
    } else if (data.weather[0].description === 'shower rain') {
      setIcon(DrizzleIcon)
    } else if (data.weather[0].description === 'rain') {
      setIcon(RainIcon)
    } else if (data.weather[0].description === 'snow') {
      setIcon(SnowIcon)
    } else {
      setIcon(CloudIcon)
    }
  }

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='city-input' placeholder='City' />
        <div className='search-icon' onClick={() => {search()}}>
            <img src={SearchIcon} alt='' />
        </div>
      </div>
      <div className='weather-image'>
        <img src={icon} alt='' />
      </div>
      <div className='weather-temp'>24°F</div>
      <div className='weather-location'>London</div>
      <div className='data-container'>
        <div className='element'>
          <img src={HumidityIcon} alt='' />
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={WindIcon} alt='' />
          <div className='data'>
            <div className='wind-rate'>18 m/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
