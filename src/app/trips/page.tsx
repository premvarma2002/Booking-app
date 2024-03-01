"use client";

import { TripType } from '@/types/trips';
import { USER_API_ROUTES } from '@/utils/api-routes';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Trips = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchCity = searchParams.get("city");
  const [trips, setTrips] = useState<TripType[]>([]);


  useEffect(()=> {
   const fetchData = async () => {
      const data = await axios.get(`${USER_API_ROUTES.GET_CITY_TRIPS}?city=${searchCity}`
      );
      console.log({data});
   }
    if(searchCity){
       fetchData();
    }
  },[searchCity])


  return (
    <div>Trips</div>
  )
};

export default Trips;