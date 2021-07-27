const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

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
        await page.goto(urls[i]);
        const resultsSelector = '.oCCRx';
        const results = await page.$$eval(resultsSelector, el => el.map(el => el.getAttribute('src')));
        results.forEach(result => images.push(result));    
    }
    await browser.close(); 

    // Sending a receiving data in JSON format using GET method

    // var xhr = new XMLHttpRequest();
    // var url = "https://image-web-scraper-microservice.herokuapp.com/?data=" + encodeURIComponent(JSON.parse(JSON.stringify(images)));
    // xhr.open("GET", url, true);
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         var json = JSON.parse(xhr.responseText);
    //         console.log(json);
    //     }
    // };
    // xhr.send();
    // // images to localhost:5000/images
    app.get('/images', (req, res) => {
        //res.send(JSON.stringify({ ...images }));
        res.send(JSON.parse(JSON.stringify(images)));
    });
    const server = app.listen(5000)
    // console.log('Example app listening at http://localhost:%s', port);    
})();




