import { useEffect, useState } from "react";
import logo from "./../mlh-prep.png";
import AutoComp from "./AutoComp";
import { useLoadScript } from "@react-google-maps/api";
import { useWeatherContext } from "../store/WeatherContext";
import "./../App.css";

function InitialScreen() {
  const [error, setError] = useState(null);
  const [isVarLoaded, setIsVarLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });
  const { screen, setScreen } = useWeatherContext();

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["cod"] !== 200) {
            setIsVarLoaded(false);
          } else {
            setIsVarLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsVarLoaded(true);
          setError(error);
        }
      );
  }, [city]);

  const cityHandler = (city) => {
    console.log("City set to:", city);
    setCity(city);
  };

  const changeScreen = () => {
    setScreen((prev) => !prev);
    console.log("First", screen);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
          <h2>Enter a city below 👇</h2>
          {isLoaded && <AutoComp cityHandler={cityHandler}></AutoComp>}
          <div className="Results" onClick={changeScreen}>
            {!isVarLoaded && <h2>Loading...</h2>}
            {console.log(results)}
            {console.log(isLoaded)}
            {isVarLoaded && results && (
              <>
                <h3>{results.weather[0].main}</h3>
                <p>Feels like {results.main.feels_like}°C</p>
                <i>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </i>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default InitialScreen;
