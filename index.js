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

// home page
app.get('/', (req, res) => res.send("Welcome to Nature Image Web Scraper(Author: Hae-Ji Park). \n\n\n" +
    "Go to '/a-nature-image' to get a nature image randomly. \n\n" +
    "Go to '/a-set-of-nature-images' to get a set of nature images randomly (About 8 images)."));

// a nature image
app.get('/a-nature-image', (req, res) => {
    (async () =>{
        let a_set_images = [];
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(urls[Math.floor(Math.random() * urls.length)], {
            waitUntil: 'networkidle2',  
            timeout: 60000000
        });

        const resultsSelector = '.oCCRx';
        const imageUrl = await page.evaluate(() => document.querySelector('.oCCRx').getAttribute('src'));
        res.send(JSON.stringify({'imageUrl': imageUrl}));

        await browser.close();  
    })();
});

// eight to ten nature images
app.get('/a-set-of-nature-images', (req, res) => {
    (async () =>{
        let a_set_images = [];
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
            
        await page.goto(urls[Math.floor(Math.random() * urls.length)], {
            waitUntil: 'networkidle2',  
            timeout: 60000000
        });
        const resultsSelector = '.oCCRx';
        const results = await page.$$eval(resultsSelector, el => el.map(el => el.getAttribute('src')));
        results.forEach(result => a_set_images.push(result)); 
        res.send(JSON.parse(JSON.stringify(a_set_images)));
            
        await browser.close();  
    })();
});

var server_port = process.env.PORT || 8080;
    
app.listen(server_port, function() {
    console.log('Listening on port %d', server_port);
});