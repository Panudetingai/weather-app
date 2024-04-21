"use client";
import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
} from "@nextui-org/react";

export default function Search({
  value,
}: {
  value: ((valuetext: string | undefined) => void) | null | undefined;
}) {
  const [valuetext, setvaluetext] = useState("แม่สรวย, เชียงราย");
  const [city, setCity] = useState([]);
  React.useEffect(() => {
    const fetchcity = async () => {
      const res = await axios.get(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
      );
      setCity(res.data);
    };
    fetchcity();

    if (value) {
      value(valuetext);
    }
  }, [valuetext]);

  const datalist = city.map((citys: any) => citys);

  function getCity(datalist: any) {
    const cityitems = datalist.map((cityitems: any) => {
      return cityitems.amphure.map((itemcity: any) => {
        return {
          provider: { th: cityitems.name_th, en: cityitems.name_en },
          city: { th: itemcity.name_th, en: itemcity.name_en },
        };
      });
    });

    return cityitems;
  }

  const getcity = getCity(datalist);

  return (
    <>
      <Autocomplete
        onInputChange={setvaluetext}
        defaultInputValue={valuetext}
        classNames={{
          base: "max-w-xs",
          listboxWrapper: "max-h-[320px]",
          selectorButton: "text-default-500"
        }}
        inputProps={{
          classNames: {
            input: "ml-1",
            inputWrapper: "h-[48px]",
          },
        }}
        listboxProps={{
          hideSelectedIcon: true,
          itemClasses: {
            base: [
              "rounded-medium",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "dark:data-[hover=true]:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[hover=true]:bg-default-200",
              "data-[selectable=true]:focus:bg-default-100",
              "data-[focus-visible=true]:ring-default-500",
            ],
          },
        }}
        aria-label="Select an employee"
        placeholder="Enter employee name"
        popoverProps={{
          offset: 10,
          classNames: {
            base: "rounded-large",
            content: "p-1 border-small border-default-100 bg-background",
          },
        }}
        startContent={<SearchIcon className="text-default-400" strokeWidth={2.5} size={20} />}
        radius="full"
        variant="bordered"
      >
        {getcity.map((item: any) => {
          return item.map((cityitem: any) => (
            <AutocompleteItem
              key={cityitem.id}
              textValue={
                cityitem.city.th + "," + cityitem.provider.th
              }
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <span className="text-small">
                      {cityitem.provider.th} {cityitem.city.th}
                    </span>
                    <span className="text-tiny text-default-400">
                      {cityitem.provider.en} {cityitem.city.en}
                    </span>
                  </div>
                </div>
              </div>
            </AutocompleteItem>
          ));
        })}
      </Autocomplete>
    </>
  );
}
