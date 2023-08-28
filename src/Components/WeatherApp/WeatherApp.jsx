import React, {useState} from 'react'
import "./WeatherApp.css"

import search_icon from "../Assets/icons/icons8-search-80.png"
import sunny from "../Assets/icons/icons8-sun-80.png"
import cloud from "../Assets/icons/icons8-cloud-80.png"
import humidity from "../Assets/icons/icons8-moisture-80.png"
import rain from "../Assets/icons/icons8-rain-80.png"
import snow from "../Assets/icons/icons8-snow-storm-80.png"
import wind from "../Assets/icons/icons8-wind-80.png"
import partial_cloud from "../Assets/icons/icons8-partly-cloudy-day-80.png"



export const WeatherApp = () => {

  let api_key="e7175cdb12a4dc6a5c7b84d73366cd53"; 
  const [wicon, setWicon]=useState(cloud);
  
  const search= async()=>{
    const element=document.getElementsByClassName("cityInput")
    if(element[0].value===""){
      return 0;
    }
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
  

   


    let response = await fetch(url);
    let data = await response.json();

    const humidity_ =document.getElementsByClassName("humidity-percent");
    const wind_= document.getElementsByClassName("wind-speed");
    const temperature=document.getElementsByClassName("weather-temp");
    const location=document.getElementsByClassName("weather-location");
  
    humidity_[0].innerHTML=data.main.humidity+ "%";
    wind_[0].innerHTML=Math.floor(data.wind.speed)+" km/H";
    temperature[0].innerHTML=Math.floor(data.main.temp)+" °C";
    location[0].innerHTML=data.name;

    if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
      setWicon(sunny);
    }
    else if(data.weather[0].icon==="02d" ||data.weather[0].icon==="02n"){
      setWicon(partial_cloud);
    }
    else if(data.weather[0].icon==="03d" ||data.weather[0].icon==="03n"){
      setWicon(cloud);
    }
    else if(data.weather[0].icon==="04d" ||data.weather[0].icon==="04n"){
      setWicon(partial_cloud);
    }
    else if(data.weather[0].icon==="09d" ||data.weather[0].icon==="09n"){
      setWicon(rain);
    }
    else if(data.weather[0].icon==="10d" ||data.weather[0].icon==="10n"){
      setWicon(rain);
    }
    else if(data.weather[0].icon==="13d" ||data.weather[0].icon==="13n"){
      setWicon(snow);
    }else{
      setWicon(sunny)
    }


  }
  return (

    <div className='container'>
      <div className='top-bar'>
        <input type="text" className='cityInput' placeholder='Enter city'/>
        <div className='search-icon' onClick={search}>
          <img src={search_icon} alt="" className="sicon"/>
        </div>
      </div>
      <div className='weather-image'>
        <img src={wicon} alt=''/>
      </div>
      <div className='weather-temp'>24°C</div>
      <div className='weather-location'>Ankara</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity} alt='' className='icon'/>
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind} alt='' className='icon'/>
          <div className='data'>
            <div className='wind-speed'>18 km/h</div>
            <div className='text'>Wind Speed</div>
          </div>

        </div>
      </div>
    </div>
  )
}
