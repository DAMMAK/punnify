import dns from "dns";
import urlparser from "url";
export default class URLShortnerService {
  checkIfUrlValid = (url: string): Promise<Boolean> => {
    console.log(url);
    const options = {
      family: 6,
      hints: dns.ADDRCONFIG | dns.V4MAPPED,
    };

    return new Promise((resolve, reject) => {
      dns.lookup(url, options, (error: any, address: any) => {
        console.log(error, address);

        if (error) {
          return reject(false);
        }
        resolve(true);
      });
    });
  };
}
