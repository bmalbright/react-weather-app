import React from 'react';
// import './styles.css';
import { Card } from 'semantic-ui-react';

const CardExampleCard = ({weatherData}) => (
<Card>
    <Card.Content>
        <Card.Header className='header'>{weatherData.name}</Card.Header>
        <p>Temperature: {weatherData.main.temp} &deg;F</p>
        <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
        <p>Humidity: {weatherData.main.humidity}</p>
        <p>Windspeed: {weatherData.main.windspeed}</p>
        <p>Description: {weatherData.weather[0].description}</p>
    </Card.Content>
</Card>
)

export default CardExampleCard;
