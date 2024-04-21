"use client";
import axios from "axios";
import Search from "@/components/Serach";
import Image from "next/image";
import { useEffect, useState } from "react";
import CardBox from "@/components/Card";
import Dashbroad from "@/components/dashbroad";

export default function Home() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("แม่สรวย,เชียงราย");
  const [loading, setLoading] = useState(false);
  const [error, setserror] = useState('');

  const urlapi = `http://api.openweathermap.org/data/2.5/weather?q=${city},thailand&units=metric&appid=${process.env.NEXT_PUBLIC_WEARHER_KEY}`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const res = await axios.get(urlapi);
        setWeather(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  console.log(weather);

  return (
    <div>
      <div className="flex gap-2 items-center">
        <img
          src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
          width={100}
          alt=""
        />
        <h1 className="text-2xl font-semibold">Weather App</h1>
      </div>
      <div className="box-serach mt-5">
        <Search
          value={(valuetext: any) => {
            setCity(valuetext);
          }}
        />
      </div>
      <div className="card-box my-5 lg:flex sm:block md:flex gap-3">
        <CardBox weather={weather} data={city} />
        <Dashbroad dataweather={weather}/>
      </div>
    </div>
  );
}
