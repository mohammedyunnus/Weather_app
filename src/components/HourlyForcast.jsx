import React, { useState, useEffect } from "react";

function HourlyForcast() {
  useEffect(() => {
    get_Weather_Hourly();
  }, []);
  const Api_Key = "b30252d5438a93f2f32926b3a20905c3";
  const get_Weather_Hourly = async () => {
    const api_Call = await fetch(
      // `http://api.openweathermap.org/data/2.5/weather?q=Hosur,IN&appid=${Api_Key}`
      `http://api.openweathermap.org/data/2.5/forecast?q=Hosur&appid=${Api_Key}`
    );
    const response_Hourly = await api_Call.json();
    const item1 = response_Hourly;
    console.log(item1, "hourly");
  };
  return <div>
      123
      </div>;
}

export default HourlyForcast;
