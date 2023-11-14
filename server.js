// testing codes please ignore

// const express = require("express");
// const { main } = require("./scraper");
// const cors = require("cors");
// const app = express();
// const PORT = process.env.PORT || 4000;

// app.use(cors());
// app.use(express.json());

// let data = main();
// app.get("/scraper", (req, res) => {
//     // main(res);
//     res.send(JSON.stringify(data));
//   });

// app.get("/", (req, res) => {
//   res.send("Render Puppeteer server is up and running!");

// });

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });





// const express = require("express");
// const { main } = require("./scraper");
// const cors = require("cors");
// const app = express();
// const PORT = process.env.PORT || 4000;

// app.use(cors());
// app.use(express.json());

// let data; // Declare the variable without assigning a value

// // Call the main function when the server starts



// const cron = require('node-cron');


// const func = main().then((result) => {
//   data = result;
//   console.log("Scraping done on server start");
// });

// const job = cron.schedule('*/40 * * * * *', func, {
//     scheduled: true,
//     timezone: 'Asia/Kolkata'
// });

// job.start();


// app.get("/scraper", async (req, res) => {
//   try {
//     // Check if data is available
//     if (data) {
//       res.json(data);
//     } else {
//       // If data is not available, perform scraping
//       const newData = await main();
//       res.json(newData);
//     }
//   } catch (error) {
//     console.error("Error handling /scraper request:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/", (req, res) => {
//   res.send("Render Puppeteer server is up and running!");
// });

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });


// end of testing code


const express = require("express");
const { main } = require("./scraper");
const cron = require("node-cron");
const cors = require("cors");
const app = express();
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

let data = null; // Initialize data to null initially

app.use(cors());
app.use(express.json());

// Schedule the main function to run every day at 12:00 AM
cron.schedule('0 0 * * *', async () => {
  try {
    console.log("Running the main function at 12:00 AM...");
    data = await main(); // Update the data variable with the new scraped data
    console.log("Main function completed.");
  } catch (error) {
    console.error("Error running the main function:", error);
  }
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata' // Adjust the timezone as needed
});

app.get("/scraper", (req, res) => {
  try {
    // Check if data is available
    if (data) {
      res.json(data);
    } else {
      res.json({ message: "Data not available. Run the /trigger-scrape endpoint to manually trigger the scraping process." });
    }
  } catch (error) {
    console.error("Error handling /scraper request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/trigger-scrape", async (req, res) => {
  try {
    console.log("Manually triggering the scraping process...");
    data = await main(); // Update the data variable with the new scraped data
    res.json({ message: "Scraping process triggered successfully." });
  } catch (error) {
    console.error("Error triggering the scraping process:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get("/", (req, res) => {
//   res.send("Render Puppeteer server is up and running!");
// });

app.use(express.static(path.join(__dirname, '/frontend/client/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/client/dist/index.html'));
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
