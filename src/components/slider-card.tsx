import React, { Suspense } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Image } from "@nextui-org/react";
import { ShieldAlert } from "lucide-react";

export default function Slidercard({ daily }: { daily: any }) {
  if (!daily) {
    return (
      <div className="flex justify-center my-auto">
        <h1 className="text-2xl font-semibold flex gap-2 items-center">
          <ShieldAlert />
          Somethig went wrong
        </h1>
      </div>
    );
  }

  console.log(daily);

  return (
    <section className="w-full py-2 mx-auto lg:px-12 md:px-12 sm:p-0">
      <Carousel
        className="max-w-4xl"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent>
          {daily.list?.map((day: any) => {
            const [date, time] = day.dt_txt.split(" ");
            const [hour, minute] = time.split(":");
            return (
              <CarouselItem
                className="lg:basis-1/3 max-md:basis-1/2 max-sm:basis-full"
                key={day.dt_txt}
              >
                <div className="item flex max-md:aspect-square flex-col border rounded-md p-4 border-slate-800 hover:border-slate-600 hover:shadow-sm hover:shadow-slate-500 duration-150 ease-in">
                  <div className="header lg:block max-lg:flex xl:flex items-center justify-between">
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
                  <h4 className="text-sm xl:ms-2 md:ms-2 lg:ms-0 max-sm:ms-2 sm:ms-2 text-slate-600">
                    เวลา: {hour}:{minute}
                  </h4>
                  {/* body card */}
                  <div className="border-t-1 border-slate-700 mt-2">
                    <div className="box w-full flex justify-between my-2">
                      <label htmlFor="" className="text-slate-400 text-sm">
                        อุณภูมิที่รู้สึก
                      </label>
                      <p>{day.main.feels_like.toFixed(0)}&#176;C</p>
                    </div>
                    <div className="box w-full flex justify-between my-2">
                      <label htmlFor="" className="text-slate-400 text-sm">
                        ความชื้น
                      </label>
                      <p>{day.main.humidity.toFixed(0)}&#176;C</p>
                    </div>
                    <div className="box w-full flex justify-between my-2">
                      <label htmlFor="" className="text-slate-400 text-sm">
                        อุณภูมิต่ำสุด
                      </label>
                      <p>{day.main.temp_min.toFixed(0)}&#176;C</p>
                    </div>
                    <div className="box w-full flex justify-between my-2">
                      <label htmlFor="" className="text-slate-400 text-sm">
                        อุณภูมิสูงสุด
                      </label>
                      <p>{day.main.temp_max.toFixed(0)}&#176;C</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <Suspense fallback={""}>
          <div className="button-carousel lg:block sm:hidden md:block max-sm:hidden">
            <CarouselPrevious className="hover:bg-white hover:text-black" />
            <CarouselNext className="hover:bg-white hover:text-black" />
          </div>
        </Suspense>
      </Carousel>
    </section>
  );
}
