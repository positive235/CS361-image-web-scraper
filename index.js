// Author: Hae-Ji Park (github.com/positive235)
// Date: Jul 2021
// Summary: Nature image web scraping

// Fix for DigitalOcean: https://stackoverflow.com/questions/59979188/error-failed-to-launch-the-browser-process-puppeteer
// Fix for DigitalOcean: sudo apt-get install chromium-browser

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
    console.log("got here1");
    // FIX for DO: https://stackoverflow.com/questions/59979188/error-failed-to-launch-the-browser-process-puppeteer
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser'
    });

    const page = await browser.newPage();
    
    for (var i = 0; i < urls.length; i++) {
        await page.goto(urls[i], {
            waitUntil: 'networkidle2',  // Add this to fix timeout errors? Takes a very long time for line 26 to execute
            timeout: 600000000
        });
        const resultsSelector = '.oCCRx';
        const results = await page.$$eval(resultsSelector, el => el.map(el => el.getAttribute('src')));
        results.forEach(result => images.push(result));
    }
    await browser.close();


    app.get('/', (req, res) => res.send('Welcome to Nature Image Web Scraper(Author: Hae-Ji Park).' +
    "Go to '/images' to get about 100 nature image URLs."))

    app.get('/images', (req, res) => {
        //res.send(JSON.stringify({ ...images }));
        res.send(JSON.parse(JSON.stringify(images)));
    });

    var server_port = process.env.PORT || 3000;

    app.listen(server_port, function() {
        console.log('Listening on port %d', server_port);
    })

})();



// // home page
// app.get('/', (req, res) => res.send("Welcome to Nature Image Web Scraper(Author: Hae-Ji Park). \n\n\n" +
//     "Go to '/a-nature-image' to get a nature image randomly. \n\n" +
//     "Go to '/a-set-of-nature-images' to get a set of nature images randomly (About 8 images)."));

// // a nature image
// app.get('/a-nature-image', (req, res) => {
//     (async () =>{
//         let a_set_images = [];
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.goto(urls[Math.floor(Math.random() * urls.length)], {
//             waitUntil: 'networkidle2',  
//             timeout: 60000000
//         });
//         //await page.goto(urls[Math.floor(Math.random() * urls.length)]);
//         const resultsSelector = '.oCCRx';
//         const imageUrl = await page.evaluate(() => document.querySelector('.oCCRx').getAttribute('src'));
//         res.send(JSON.stringify({'imageUrl': imageUrl}));
        
//         // const results = await page.$$eval(resultsSelector, el => el.map(el => el.getAttribute('src')));
//         // results.forEach(result => a_set_images.push(result)); 
//         // a_random_image = a_set_images[Math.floor(Math.random() * a_set_images.length)]
//         //res.send(JSON.stringify(a_random_image));

//         await browser.close();  
//     })();
// });

// // eight to ten nature images
// app.get('/a-set-of-nature-images', (req, res) => {
//     (async () =>{
//         let a_set_images = [];
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
            
//         //await page.goto(urls[Math.floor(Math.random() * urls.length)]);
//         await page.goto(urls[Math.floor(Math.random() * urls.length)], {
//             waitUntil: 'networkidle2',  
//             timeout: 60000000
//         });
//         const resultsSelector = '.oCCRx';
//         const results = await page.$$eval(resultsSelector, el => el.map(el => el.getAttribute('src')));
//         results.forEach(result => a_set_images.push(result)); 
//         res.send(JSON.parse(JSON.stringify(a_set_images)));
            
//         await browser.close();  
//     })();
// });
    
// // all nature images (about 100)
// app.get('/all-nature-images', (req, res) => {
//     (async () =>{
//         let all_images = [];
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         for (var i = 0; i < urls.length; i++) {
//             await page.goto(urls[i]);
//             const resultsSelector = '.oCCRx';
//             const results = await page.$$eval(resultsSelector, el => el.map(el => el.getAttribute('src')));
//             results.forEach(result => all_images.push(result));    
//         }
//         res.send(JSON.parse(JSON.stringify(all_images)));
//         await browser.close();
//     })();        
// });

// var server_port = process.env.PORT || 3000;
    
// app.listen(server_port, function() {
//     console.log('Listening on port %d', server_port);
// });