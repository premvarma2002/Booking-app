import { Page } from "puppeteer";

interface PackageInfo {
  id: string | null;
  name: string;
  nights: number;
  days: number;
  inclusions: string[];
  price: number;
}

export const startLocationScraping = async (
  page: Page
): Promise<PackageInfo[]> => {
  return await page.evaluate(() => {
    const packageElements = document.querySelectorAll(".packages-container");
    const packages: PackageInfo[] = [];
    packageElements.forEach((packageElement) => {
      const packageInfo: PackageInfo = {
        id: null,
        name: "",
        nights: 0,
        days: 0,
        price: 0,
        inclusions: [],
      };

      const nameElement = packageElement.querySelector(
        ".package-name a"
      ) as HTMLAnchorElement;

      const href = nameElement.getAttribute("href");
      const packageIdMatch = href?.match(/packageId=([^&]+)/);
      packageInfo.id = packageIdMatch ? packageIdMatch[1] : null;
      packageInfo.name = packageInfo.name =
        (packageElement.querySelector(".package-name a") as HTMLElement)
          .textContent || "";

      const durationElement = packageElement.querySelector(".package-duration");

      packageInfo.nights = parseInt(
        (durationElement?.querySelector(".nights span") as HTMLElement)
          ?.textContent || "0"
      );

      packageInfo.days = parseInt(
        (durationElement?.querySelector(".days span") as HTMLElement)
          ?.textContent || "0"
      );

      const inclusionsElement = packageElement.querySelector(
        ".package-inclusions"
      );

      const inclusionItems = Array.from(
        inclusionsElement?.querySelectorAll("li") || []
      ).map(
        (item) =>
          (item.querySelector(".icon-name") as HTMLElement)?.textContent || ""
      );

      packageInfo.inclusions = inclusionItems;

      const priceElement = packageElement.querySelector(".final-price .amount");
      packageInfo.price = parseInt(
        priceElement?.textContent?.replace(/,/g, "") || "0"
      );

      packages.push(packageInfo);
    });
    return packages;
  });
};
