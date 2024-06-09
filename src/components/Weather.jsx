import React, { useState, useEffect, useRef } from 'react'
import search from '../assets/search.svg'
import humidity from '../assets/water.svg'
import wind from '../assets/wind.svg'
import { configDotenv } from 'dotenv'
import { ring2 } from 'ldrs'
//importing icons
import clear_day from '../assets/day.svg'
import clear_night from '../assets/night.svg'
import few_cloud_day from '../assets/cloudy-day-1.svg'
import few_cloud_night from '../assets/cloudy-night-1.svg'
import scattered_clouds from '../assets/cloudy.svg'
import shower_rain_day from '../assets/rainy-2.svg'
import shower_rain_night from '../assets/rainy-4.svg'
import rain_day from '../assets/rainy-1.svg'
import rain_night from '../assets/rainy-6.svg'
import thunderstorm from '../assets/thunder.svg'
import snow from '../assets/snowy-6.svg'

ring2.register()


export const Weather = () => {
    //assigning codes to icons
    const allIcons = {
      "01d": clear_day,
      "01n": clear_night,
      "02d": few_cloud_day,
      "02n": few_cloud_night,
      "03d": scattered_clouds,
      "03n": scattered_clouds,
      "04d": scattered_clouds,
      "04n": scattered_clouds,
      "09d": shower_rain_day,
      "09n": shower_rain_night,
      "10d": rain_day,
      "10n": rain_night,
      "11d": thunderstorm,
      "11n": thunderstorm,
      "13d": snow,
      "13n": snow,
    };


  configDotenv
  const inputRef = useRef();
  const [isloading, setIsLoading] = useState(false);
  const[Location, setLocation] = useState({
    location: "",
    weather: "",
    temperature: "",
    humidity: "",
    wind: "",
    icon: ""
  });
  const apiId = import.meta.env.VITE_API_ID;
    
    const searchFunction = async (city) => {
      setIsLoading(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}&units=metric`)
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon];
      console.log(data.weather[0].icon);
      setLocation({
        location: data.name,
        weather: data.weather[0].description,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        icon: icon,
      })
      setIsLoading(false)
      console.log(city);
    };

    useEffect(() => {
    searchFunction("california");
  }, []);

    if(isloading) {
      return <div className='min-h-screen bg-slate-300 flex justify-center items-center'>
        <l-ring-2
      size="40"
      stroke="5"
      stroke-length="0.25"
      bg-opacity="0.2"
      speed="0.8" 
      color="black" ></l-ring-2>
    </div>
    }
    

  return (
   <>
   <div className='min-h-screen bg-slate-300 font-outfit text-blue-800 p-4 grid sm:grid-cols-2'>
   <div className='box1 sm:order-1'>
      <div className="sub-box1 justify-center flex items-center sm:justify-end">
        <input ref={inputRef} className='p-2 rounded-l-md text-black max-sm:w-full' placeholder='Search a new city' type="text" name="search" id="search" />
        <div onClick={()=> searchFunction(inputRef.current.value)} className='button bg-white rounded-r-md p-3 flex items-center justify-center'><img src={search} alt="" /></div>
      </div>
      <div className="sub-box-2 flex justify-center items-center">
        <img className='w-[80%]' src={Location.icon} alt="" />
      </div>
    </div>
    <div className='box2'>
      <div className="sub-box-1 sm:h-[20%]">
        <div className='super-sub-box1 text-center sm:text-left'>
          <p className='text-blue-500 text-3xl'>{Location.location}</p>
          <h2 className='text-blue-600 text-6xl font-semibold'>{Location.weather}</h2>
        </div>
      </div>
      <div className="sub-box-2 flex flex-col justify-end sm:h-[80%]">
        <h1 className='text-8xl font-extrabold pb-2 max-sm:text-center'>{Math.floor(Location.temperature)}°c</h1>
        <div className='h-[20%] flex max-sm:justify-center'>
          <div className='flex items-center pr-2'>
            <img className='h-9 pr-2' src={humidity} alt="" />
            <div className='leading-4 text-slate-500'>
              <p className='text-3xl'>{Location.humidity}%</p>
              <p className='text-2xl'>Humidity</p>
            </div>
          </div>
          <div className='flex items-center'>
            <img className='h-9 pr-2' src={wind} alt="" />
            <div className='leading-4 text-slate-500'>
              <p className='text-3xl'>{Location.wind}km/hrs</p>
              <p className='text-2xl'>Humidity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
   </>
  )
}
