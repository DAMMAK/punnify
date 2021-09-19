import dns from "dns";
import { URL } from "url";

export default class URLShortnerService {
  checkIfUrlValid = (url: string): Promise<Boolean> => {
    var newUrl: string | null = null;
    var urlObj = new URL(newUrl ?? url);
    console.log("URL OBJECT =>", url);

    return new Promise((resolve) => {
      dns.lookup(urlObj.host!, (error: any, address: any) => {
        if (error) {
          return resolve(false);
        }
        resolve(true);
      });
    });
  };
}
