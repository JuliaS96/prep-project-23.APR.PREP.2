import { useWeatherContext } from "../../store/WeatherContext";
import "./WeeklyForecast.css";
import TopBar from "../TopBar";

function WeeklyForecast() {
  const { weeklyForecast, temp, unit} = useWeatherContext();
  console.log("WeeklyForecast: ", weeklyForecast)
  
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="weekly-forecast-container">
      {weeklyForecast && weeklyForecast.slice(0, 7).map((day, index) => (
        <div key={day.date} className="weekly-forecast-card">
          <h3>{weekdays[new Date(day.date).getDay()]}</h3>
          <img src={`http://openweathermap.org/img/w/${day.icon}.png`} alt={day.description} />
          <div>{temp.toFixed(2)}°{unit}</div>
        </div>
      ))}
    </div>
  );
}

export default WeeklyForecast;