// Author: Hae-Ji Park (github.com/positive235)
// Date: Jul 2021
// Summary: Nature image web scraping

const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

const urls = [
    'https://unsplash.com/s/photos/natural',
    'https://unsplash.com/s/photos/nature',
    'https://unsplash.com/s/photos/landscape',
    'https://unsplash.com/s/photos/beach',
    'https://unsplash.com/s/photos/sky',
    'https://unsplash.com/s/photos/mountains',
    'https://unsplash.com/s/photos/desert',
    'https://unsplash.com/s/photos/water',
    'https://unsplash.com/s/photos/ocean',
    'https://unsplash.com/s/photos/forest',
    'https://unsplash.com/s/photos/flowers',
    'https://unsplash.com/s/photos/grass',
    'https://unsplash.com/s/photos/flower-garden',
    'https://unsplash.com/s/photos/vegetation'
]

var images = [];

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (var i = 0; i < urls.length; i++) {
        //await page.goto(urls[i]);
        await page.goto(urls[i], {
            waitUntil: 'networkidle2',
            timeout: 6000000
        });
        const resultsSelector = '.oCCRx';
        const results = await page.$$eval(resultsSelector, el => el.map(el => el.getAttribute('src')));
        results.forEach(result => images.push(result));    
    }
    await browser.close(); 

    // home page
    app.get('/', (req, res) => res.send("Welcome to Nature Image Web Scraper(Author: Hae-Ji Park). \n\n\n" +
        "Go to '/a-nature-image' to get a nature image randomly. \n\n" +
        "Go to '/all-nature-images' to get about 100 nature images."));   
    
    app.get('/a-nature-image', (req, res) => {
        a_random_image = images[Math.floor(Math.random() * images.length)]
        res.send(JSON.stringify(a_random_image));
    });

    app.get('/all-nature-images', (req, res) => {
        //res.send(JSON.stringify({ ...images }));
        res.send(JSON.parse(JSON.stringify(images)));
    });

    var server_port = process.env.PORT || 3000;
    
    app.listen(server_port, function() {
        console.log('Listening on port %d', server_port);
    })

})();