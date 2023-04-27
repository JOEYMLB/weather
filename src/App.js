import rainBg from "./assets/rain.jpg";
import cloudBg from "./assets/cloud.jpg";
import snowBg from "./assets/snow.jpg";
import sunnyBg from "./assets/sunny.jpg";
import mistBg from "./assets/mist.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("imperial");
  const [bg, setBg] = useState(cloudBg);



  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      // dynamic bg
      // const threshold = units === "metric" ? 20 : 60;
      // if (data.temp <= threshold) setBg(cloudBg);
      // else setBg(sunnyBg);
      if (data.iconURL === "https://openweathermap.org/img/wn/01d@2x.png") setBg(sunnyBg);
      else if(data.iconURL === "https://openweathermap.org/img/wn/09d@2x.png") setBg(rainBg);
      else if(data.iconURL === "https://openweathermap.org/img/wn/09n@2x.png") setBg(rainBg);
      else if(data.iconURL === "https://openweathermap.org/img/wn/10d@2x.png") setBg(rainBg);
      else if(data.iconURL === "https://openweathermap.org/img/wn/10n@2x.png") setBg(rainBg);
      else if(data.iconURL === "https://openweathermap.org/img/wn/11d@2x.png") setBg(rainBg);
      else if(data.iconURL === "https://openweathermap.org/img/wn/11n@2x.png") setBg(rainBg);
      else if(data.iconURL === "https://openweathermap.org/img/wn/13d@2x.png") setBg(snowBg);
      else if(data.iconURL === "https://openweathermap.org/img/wn/13n@2x.png") setBg(snowBg);
      else if(data.iconURL === "https://openweathermap.org/img/wn/50d@2x.png") setBg(mistBg);
      else if(data.iconURL === "https://openweathermap.org/img/wn/50n@2x.png") setBg(mistBg);
      else setBg(cloudBg);

      
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            {/* bottom description */}
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}



export default App;