const puppeteer = require("puppeteer");
const url = "https://www.sarkariexam.com/category/top-online-form";
const fs = require("fs");
const {main} = require("./sraper_v1");

const express = require("express");
const path = require("path");

const app = express();

const cron = require('node-cron');

const job = cron.schedule('0 0 * * *', main, {
    scheduled: true,
    timezone: 'Asia/Kolkata'
});

job.start(); 

const PORT = 4000;

app.use(express.static(path.join(__dirname, './frontend/job_scraper_frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + './frontend/job_scraper_frontend/dist/index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});