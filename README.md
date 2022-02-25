# Nature Image Web Scraper

OSU CS361 Project - Nature Image Web Scraper using puppeteer.
Returns nature image URLs.

- **/** : home page

- **/a-nature-image**: Get only one nature image URL 

(It takes <3 seconds on my local computer. But it takes about 10 seconds on my private website deployed by Google Cloud)

- **/a-set-of-nature-images**: Get about 8 nature image URLs at once 

(It takes <3 seconds on my local computer. But it takes about 10 seconds on my private website deployed by Google Cloud)


## To deploy on google cloud
1. Replace the word ".oCCRx" in the "index.js" with appropriate image class name at https://unsplash.com/ (They sometimes change.)
1. Rename "index.js" to "server.js" (In order to use "npm start" without error)
2. Follow the instruction at https://cloud.google.com/nodejs/getting-started
