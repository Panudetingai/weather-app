import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Image } from "@nextui-org/react";

export default function Slidercard({ daily }: { daily: any }) {
  return (
    <section className="w-full py-2 mx-auto px-12">
      <Carousel
        className="max-w-4xl"
        // plugins={[
        //   Autoplay({
        //     delay: 4000,
        //   }),
        // ]}
      >
        <CarouselContent>
          {daily.list?.map((day: any, index: number) => {
            const [date, time] = day.dt_txt.split(" ");
            const [hour, minute] = time.split(":");
            return (
              <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
                <div className="item flex flex-col border rounded-md p-4 border-slate-800">
                  <div className="header flex items-center justify-between">
                    <div className="box-head flex-col">
                      <div className="flex logo items-center">
                        <Image
                          src={`https://openweathermap.org/img/wn/${day.weather?.[0].icon}@2x.png`}
                          width={50}
                        />
                        <h1 className="text-2xl font-semibold">
                          {day.main.temp.toFixed(0)}&#176;C
                        </h1>
                      </div>
                    </div>
                    <div className="">
                      <h1>
                        {daily.city.name} | {daily.city.country}
                      </h1>
                      <p className="text-sm text-slate-500">
                        {daily.list[0].weather[0].description}
                      </p>
                    </div>
                  </div>
                  <h4 className="text-sm ms-2 text-slate-600">
                    วันที่: {date}
                  </h4>
                  {/* body card */}
                  <div className="border-t-1 border-slate-700 mt-2">
                    <div className="box w-full flex justify-between my-2">
                      <label htmlFor="">รู้สึกเหมือน</label>
                      <p>{daily.list[0].main.feels_like}&#176;C</p>
                    </div>
                    <div className="box w-full flex justify-between my-2">
                      <label htmlFor="">รู้สึกเหมือน</label>
                      <p>{daily.list[0].main.feels_like}&#176;C</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

{
  /* <Carousel
      className="max-w-4xl"
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent className="">
        {daily.list?.map((day: any, index: number) => {
          const [date, time] = day.dt_txt.split(" ");
          const [hour, minute] = time.split(":");
          return (
            <CarouselItem
              className="flex flex-col aspect-square justify-center ml-2 lg:basis-1/3 sm:basis-1/2 items-center border rounded-md p-6 border-slate-800"
              key={index}
            >
              <h4 className="flex gap-2 my-1">{date}</h4>
              <div className="item-body">
                <Image
                  src={`https://openweathermap.org/img/wn/${day.weather?.[0].icon}@2x.png`}
                  width={50}
                ></Image>
                <h1 className="text-2xl font-semibold">
                  {day.main.temp.toFixed(0)}&#176;C
                </h1>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel> */
}
