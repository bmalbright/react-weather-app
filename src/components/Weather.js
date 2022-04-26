import React from 'react';
import './styles.css';
// import { Card } from 'semantic-ui-react';
import moment from 'moment'; 

const CardExampleCard = ({weatherData}) => (
<div className='main'>
    <p className='header'>{weatherData.name}</p>
        <div className='flex'>
            <p className='day'>{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
            <p className='description'>Description: {weatherData.weather[0].description}</p>
        </div>
        <div className='flex'>
        <p className='temp'>Temperature: {weatherData.main.temp} &deg;F</p>
        <p className='temp'>Humidity: {weatherData.main.humidity}%</p>
        <p className='temp'>Windspeed: {weatherData.wind.speed}</p>

        </div>
        <div className='flex'>
        <p className='sunrise-sunset'>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p className='sunrise-sunset'>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
        </div>


</div>
)

export default CardExampleCard;
