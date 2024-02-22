import { Page } from "puppeteer";

interface PackageInfo {
  id: string | null;
  name: string;
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
      };

      const nameElement = packageElement.querySelector(".package-name a") as HTMLAnchorElement;

      const href = nameElement.getAttribute("href");
      const packageIdMatch = href?.match(/packageId=([^&]+)/);
      packageInfo.id = packageIdMatch ? packageIdMatch[1] : null;
      packageInfo.name = packageInfo.name =  
        (packageElement.querySelector(".package-name a") as HTMLElement)
          .textContent || "";
          packages.push(packageInfo);
    });
    return packages;
  });
};

