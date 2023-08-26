/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import "./index.css";
import Map from "./features/Map";
import MainInfo from "./features/MainInfo";
import { useEffect, useReducer } from "react";
import Spinner from "./features/Spinner";

const initialState = {
  loading: true,
  weather: null,
  lat: 42.6977,
  lon: 23.3219,

  degree: "celsius",
  country: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "weatherUpdate":
      return { ...state, weather: action.payload };
    case "loading":
      return { ...state, loading: action.payload };
    case "changeLat":
      return { ...state, lat: action.payload };
    case "changeLon":
      return { ...state, lon: action.payload };
    case "degreeSwitch":
      return { ...state, degree: action.payload };
    case "updateCountry":
      return { ...state, country: action.payload };

    default:
      throw new Error("Action unkonwn");
  }
};

export default function App() {
  const [{ loading, weather, lat, lon, degree, country }, dispatch] =
    useReducer(reducer, initialState);

  function SetCurPosition() {
    dispatch({ type: "loading", payload: true });
    navigator.geolocation.getCurrentPosition(
      (pos) => (
        dispatch({ type: "changeLat", payload: pos.coords.latitude }),
        dispatch({ type: "changeLon", payload: pos.coords.longitude }),
        dispatch({ type: "loading", payload: false })
      )
    );
  }

  function handleSetLat(newLat) {
    dispatch({ type: "changeLat", payload: newLat });
  }

  function handleSetLon(newLon) {
    dispatch({ type: "changeLon", payload: newLon });
  }

  useEffect(() => {
    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=11b37e11b4d54d60826122f20f2e8be5
      `
    )
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "updateCountry",
          payload: data.features[0].properties.country,
        })
      )
      .catch((err) => {
        throw new Error(err);
      });
  }, [lat, lon]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=549012357271f3093edbbbf95e039900`
    )
      .then((res) => res.json())
      .then((data) => dispatch({ type: "weatherUpdate", payload: { data } }))
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        dispatch({ type: "loading", payload: false });
      });
  }, [lat, lon]);
  function handleDegree() {
    if (degree === "celsius") {
      dispatch({ type: "degreeSwitch", payload: "fahrenheit" });
    } else {
      dispatch({ type: "degreeSwitch", payload: "celsius" });
    }
  }

  return (
    <div
      className="mainBackground"
      style={{
        backgroundImage: `url(../../public/imgs/${
          !loading && weather.data.weather["0"].icon
        }.jpeg)`,
      }}
    >
      <div className="mainContainer">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <MainInfo
              city={!loading && weather.data.name}
              country={country}
              temp={!loading && weather.data.main.temp}
              icon={!loading && weather.data.weather["0"].icon}
              skyType={!loading && weather.data.weather["0"].main}
              wind={!loading && weather.data.wind.deg}
              windSpeed={!loading && weather.data.wind.speed}
              maxTemp={!loading && weather.data.main.temp_max}
              minTemp={!loading && weather.data.main.temp_min}
              sunrise={!loading && weather.data.sys.sunrise}
              sunset={!loading && weather.data.sys.sunset}
              degree={degree}
              setCurPosition={SetCurPosition}
            />

            <Map
              onSetLon={!loading && handleSetLon}
              onSetLat={!loading && handleSetLat}
              lat={!loading && lat}
              lon={!loading && lon}
            />

            <div className="switchButton">
              <label className="switch">
                <input type="checkbox" onChange={handleDegree} />
                <span className="slider degree"></span>
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
