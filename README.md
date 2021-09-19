# Punnify

URL shortener service

## How to run

```bash
npm install

#to run in dev mode
npm run  dev

# to run in prod mode
npm start
```

## Usage

it has 3 available endpoints routes. `/getUrls`, `/getUrl` , `/`

### /getUrls

this endpoint return all the available url data from the database

Http Method: `GET`

example response

```Javascript
{
"data": [
{
"_id": "61476c8d2ade7ff56b35b593",
"fullUrl": "http://google.com",
"shortUrl": "HwFEnrCV",
"visited": 3,
"__v": 0
},
{
"_id": "61476e512ade7ff56b35b5af",
"fullUrl": "http://quickteller-merchant-ui.k8.isw.la/",
"shortUrl": "oqy29Kye",
"visited": 2,
"__v": 0
},
{
"_id": "61476cb32ade7ff56b35b597",
"fullUrl": "http://stackoverflow.com",
"shortUrl": "wl-k3wJk",
"visited": 1,
"__v": 0
},
{
"_id": "61476dda2ade7ff56b35b5a6",
"fullUrl": "http://calendar.google.com",
"shortUrl": "1OS1Lx1B",
"visited": 1,
"__v": 0
},
{
"_id": "614777dff4423560b6936fcd",
"fullUrl": "http://docs.google.com/document/d/1VEhuVK2K3v6IoSa8LPair6Bqo6BxWt7h7nCze34vPOg/edit",
"shortUrl": "cD3Sr8H9",
"visited": 0,
"__v": 0
}
]
}
```

### /getUrl

this endpoint returns URL data of using the `shortUrl` as the param criteria

example request: `http://localhost:5000/HwFEnrCV`

example response

```Javascript
{
"fullUrl": "http://google.com",
"shortUrl": "HwFEnrCV"
}
```

### /getUrl [POST]

this endpoint allows user to shorten URL

Http Method: `POST`

example request:

```Javascript

{
    "url": "google.com"
}
```

example response

```Javascript
{
"fullUrl": "http://google.com",
"shortUrl": "HwFEnrCV"
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
