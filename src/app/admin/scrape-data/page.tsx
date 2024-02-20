"use client";

import { ScrapingQueue } from "@/components/admin/scraping-queue";
import { apiClient } from "@/lib";
import { ADMIN_API_ROUTES } from "@/utils";

import {
    Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Listbox,
  ListboxItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { CurrentyScrapingTable } from "./components/currently-scraping-table";

const ScrapeTrips = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState<undefined | string>(
    undefined
  );
  const [jobs, setJobs] = useState([]);

  const searchCities = async (searchQuery: string) => {
    const response = await fetch(
      `https://secure.geonames.org/searchJSON?q=${searchQuery}&maxRows=5&username=prem&style=SHORT`
    );
    const parsed = await response.json();
    setCities(
      parsed?.geonames.map((city: { name: string }) => city.name) ?? []
    );
  };

  const startScraping = async () => {
    await apiClient.post(ADMIN_API_ROUTES.CREATE_JOB, {
      url:
        "https://packages.yatra.com/holidays/intl/search.htm?destination=" +
        selectedCity,
      jobType: { type: "location" },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const data = await apiClient.get(ADMIN_API_ROUTES.JOB_DETAILS);

      setJobs(data.data.jobs);
    };
    const interval = setInterval(() => getData(), 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="m-10 grid grid-cols-3 gap-5">
      <Card className="col-span-2">
        <CardBody>
          <Tabs>
            <Tab key="location" title="location">
              <Input
                type="text"
                label="Search for a location"
                onChange={(e) => {
                  searchCities(e.target.value);
                  setSelectedCity(e.target.value);
                }}
                value={selectedCity || ''}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && selectedCity) {
                    // Ensure selectedCity is not undefined or null
                    setSelectedCity((prev) => (prev ? prev.slice(0, -1) : ''));
                  }
                }}
              />
              <div className="w-full min-h-[200px] max-w-[260px] px-1 py-2 rounded-sm border border-default-200 mt-5">
                <Listbox onAction={(key) => setSelectedCity(key as string)}>
                  {cities.map((city) => (
                    <ListboxItem
                      key={city}
                      color="primary"
                      className="text-primary-500"
                      onClick={() => setSelectedCity(city)}
                    >
                      {city}
                    </ListboxItem>
                  ))}
                </Listbox>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
        <CardFooter className="flex flex-col gap-5">
            <div>
                {selectedCity &&<h1 className="text-xl">Scrape data for {selectedCity}</h1>}
            </div>
            <Button size="lg" className="w-full" color="primary" onClick={startScraping}>Scrape</Button>
        </CardFooter>
      </Card>
      <ScrapingQueue />
      <div className="col-span-3">
        <CurrentyScrapingTable jobs={jobs}/>
      </div>
    </section>
  );
};

export default ScrapeTrips;
