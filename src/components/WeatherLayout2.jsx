import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
function WeatherLayout2() {
  const defaults = {
    color: "#fff",
    size: 112,
    animate: true,
  };
  return (
    <div>
      <ReactAnimatedWeather
        // icon={props.icon}
        icon="CLEAR_DAY"
        color={defaults.color}
        size={defaults.size}
        animate={defaults.animate}
      />
    </div>
  );
}

export default WeatherLayout2;
