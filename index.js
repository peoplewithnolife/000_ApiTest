// This uses https://deckofcardsapi.com/

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const port = 3000;

const app = express();

const baseUrl = "https://deckofcardsapi.com/api/";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, rsp) {
    rsp.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, rsp) {
    console.log("vvvvv Get a job");
    console.log(req.body);
    // shuffle a new deck 
    // https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
    var optionsShuffle = {
           url: baseUrl+"deck/new/shuffle/",
           method: "GET",
           qs: {
               deck_count:1
           }
        };
    
    request(optionsShuffle, function (error, rspParam, bodyParam) {
        var jsonData = JSON.parse(bodyParam);
        console.log(jsonData.deck_id);
        // Draw a card
        // https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
        var optionsDraw = {
            url: baseUrl + "deck/" + jsonData.deck_id +"/draw/",
            method: "GET",
            qs: {
                count:2
            }
        }
        request(optionsDraw, function (error, rspParam, bodyParam) {
            var jsonData = JSON.parse(bodyParam);
            console.log(jsonData.cards[0].suit);
            console.log(jsonData.cards[0].value);
        });
    });

    //rsp.write("<img src='' alt='Get a Job'></img>");
    rsp.write("<p>" + "Get a job" + "</p>");
    rsp.write("<h1>" + "Phil Sux" + "</h1>");
    rsp.send();
    console.log("^^^^^ Get a job");
});

app.listen(port, function () {
    console.log("Running on port: " + port);
});

