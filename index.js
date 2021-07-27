const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
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
    app.use(express.static(path.join(__dirname, 'public')))
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')
    app.get('/', (req, res) => res.send('hello'))
    
    app.get('/images', (req, res) => {
        //res.send(JSON.stringify({ ...images }));
        res.send(JSON.parse(JSON.stringify(images)));
    });
    var server_port = process.env.PORT || 3000;
    var server_host = '0.0.0.0';
    app.listen(server_port, server_host, function() {
        console.log('Listening on port %d', server_port);
    })
    //console.log('Example app listening at %s', port);    
})();





