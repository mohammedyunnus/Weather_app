import React, { useState, useEffect } from "react";
import { Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Background from "../assests/background.jpg";
import haze from "../assests/haze.jpg";
import cloudy from "../assests/cloudy.jpg";
import rainy from "../assests/rainy.jpg";
import snowy from "../assests/snowy.jpg";
import dusty from "../assests/dusty.jpg";
import drizzle from "../assests/drizzle.jpg";
import fog from "../assests/fog.jpg";
import mist from "../assests/mist.jpg";
import smoke from "../assests/smoke.jpg";
import sandy from "../assests/sandy.jpg";
import ash from "../assests/ash.jpg";
import squall from "../assests/squall.jpg";
import torndao from "../assests/tornado.jpg";
import thunderstorm from "../assests/thunderstorm.jpg";
import clearday from "../assests/clearday.jpg";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Clock from "react-live-clock";
import RightLayout from "./WeatherLayout2";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";

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
    height: "85%",
    // overflowY: screenMD ? "auto" : "hidden",
    overflow: "hidden",
    // borderRadius: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.73)",
    color: "#fff",
  },
  backgroundLeft: {
    backgroundImage: `url(${mist})`,
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
  const [wImage, setWImage] = useState("");

  const theme = useTheme();

  const classes = useStyles();
  // var query = "bangalore";
  let my_home =
    localStorage.getItem("my_home") !== null
      ? localStorage.getItem("my_home")
      : "";
  const [query, setQuery] = useState(my_home);
  // localStorage.setItem("my_home",)
  const [mirror_query, setMirrorQuery] = useState("");
  const [current_home, setCurrHome] = useState(my_home);
  const [error, setError] = useState("");
  const [icon, setIcon] = useState(
    "CLEAR_DAY"
    //   {
    //   icon: "CLEAR_DAY",
    // }
  );
  const screenMD = useMediaQuery(theme.breakpoints.down("md"));
  const [weather, setWeather] = useState({
    country: null,
    name: null,
    temp: null,
    weather_description: "",
    min_temp: null,
    max_temp: null,
    wind_speed: null,
    feels: null,
    humidity: null,
    visibility: null,

    // lat: null,
    // lon: null,
    smallIcons: undefined,
  });
  useEffect(() => {
    getLocation();
    // get_Weather();
    // getCurrentLocation();
    // timerID = setInterval(() => get_Weather(weather.lat, weather.lon), 600000);
    // clearInterval(timerID);
  }, []);
  useEffect(() => {
    get_Weather();
    // getCurrentLocation();
    // timerID = setInterval(() => get_Weather(weather.lat, weather.lon), 600000);
    // clearInterval(timerID);
  }, [query]);
  useEffect(() => {
    switch (weather.weather_description) {
      case "Clouds":
        setIcon({ icon: "CLOUDY" });
        setWImage(cloudy);
        break;
      case "Rain":
        setIcon({ icon: "RAIN" });
        setWImage(rainy);
        break;
      case "Snow":
        setIcon({ icon: "SNOW" });
        setWImage(snowy);
        break;
      case "Drizzle":
        setIcon({ icon: "SLEET" });
        setWImage(drizzle);
        break;
      case "Dust":
        setIcon({ icon: "FOG" });
        setWImage(dusty);
        break;
      case "Haze":
        setIcon({ icon: "FOG" });
        setWImage(haze);
        break;
      case "Fog":
        setIcon({ icon: "FOG" });
        setWImage(fog);
        break;
      case "Smoke":
        setIcon({ icon: "FOG" });
        setWImage(smoke);
        break;
      case "Sand":
        setIcon({ icon: "FOG" });
        setWImage(sandy);
        break;
      case "Ash":
        setIcon({ icon: "FOG" });
        setWImage(ash);
        break;
      case "Squall":
        setIcon({ icon: "FOG" });
        setWImage(squall);
        break;
      case "Mist":
        setIcon({ icon: "FOG" });
        setWImage(mist);
        break;
      case "Tornado":
        setIcon({ icon: "WIND" });
        setWImage(torndao);
        break;
      case "Thunderstorm":
        setIcon({ icon: "RAIN" });
        setWImage(thunderstorm);
        break;
      case "Clear":
        setIcon({ icon: "CLEAR_DAY" });
        setWImage(clearday);
        break;
      default:
        setIcon({ icon: "CLEAR_DAY" });
        setWImage(clearday);
    }
  }, [weather]);
  const Api_Key = "b30252d5438a93f2f32926b3a20905c3";

  const get_Weather = async (e) => {
    if (query != "") {
      const api_Call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${Api_Key}`
        // `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${Api_Key}`
      );
      const response = await api_Call.json();

      let resp_code = parseInt(response.cod);

      if (!(resp_code >= 400 && resp_code <= 499)) {
        setQuery("");
        setWeather({
          name: convertString(response.name),
          country: response.sys.country,
          temp: calcCelui(response.main.temp),
          weather_description: response.weather[0].main,
          min_temp: calcCelui(response.main.temp_min),
          max_temp: calcCelui(response.main.temp_max),
          wind_speed: response.wind.speed,
          feels: calcCelui(response.main.feels_like),
          humidity: response.main.humidity,
          smallIcons: response.weather[0].icon,
          visibility: response.visibility,
        });
      } else if (resp_code == 404) {
        alert("No city found!");
      } else {
        alert("Something Went Wrong, try again!");
      }

      console.log(response, "asfiopu");
      // console.log(weather.lat, "latudu");
    }
  };

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      console.log(lat, "laaa");
      if (lat != "" && lon != "") {
        const api_key1 = "45d2893054feb7";
        const api_Call = await fetch(
          `https://eu1.locationiq.com/v1/reverse.php?key=${api_key1}&lat=${lat}&lon=${lon}&format=json`
        );
        const response = await api_Call.json();
        console.log("geo", response);
        if (
          response.hasOwnProperty("address") &&
          response.address.hasOwnProperty("city")
        ) {
          if (response.address.city != "") {
            setQuery(response.address.city);
          }
        }
      }
    });
    if (weather.name === null) {
      if (query === "") setQuery("Bangalore");
    } else {
      alert("Something Went Wrong While fetching location!");
    }
  };
  const key = (q) => {
    setQuery(q.target.id);
  };
  const mkey = (e) => {
    setMirrorQuery(e.target.value);
  };
  const goHome = (e) => {
    if (
      localStorage.getItem("my_home") !== null &&
      localStorage.getItem("my_home") !== ""
    ) {
      setQuery(localStorage.getItem("my_home"));
    }
  };
  const setHome = (e) => {
    if (weather.name !== "" && weather.name !== undefined) {
      localStorage.setItem("my_home", weather.name);
      setCurrHome(weather.name);
    }
  };
  const calcCelui = (temp) => {
    let cel = Math.floor(temp - 273.15);
    return cel;
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

  const convertString = (phrase) => {
    var returnString = phrase;
    //Convert Characters
    returnString = returnString.replace("ö", "o");
    returnString = returnString.replace("ç", "c");
    returnString = returnString.replace("ş", "s");
    returnString = returnString.replace("ı", "i");
    returnString = returnString.replace("ğ", "g");
    returnString = returnString.replace("ü", "u");
    returnString = returnString.replace("ū", "u");

    // if there are other invalid chars, convert them into blank spaces
    // returnString = returnString.replace(/[^a-z0-9\s-]/g, "");
    // convert multiple spaces and hyphens into one space

    // trims current string

    // cuts string (if too long)

    // add hyphens

    return returnString;
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
      <Card
        className={classes.card}
        style={{ overflowY: screenMD ? "auto" : "hidden" }}
      >
        <Grid container direction="row">
          <Hidden only={["sm", "xs", "md"]}>
            <Grid
              item
              container
              className={classes.backgroundLeft}
              style={{ backgroundImage: `url(${wImage})` }}
              // alignItems="center"
              direction="column"
              // xl={5}
              lg={7}
              md={6}
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
                    {weather.name},{weather.country}
                  </Typography>
                  <div className="img-box">
                    <IconButton>
                      <Tooltip
                        open={true}
                        title="Set as home"
                        placement="right"
                        arrow
                      >
                        <LocationOnIcon
                          style={{ color: "white" }}
                          onClick={setHome}
                        />
                      </Tooltip>
                    </IconButton>
                  </div>

                  {/* {maxminTemp(weather.min_temp, weather.max_temp)}
                  <p>{weather.wind_speed}</p> */}
                </Box>
                {/* <Box
                display="flex"
                justifyContent="flex-end"
                // p={1}
                style={{ paddingRight: "2em" }}
              >
                <Typography variant="h3">{weather.country}</Typography>
              </Box> */}
                <Box
                  display="flex"
                  style={{ paddingRight: "1em", marginTop: "20em" }}

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
              </CardContent>
            </Grid>
          </Hidden>
          <Grid
            item
            container
            direction="row"
            // alignItems="flex-start"
            // justify="flex-start"
            // xl={7}
            lg={5}
            md={6}
            // xs={6}
          >
            <RightLayout
              icon={icon.icon}
              description={weather.weather_description}
              name={weather.name}
              country={weather.country}
              smallIcons={weather.smallIcons}
              Temperature={weather.temp}
              humidity={weather.humidity}
              visibility={weather.visibility}
              wind={weather.wind_speed}
              loadweather={get_Weather}
              keyword={mirror_query}
              skeyword={key}
              mkey={mkey}
              location={getLocation}
              home={goHome}
              currhome={current_home}
              feels={weather.feels}
            />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default WeatherLayout;
