import React, { useEffect, useState } from 'react'
import Clouds from './weatherimg/03d@2x.png';
import Clear from './weatherimg/01d@2x.png';
import Thunderstorm from './weatherimg/11d@2x.png';
import Rain from './weatherimg/09d@2x.png';
import Snow from './weatherimg/13d@2x.png';
import Atmosphere from './weatherimg/50d@2x.png';
import styles from "./weather.module.css";
import axios from "axios";


const API_KEY = "e862b7b1a840ae3919413a67d1fa2be9";
const Weather = ({ center, end, setmainWeather }) => {
    const [weather, setWeather] = useState("");

    const lat = center.Ma;
    const lon = center.La;
    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        axios.get(url)
            .then((responseData) => {
                const data = responseData.data;
                setWeather({
                temperature: data.main.temp,
                main: data.weather[0].main,
                loading: false,
                });
                setmainWeather(data.weather[0].main); // modalef으로 전달하기 위해서 인자로setmainWeather 함수를 받아왔었다.
            });
    },[center])

    return(
        <div>
            <div className={styles.weather} >
                <h1 className={styles.weathertext}>{weather.temperature}</h1>
                {
                    weather.main === "Clouds" ? (<h1><img src = {Clouds} alt="Clouds"/></h1>) :
                    weather.main === "Clear" ? (<h1><img src = {Clear} alt="Clear" /></h1>) : 
                    weather.main === "Thunderstorm" ? (<h1><img src={Thunderstorm} alt="Thunderstorm" /></h1>):
                    weather.main === "Rain" ?  (<h1><img src={Rain} alt="Rain"/></h1>):
                    weather.main === "Snow" ? (<h1><img src={Snow} alt = "Snow"/></h1>):
                    weather.main === "Atmosphere" ? (<h1><img src ={Atmosphere} alt="Atmosphere"/></h1>): null
                }
            </div>
        </div>
    )
    
}

export default Weather