// @ts-nocheck
import {
  DestinationDetailsType,
  DestinationItineraryType,
  DetailedItineraryType,
  PackageItineraryType,
} from "@/types/trips";
import { Page } from "puppeteer";

interface PackageInfo {
  id: string | null;
  name: string;
  nights: number;
  days: number;
  inclusions: string[];
  price: number;
}

interface PackageDetailsType {
  description: string;
  images: string[];
  themes: string[];
  detailedItinerary: DetailedItineraryType[];
  destinationItinerary: DestinationItineraryType[];
  destinationDetails: DestinationDetailsType[];
  packageItinerary: PackageItineraryType[];
}

export const startPackageScraping = async (page: Page, pkg: PackageInfo) => {
  const packageDetails = await page.evaluate(() => {
    const packageDetails: PackageDetailsType = {
      description: "",
      images: [],
      themes: [],
      detailedItinerary: [],
      destinationItinerary: [],
      destinationDetails: [],
      packageItinerary: [],
    };

    const packageElement = document.querySelector("#main-container");
    const descriptionSelector = packageElement?.querySelector("#pkgOverView");
    const regex = new RegExp("Yatra", "gi");
    descriptionSelector?.querySelector(".readMore disBlk")?.click();
    packageDetails.description = packageElement
      ?.querySelector("#pkgOverView p")
      ?.innerHTML.replace(regex, "Arklyte") as String;

    packageDetails.images = Array.from(
      packageElement?.querySelectorAll("galleryThumbImg")
    ).map((imageElement) =>
      imageElement
        .getAttribute("src")
        ?.replace("/t_holidays_responsivedetailsthumbimg", "")
    ) as String[];

    const themesSelector = packageElement?.querySelector("#packageThemes");
    packageDetails.themes = Array.from(
      themesSelector?.querySelectorAll("li")
    ).map((li) => li.innerText.trim());

    const dayElements = packageElement?.querySelectorAll(
      ".itineraryOverlay .subtitle"
    );

    dayElements?.forEach((dayElement) => {
      const title = dayElement.textContent!.trim();
      const value = [];

      // Get the nexxt sibling elements untill the next day element
      let nextElement = dayElement.nextElementSibling;
      while (nextElement && !nextElement.classList.contains("subtitle")) {
        const textContent = nextElement.textContent!.trim();
        if (textContent) {
          value.push(textContent);
        }
        nextElement = nextElement.nextElementSibling;
      }

      // Push the title and value into the result array
      descriptions.push({ title, value });
    });

    packageDetails.detailedItinerary = descriptions;

    const destinationItinerary: { place: string; totalNights: number }[] = [];

    const destinationItinerarySelector =
      packageElement?.querySelectorAll(".type-list li");

    destinationItinerarySelector?.forEach((element) => {
      const placeElement = element.firstChild;
      const placeText = placeElement
        ?.textContent!.trim()
        .replace(/[\n\t]/g, "");
      const nightsElement = element.querySelector("span");
      let totalNights = 0;
      if (nightsElement) {
        const nightsText = nightsElement?.textContent!.trip();
        const nightsMatch = nightsText.match(/\d+/);
        totalNights = nightsMatch ? parseInt(nightsMatch[0]) : 0;
      }
      destinationItinerary.push({ place: placeText!, totalNights });
    });

    packageDetails.destinationItinerary = destinationItinerary;

    const cities: { name: string; description: string; image: string }[] = [];

    const readMoreButton = document.getElementById("readMore");
    if (readMoreButton) {
      readMoreButton.click();
    }

    const cityElements = document.querySelectorAll(".tabbing a");
    cityElements.forEach((cityElement) => {
      cityElement.click();
      const readMoreButtonCity = document.getElementById("readMore");
      if (readMoreButtonCity) {
        readMoreButtonCity.click();
      }

      const cityName = cityElement?.textContent!.trim();
      const cityDescription = document
        .getElementById("aboutDestPara")
        ?.textContent!.trim();
      const cityimage = document
        .querySelector(".info-block img")!
        .getAttribute("src");

        cities.push({
          name: cityName,
          description: cityDescription, 
          image: cityimage,
        });
    });

    packageDetails.destinationDetails = cities;

    const dataExtracted: PackageItineraryType[] = [];
    const timeline = document.querySelector(".time-line .right-column");
    const articles = timeline?.querySelectorAll("article");

    articles?.forEach((article) => {
      const cityNameElement = article.querySelector(
        ".title.row.acc-title .first.ng.binding"
      );
       const cityName = cityNameElement
        ? cityNameElement?.textContent!.trim()
        : "";
       const daysSelector = article.querySelectorAll(".days.acc-content");
       const daysActivity: {
         activityType: string;
         activityDescription: string;
       }[][] = [];
    });
      
    });

    return packageDetails;
  });

  const details = { ...pkg, ...packageDetails };
  return details;
};
