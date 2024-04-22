"use client";
import axios from "axios";
import Search from "@/components/Serach";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CardBox from "@/components/Card";
import Dashbroad from "@/components/dashbroad";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("แม่สรวย");
  const [loading, setLoading] = useState(false);
  const [error, setserror] = useState("");

  const [secondary, setsecondary] = useState(false);

  const urlapi = `https://api.openweathermap.org/data/2.5/weather?q=${city},thailand&units=metric&appid=${process.env.NEXT_PUBLIC_WEARHER_KEY}`;

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
        setsecondary(false);
      }
    };
    fetchWeather();
  }, []);

  const serachsubmit = async (e: any) =>{
    e.preventDefault();

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const res = await axios.get(urlapi);
        setWeather(res.data);

        if(res.status === 200){
          toast.success("ค้นหาข้อมูลสำเร็จ");
          
        }
      } catch (err) {
        toast.error("ขออภัย ไม่พบข้อมูลที่ค้นหา");
        console.log(err);
      } finally {
        setLoading(false);
        setsecondary(false);
      }
    };

    fetchWeather();
      
  }

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
      <div className="box-serach flex gap-2 items-center mt-5">
        <Search
          value={(valuetext: any) => {
            setCity(valuetext);
            console.log(valuetext)
          }}
        />
        <Button variant={"outline"} onClick={serachsubmit}>
          Search
        </Button>
      </div>
      <div className="card-box my-5 lg:flex sm:block md:flex gap-3">
        <CardBox weather={weather} data={city} />
        <Dashbroad dataweather={weather} />
      </div>
    </div>
  );
}
