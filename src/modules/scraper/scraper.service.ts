import { Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";
import { IGoogleMapsData } from "./scraper.interface";

@Injectable()
export class ScraperService{
    constructor(){}

    public async scrapeGoogleMapsData(searchTerm: string, itemTargetCount: number): Promise<IGoogleMapsData[]>{
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--disabled-setuid-sandbox", "--no-sandbox"],
        });
    
        const page = await browser.newPage();
         
         
        await page.goto(`https://www.google.com/maps/search/${searchTerm}/@8.8508731,7.8802716,17z` , {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
         
        let scrapedData =  await this.justKeepScrolling(page, ".m6QErb[aria-label]", itemTargetCount);
         
        // console.log(scrapedData);
        // console.log("data length", scrapedData.length);
    
        await browser.close();

        return scrapedData;
    }

    private async justKeepScrolling(page, scrollClass: string, itemTargetCount: number) {
        let items = [];
        let previousHeight = await page.evaluate(`document.querySelector("${scrollClass}").scrollHeight`);
        while (itemTargetCount > items.length) {
            items = await this.extractItems(page);
            await page.evaluate(`document.querySelector("${scrollClass}").scrollTo(0, document.querySelector("${scrollClass}").scrollHeight)`);
            await page.evaluate(`document.querySelector("${scrollClass}").scrollHeight > ${previousHeight}`);
            
        }
        return items;
    }

    private async extractItems(page) {
        let maps_data = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".Nv2PK")).map((el) => {
                const link = el.querySelector("a.hfpxzc").getAttribute("href");
                return {
                    title: el.querySelector(".qBF1Pd")?.textContent.trim(),
                    address: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:last-child")?.textContent.replaceAll("·", "").trim(),
                    latitude: link.split("!8m2!3d")[1].split("!4d")[0],
                    longitude: link.split("!4d")[1].split("!16s")[0],
                    link,
                    placeId: link.split("19s")[1].split("?authuser")[0],
                }
            });
        });
        return maps_data;
    }    
    
}