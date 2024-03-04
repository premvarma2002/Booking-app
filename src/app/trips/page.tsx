"use client";

import { TripType } from "@/types/trips";
import { USER_API_ROUTES } from "@/utils/api-routes";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

const Trips = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchCity = searchParams.get("city");
  const [trips, setTrips] = useState<TripType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `${USER_API_ROUTES.GET_CITY_TRIPS}?city=${searchCity}`
      );
      if (data.data.trips) setTrips(data.data.trips);
    };
    if (searchCity) {
      fetchData();
    }
  }, [searchCity]);

  return (
    <div className="m-10 px-[5vw] min-h-[80vh]">
    <Button
      className="my-5"
      variant="shadow"
      color="primary"
      size="lg"
      onClick={() => router.push("/")}
    >
      <FaChevronLeft />
      Go Back
    </Button>
    <div className=" grid grid-cols-2 gap-5">
      {trips.map((trip) => (
        <div
          key={trip.id}
          className="grid grid-cols-9 gap-5 rounded-2xl border border-neutral-300 cursor-pointer"
          onClick={() => router.push(`/trips/${trip.id}`)}
        >
          {/* Image */}
          <div className="relative w-full h-48 col-span-3 ">
            <Image
              src={trip.images[0]}
              alt="trip"
              fill
              className="rounded-2xl"
            />
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
