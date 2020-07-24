import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Background from "../assests/background.jpg";
import city from "../assests/city.jpg";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Clock from "react-live-clock";
import RightLayout from "./WeatherLayout2";
import ReactAnimatedWeather from "react-animated-weather";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  background: {
    backgroundImage: `url(${Background})`,
    height: "100vh",
    width: "100%",

    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  card: {
    alignContent: "center",
    justify: "center",
    width: "65%",
    height: "80%",
    // overflowY: screenMD ? "auto" : "hidden",
    overflow: "hidden",
    // borderRadius: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.73)",
    color: "#fff",
  },
  backgroundLeft: {
    backgroundImage: `url(${city})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "-webkit-fill-available",
    objectFit: "cover",
    width: "100vw",
  },
  TimeSize: {
    fontSize: "1.5em",
    fontWeight: "bold",
    marginTop: "25px",
  },
}));
function WeatherLayout() {
  const classes = useStyles();
  const [icon, setIcon] = useState(
    "CLEAR_DAY"
    //   {
    //   icon: "CLEAR_DAY",
    // }
  );
  useEffect(() => {
    get_Weather();
    // getCurrentLocation();
    // timerID = setInterval(() => get_Weather(weather.lat, weather.lon), 600000);

    // clearInterval(timerID);
  }, []);
  const Api_Key = "b30252d5438a93f2f32926b3a20905c3";
  const get_Weather = async () => {
    const api_Call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=Bangalore,IN&appid=${Api_Key}`
      // `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${Api_Key}`
    );
    const response = await api_Call.json();
    const item = response;
    setWeather({
      name: response.name,
      country: response.sys.country,
      temp: calcCelui(response.main.temp),
      weather_description: response.weather[0].main,
      min_temp: calcCelui(response.main.temp_min),
      max_temp: calcCelui(response.main.temp_max),
      wind_speed: response.wind.speed,
      feels: calcCelui(response.main.feels_like),
      humidity: response.main.humidity,
      // lat: lat,
      // lon: lon,
    });
    console.log(item, "asfiopu");
    // console.log(weather.lat, "latudu");
    // switch (weather.weather_description) {
    //   case "Haze":
    //     setIcon({ icon: "CLEAR_DAY" });
    //     break;
    //   case "Clouds":
    //     setIcon({ icon: "CLOUDY" });
    //     break;
    //   case "Rain":
    //     setIcon({ icon: "RAIN" });
    //     break;
    //   case "Snow":
    //     setIcon({ icon: "SNOW" });
    //     break;
    //   case "Dust":
    //     setIcon({ icon: "WIND" });
    //     break;
    //   case "Drizzle":
    //     setIcon({ icon: "SLEET" });
    //     break;
    //   case "Fog":
    //     setIcon({ icon: "FOG" });
    //     break;
    //   case "Smoke":
    //     setIcon({ icon: "FOG" });
    //     break;
    //   case "Tornado":
    //     setIcon({ icon: "WIND" });
    //     break;
    //   default:
    //     setIcon({ icon: "CLEAR_DAY" });

    // }

    if (weather.weather_description == "Haze") {
      setIcon("CLEAR_DAY");
    } else if (weather.weather_description == "Clouds") {
      setIcon("CLOUDY");
    } else {
      setIcon("CLEAR_DAY");
    }
  };
  const [weather, setWeather] = useState({
    country: null,
    name: null,
    temp: null,
    weather_description: "",
    min_temp: null,
    max_temp: null,
    wind_speed: null,
    feels: null,
    // lat: null,
    // lon: null,
  });

  const calcCelui = (temp) => {
    let cel = Math.floor(temp - 273.15);
    return cel;
  };
  const defaults = {
    color: "#fff",
    size: 112,
    animate: true,
  };
  const maxminTemp = (min, max) => {
    if (max && min) {
      return (
        <h3>
          <span className="px-4">{min}&deg;</span>
          <span className="px-4">{max}&deg;</span>
        </h3>
      );
    }
  };
  // function getPosition(position) {
  //   x.innerHTML =
  //     "Latitude: " +
  //     position.coords.latitude +
  //     "<br>Longitude: " +
  //     position.coords.longitude;
  // }

  // const getPosition = (options) => {
  //   return new Promise(function (resolve, reject) {
  //     navigator.geolocation.getCurrentPosition(resolve, reject, options);
  //   });
  // };
  // const getCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     getPosition()
  //       //If user allow location service then will fetch data & send it to get-weather function.
  //       .then((position) => {
  //         get_Weather(position.coords.latitude, position.coords.longitude);
  //       })
  //       .catch((err) => {
  //         //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
  //         get_Weather(28.67, 77.22);
  //         alert(
  //           "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
  //         );
  //       });
  //   } else {
  //     alert("Geolocation not available");
  //   }
  // };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <Grid
      container
      //  direction="row"
      className={classes.background}
      alignItems="center"
      justify="center"
    >
      <Card className={classes.card}>
        <Grid container direction="row">
          <Grid
            item
            container
            className={classes.backgroundLeft}
            // alignItems="center"
            direction="column"
            // xl={5}
            lg={7}
            md={7}
            // xs={6}
          >
            <CardContent>
              {/* <Grid item>
                <Grid
                  container
                  direction="column" */}

              {/* > */}

              <Box
                display="flex"
                justifyContent="flex-end"
                style={{ paddingRight: "2em", marginTop: "2em" }}
              >
                {/* {weather.weather_description} */}
                <Typography variant="h3">
                  {weather.name}
                  {weather.weather_description}
                </Typography>

                {/* {maxminTemp(weather.min_temp, weather.max_temp)}
                  <p>{weather.wind_speed}</p> */}
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                // p={1}
                style={{ paddingRight: "2em" }}
              >
                <Typography variant="h3">
                  {weather.country}
                  {icon}
                  <ReactAnimatedWeather
                    icon={icon}
                    color={defaults.color}
                    size={defaults.size}
                    animate={defaults.animate}
                  />
                </Typography>
              </Box>
              <Box
                display="flex"
                style={{ paddingRight: "1em", marginTop: "15em" }}
                bgcolor="red"
                // justifyContent="flex-end"
              >
                <Box flexGrow={1} className={classes.TimeSize}>
                  <Box

                  // flexGrow={1}
                  >
                    <Clock
                      format="HH:mm:ss"
                      // className={classes.TimeSize}
                      interval={1000}
                      ticking={true}
                    />
                  </Box>
                  {dateBuilder(new Date())}
                </Box>
                <Box
                // display="flex"
                // justifyContent="flex-end"
                // alignItems="flex-end"
                // p={1}

                // alignContent="flex-end"
                // bgcolor="red"
                >
                  <Typography variant="h1">{weather.temp}&deg;c</Typography>
                </Box>
              </Box>
              {/* </Grid>
              </Grid> */}
            </CardContent>
          </Grid>
          <Grid
            item
            container
            direction="row"
            // alignItems="flex-start"
            // justify="flex-start"
            // xl={7}
            lg={5}
            md
            // xs={6}
          >
            <RightLayout
            // icon={weather.icon}
            // description={weather.weather_description}
            />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default WeatherLayout;
