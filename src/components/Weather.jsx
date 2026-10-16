// import Weather from "./components/Weather";

import axios from "axios";
import { useState } from "react";


const Weather = () => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const [city, setCity] = useState("");
const [error,setError]= useState(null);
const [ weather , setweather]=useState(null)
// const APIKEY = import.meta.env.VITE_API_KEY;

 const handleSubmit =async (e)=>{
  e.preventDefault();
  if (!city.trim()){
    setError("please Enter city Name!")
    return;
  }
  
   try{
    //  const reponse=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    const reponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${API_KEY}`
);
    // const reponse=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=mogadishu&appid=9760b90a0a038b00c62b363850071df7`)


    
    console.log(reponse);
    setweather(reponse.data);
    setError("")

   }
   catch(error){
   setError("iska sax magaca");

  }
}
  
 

  return(
    <>
    <form className="flex max-w-md w-full" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter City Name..." 
        className="p-3  bg-white outline-0 rounded-sm flex-1"
        onChange={(e) => setCity(e.target.value)} />
        <button className="bg-orange-400 py-4 px-5 rounded-sm text-white">
            search</button>


    </form>
    {error && <p className="bg-red-300 p-2 w-full max-w-md mt-2">{error}</p>}

   {weather && 
   <div className="bg-white rounded-sm p-8 w-full max-w-md mt-3 text-center flex flex-col justify-center items-center">
      <h2 className="text-2xl">
        {weather.name} <strong>{weather.sys.country}</strong>
      </h2>

      <img  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
       alt="" className=" w-28 h-28 "
       />
      <h3 className="text-5xl font-bold">{Math.round(  weather.main.temp)}°C</h3>
    </div>
    
    }
    
    

    </>

   )
 }


 export default Weather;




