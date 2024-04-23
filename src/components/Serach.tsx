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
  const [valuetext, setvaluetext] = useState('');
  const [city, setCity] = useState([]);

  React.useEffect(() => {
    const fetchcity = async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q='${valuetext}'&limit=5&lang=th&appid=${process.env.NEXT_PUBLIC_WEARHER_KEY}`
      );
      setCity(res.data);
    };

    fetchcity();

    if (value) {
      value(valuetext);
    }
  }, [valuetext]);

  // console.log(city.map((item: any) => console.log(item.local_names?.th)));

  return (
    <>
      <Autocomplete
        onInputChange={setvaluetext}
        defaultInputValue={valuetext}
        classNames={{
          base: "max-w-xs",
          listboxWrapper: "max-h-[320px]",
          selectorButton: "text-default-500",
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
        startContent={
          <SearchIcon
            className="text-default-400"
            strokeWidth={2.5}
            size={20}
          />
        }
        radius="full"
        variant="bordered"
      >
        {city.map((item: any) => (
          <AutocompleteItem key={item.name + item.state} textValue={item.local_names?.th +','+ item.state}>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">
                    {item.local_names?.th} {item.state}
                  </span>
                  <span className="text-tiny text-default-400">{item.local_names?.en} {item.state}</span>
                </div>
              </div>
            </div>
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  );
}
