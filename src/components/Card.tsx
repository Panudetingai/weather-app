import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";
import { Cloud, Droplets, MapPin, Thermometer, Waves } from "lucide-react";

export default function CardBox({
  weather,
  data,
}: {
  weather: any;
  data: any;
}) {
  console.log(weather);
  return (
    <Card className="py-4 w-2/2 col-span-2">
      <CardHeader className="flex gap-2 justify-between items-end">
        <div className="image-box flex flex-col">
          <Image
            src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
            width={100}
          />
          <h1 className="text-2xl uppercase font-semibold">
            {weather.weather?.[0].main}
          </h1>
          <p className="text-slate-500 text-sm font-semibold">
            {weather.weather?.[0].description}
          </p>
        </div>
        <div className="box-namecity">
          <h1 className="text-6xl font-semibold">
            {Math.round(weather.main?.temp)}&#176;
            <span className="">C</span>
          </h1>
          <div className="flex gap-2 items-center">
            <MapPin />
            <p className="mt-5">
              {weather.name}
              <br />
              <span className="text-xs">
                {weather.coord?.lat} | {weather.coord?.lon}
              </span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="grid grid-cols-2 gap-3 items-center">
          <div className="icon flex items-center">
            <Thermometer />
            <p>รู้สึกเหมือน</p>
          </div>
          <div className="celsius text-center">
            <p>{Math.round(weather.main?.feels_like)}&#176;C</p>
          </div>
          <div className="icon flex items-center">
            <Thermometer />
            <p>อุณหภูมิสูงสุด</p>
          </div>
          <div className="celsius text-center">
            <p>{Math.round(weather.main?.temp_max)}&#176;C</p>
          </div>
          <div className="icon flex items-center">
            <Thermometer />
            <p>อุณหภูมิต่ำสุด</p>
          </div>
          <div className="celsius text-center">
            <p>{Math.round(weather.main?.temp_min)}&#176;C</p>
          </div>
        </div>
        <hr className="h-px mt-8 border-b border-slate-800" />
      </CardBody>
      <CardFooter>
        <div className="box-humidity">
          <h1 className="text-md">ค่าความชื้นและความกดอากาศ</h1>
          <div className="grid-cols-3 grid gap-2 justify-items-center mt-2">
            <div className="flex flex-col items-center">
              <Droplets />
              <h2 className="text-base">{weather.main?.humidity}%</h2>
              <p className="text-sm">ความชื้น</p>
            </div>
            <div className="flex flex-col items-center">
              <Waves />
              <h2 className="text-base">{weather.main?.pressure}hPa</h2>
              <p className="text-sm">ความกดอากาศทะเล</p>
            </div>
            <div className="flex flex-col items-center">
              <Droplets />
              <h2 className="text-base">{weather.main?.grnd_level}hPa</h2>
              <p className="text-sm wh">ความกดอากาศพื้นดิน</p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
