var express = require('express');
var app = express();
var ejs = require('ejs');
var random = require('random-id');
var _ = require('lodash');
var port = process.env.PORT || 4000;
var database = require('./database/database');
var urlModel = require('./model/url');

database.connect();

app.use(express.static('public'));
app.set('view-engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get("/", (req, res) => {
    console.log(req.headers, "reqq")
    res.sendFile(__dirname + '/views/index.html')
});

app.get("/:address", (req, res) => {
    let response = {};
    urlModel.findOne({
        url_id: req.params.address
    }, (err, url) => {
        if (err) throw err;
        if (!url) {
            response.message = `The Url ${req.params.address} doesnt exist on our server`
            return res.render('result.html', {
                url: response
            })
        } else {
            return res.redirect(`http://${url.original_url}`)
        }
    })
});

app.get("/new/:address", (req, res) => {
    let response = {}

    urlModel.findOne({
        original_url: req.params.address
    }, (err, url) => {
        if (err) throw err;
        if (url) {
            response.message = `The Url ${url.original_url} already exists`
            return res.render('result.html', {
                url: response
            })
        } else {
            const urlObj = {}
            urlObj.url_id = random(5);
            urlObj.original_url = req.params.address;
            urlObj.short_url = `${req.host}/${urlObj.url_id}`;

            const url = new urlModel(urlObj);

            url.save(err => {
                if (err) throw err
                return res.render('result.html', {
                    url: urlObj
                });
            })
        }
    })

})

// listen for requests :)
var listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});