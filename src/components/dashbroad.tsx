"use client";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import axios from "axios";
import { time } from "console";
import { CalendarRangeIcon, CloudSun, TimerIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Dashbroad({ dataweather }: { dataweather: any }) {
  // set state
  const [daily, setDaily] = useState<any>({});
  const location = dataweather.coord;
  useEffect(() => {
    const fetchdaliy = async () => {
      if (dataweather && dataweather.coord) {
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&cnt=7&units=metric&lang=th&appid=${process.env.NEXT_PUBLIC_WEARHER_KEY}`
          );
          setDaily(res.data);
        } catch (err) {
        } finally {
          
        }
      }
    };

    fetchdaliy();
  }, [dataweather]);

  return (
    <Card className="w-full col-span-3 max-sm:my-5">
      <CardHeader>
        <div className="title flex items-center gap-2">
          <CloudSun />
          <h1 className="text-2xl">พยากรณ์อากาศรายวัน</h1>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid lg:grid-cols-7 gap-2">
          {daily.list?.map((day: any, index: number) => {
            const [date, time] = day.dt_txt.split(" ");
            const [hour, minute] = time.split(":");
            return (
              <div className="item flex flex-col items-center border rounded-md p-4 border-slate-800" key={index}>
                <h4 className="flex gap-2 my-1">
                  {date}
                </h4>
                <div className="item-body">
                  <Image
                    src="https://cdn-icons-png.freepik.com/256/13539/13539224.png?semt=ais_hybrid"
                    width={50}
                  ></Image>
                  <h1 className="text-2xl font-semibold">{day.main.temp.toFixed(0)}&#176;C</h1>
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
