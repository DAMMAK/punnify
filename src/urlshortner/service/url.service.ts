import dns from "dns";
import { URL } from "url";
import isValidDomain from "is-valid-domain";

export default class URLShortnerService {
  checkIfUrlValid = (url: string): Promise<Boolean> => {
    var newUrl: string | null = null;
    // if url does not contain protocol default it to http://
    if (url.substring(0, 3) !== "http") newUrl = `http://${url}`;
    var urlObj = new URL(newUrl ?? url);

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
