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
      "05d": shower_rain_day,
      "05n": shower_rain_night,
      "06d": rain_day,
      "06n": rain_night,
      "07d": thunderstorm,
      "07n": thunderstorm,
      "08d": snow,
      "08n": snow,
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
      const icon = allIcons[data.weather[0].icon];
      setLocation({
        location: data.name,
        weather: data.weather[0].main,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        icon: icon,
      })
      setIsLoading(false)
      console.log(city);
    };

    useEffect(() => {
    searchFunction("washington");
  }, []);

    if(isloading) {
      return <div className='min-h-screen bg-gradient-to-tl from-slate-900 to-slate-600 flex justify-center items-center'>
        <l-ring-2
      size="40"
      stroke="5"
      stroke-length="0.25"
      bg-opacity="0.1"
      speed="0.8" 
      color="white" ></l-ring-2>
    </div>
    }
    

  return (
   <>
   <div className='min-h-screen bg-gradient-to-tl from-slate-900 to-slate-600 flex justify-center items-center'>
    <div className='w-[85vw] h-[80vh] bg-white/20 border rounded-xl px-6 py-3 text-white font-outfit flex'>
    <div className='left-box flex flex-col w-[50%]'>
      <div className='left-sub-box1 h-[50%] '>
      <p className='text-xl tracking-widest'>{Location.location}</p>
      <h1 className=' font-semibold text-5xl'>{Location.weather}</h1>
      </div>
      <div className=" left-sub-box2 flex flex-col justify-end h-[50%]">
        <h1 className='text-9xl font-bold mb-6'>{Math.floor(Location.temperature)}°c</h1>
        <div className='flex'>
        <div className='flex'>
          <img className='h-full' src={humidity} alt="" />
          <div className="txt pl-2 ">
            <p className=' text-2xl'>{Location.humidity}%</p> 
            <p className='text-2xl'>Humidity</p>
          </div>
        </div>
        <div className='flex pl-2'>
          <img className='h-full' src={wind} alt="" />
          <div className="txt pl-2">
            <p className=' text-2xl'>{Location.wind}km/h</p>
            <p className='text-2xl'>Wind speed</p>
          </div>
        </div>
        </div>
      </div>
    </div>
    <div className="right-box h-[100%] w-[50%] flex flex-col items-end">
      <div className="right-sub-box1 h-[20%] flex">
        <input ref={inputRef} className='rounded-xl h-7 text-black px-2' type="text" name="search" id="search" />
        <div onClick={()=> searchFunction(inputRef.current.value)} className='bg-white h-7 w-7 rounded-full flex justify-center items-center ml-3 cursor-pointer'>
          <img className='h-4' src={search} alt="" />
        </div>
      </div>
      <div className="right-sub-box2 h-[80%] flex items-end">
      <img className='h-full' src={Location.icon} alt="" />
      </div>
    </div>
    </div>
   </div>
   </>
  )
}
