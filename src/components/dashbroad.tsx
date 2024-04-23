"use client";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Autoplay from "embla-carousel-autoplay"
import axios from "axios";
import { time } from "console";
import { CalendarRangeIcon, Cloud, CloudSun, TimerIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Slidercard from "./slider-card";

export default function Dashbroad({ dataweather }: { dataweather: any }) {
  // set state
  const [daily, setDaily] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const location = dataweather.coord;
  useEffect(() => {
    const fetchdaliy = async () => {
      if (dataweather && dataweather.coord) {
        setLoading(true);
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&cnt=7&units=metric&lang=th&appid=${process.env.NEXT_PUBLIC_WEARHER_KEY}`
          );
          setDaily(res.data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchdaliy();
  }, [dataweather]);

  console.log(daily);

  return (
    <Card className="w-full col-span-3 max-sm:my-5 max-md:my-5">
      <CardHeader>
        <div className="title flex items-center gap-2">
          <CloudSun />
          <h1 className="text-2xl font-semibold">พยากรณ์อากาศรายวัน</h1>
        </div>
      </CardHeader>
      <CardBody className="mx-auto">
       <Slidercard daily={daily}/>
      </CardBody>
    </Card>
  );
}
