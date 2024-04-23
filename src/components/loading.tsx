'use client';
import { Spinner } from "@nextui-org/react";
import React from "react";
import { Puff } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner label="Loading" color="default" labelColor="foreground"/>
    </div>
  );
}
