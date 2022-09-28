const PORT = 8000

// Create HTTP requests
const axios = require('axios')

// Loads html using cheerio implementation of JQuery
const cheerio = require('cheerio')

// Backend framework of node to run server
const express = require('express')

// Run express
const app = express()

// Choose website to scrape
const url = 'https://www.nytimes.com/'
// Store attributes to scrape
const articles = []


axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        $('.story-wrapper', html).each(function() {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push ({
                title,
                url
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))