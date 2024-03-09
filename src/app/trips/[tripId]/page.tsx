"use client";

import { useAppStore } from "@/store";
import { TripType } from "@/types/trips";
import { USER_API_ROUTES } from "@/utils/api-routes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Trip = ({ params: { tripId } }: { params: { tripId: string } }) => {
  const router = useRouter();
  const { userInfo } = useAppStore();
  const [tripData, setTripData] = useState<TripType | undefined>(undefined);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const fetchTripData = async () => {
      const data = await axios.get(
        `${USER_API_ROUTES.GET_TRIP_DATA}?id=${tripId}`
      );
      if (data.data.id) {
        setTripData(data.data);
      }
    };
    if (tripId) {
      fetchTripData();
    }
  },[tripId]);
  return (
    <div>
      {tripData && (
        <>
          <div className="grid grid-cols-3 my-10 gap-10 mx-32">
            <div className="cols-span-2">Content</div>
            <div>Payment</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Trip;
