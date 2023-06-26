/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import getWeather from '../services/weather.js';

function Countries({ countriesToShow, setCountriesToShow }) {
  if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } if (countriesToShow.length === 1) {
    return <Country country={countriesToShow[0]} />;
  }

  return (
    <table>
      <tbody>
        {countriesToShow.map((country) => (
          <tr key={country.name.common}>
            <td>{country.name.common}</td>
            <td><button onClick={() => setCountriesToShow([country])}>Show</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Country({ country }) {
  return (
    <>
      <p><b>{country.name.common}</b></p>
      <img src={country.flags.svg} width="200" alt={`${country.name.common}'s Flag`} />
      <p />
      <div>
        Capital:
        {country.capital}
      </div>
      <div>
        Area:
        {country.area}
      </div>
      <p><b>Language(s):</b></p>
      <div>{Object.keys(country.languages).map((language) => <div key={language}>{country.languages[language]}</div>)}</div>
      <p>
        <b>
          Weather in
          {country.capital}
        </b>
      </p>
      <Weather city={country.capital} />
    </>
  );
}

function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => { getWeather(city).then((data) => setWeatherData(data)); }, [city]);

  if (!weatherData) return;

  return (
    <>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} width="200" alt={`${city}'s weather icon`} />
      <div>
        Wind speed:
        {weatherData.wind.speed}
        {' '}
        m/s
      </div>
      <div>
        Temperature:
        {weatherData.main.temp}
        {' '}
        K
      </div>
    </>
  );
}

export default Countries;
