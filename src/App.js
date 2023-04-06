import React, { useState } from "react";
import axios from "axios";
import logo from './assets/logo.png'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=al&appid=b21d975de1ce3c4bf158f636a4334090`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="logo">
        <img src={logo} width={70} height={70} alt='' />
        <h2>Moti</h2>

      </div>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Kerko lokacionin'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C </h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}

          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold"> {data.main.pressure} hPa</p> : null}
              <p>Presioni i ajrit</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}

              <p>Lagështia</p>
            </div>
            <div className="wind">
              {data.main ? <p className="bold">{data.wind.speed.toFixed()} m/s</p> : null}
              <p>Shpejtesia e Eres</p>
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default App;
