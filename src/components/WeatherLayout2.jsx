import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  Text: { fontSize: "1.3em", fontWeight: 400, margin: "8px 0 3px 30px" },
}));
function WeatherLayout2(props) {
  const classes = useStyles();
  const defaults = {
    color: "#fff",
    size: 120,
    animate: true,
  };
  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" justifyContent="center" style={{ marginTop: "40px" }}>
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        style={{ marginTop: "20px", fontSize: "3em", fontWeight: "bold" }}
      >
        {props.description}
      </Box>
      <Divider
        variant="middle"
        orientation="horizontal"
        style={{
          backgroundColor: "#fff",
          marginTop: "8px",
        }}
      />
      <Box style={{ marginTop: "8px" }} className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search any city"
          onChange={props.skeyword}
          value={props.keyword}
          // name="city"
        />
        <div className="img-box">
          {" "}
          <img
            src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
            onClick={props.loadweather}
          />
        </div>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.Text}
      >
        {props.name},{props.country}{" "}
        <img
          src={`https://openweathermap.org/img/wn/${props.smallIcons}.png`}
        />
      </Box>
      <Divider
        variant="middle"
        orientation="horizontal"
        style={{
          backgroundColor: "#fff",
        }}
      />
      <Box
        display="flex"
        className={classes.Text}
        justifyContent="center"
        alignItems="center"
      >
        <Box flexGrow={1}>Temperature </Box>
        <Box flexGrow={1}>
          {props.Temperature}°c ({props.description}){" "}
        </Box>
      </Box>
      <Divider
        variant="middle"
        orientation="horizontal"
        style={{
          backgroundColor: "#fff",
          marginTop: "2px",
        }}
      />
      <Box
        display="flex"
        className={classes.Text}
        justifyContent="center"
        alignItems="center"
      >
        <Box flexGrow={1}> Humidity </Box>
        <Box flexGrow={1}>{props.humidity}%</Box>
      </Box>
      <Divider
        variant="middle"
        orientation="horizontal"
        style={{
          backgroundColor: "#fff",
          marginTop: "2px",
        }}
      />
      <Box
        display="flex"
        className={classes.Text}
        justifyContent="center"
        alignItems="center"
      >
        <Box flexGrow={1}> Visibility </Box>
        <Box flexGrow={1}>{props.visibility}mi</Box>
      </Box>
      <Divider
        variant="middle"
        orientation="horizontal"
        style={{
          backgroundColor: "#fff",
          marginTop: "2px",
        }}
      />
      <Box
        display="flex"
        className={classes.Text}
        justifyContent="center"
        alignItems="center"
      >
        <Box flexGrow={1}> Wind Speed </Box>
        <Box flexGrow={1}>{props.wind}km/h</Box>
      </Box>
    </div>
  );
}

export default WeatherLayout2;
