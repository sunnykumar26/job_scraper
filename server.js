const express = require("express");
const { main } = require("./scraper");
const cron = require("node-cron");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;
const dataFilePath = path.join(__dirname, 'data_scraped.json');

let data = null; // Initialize data to null initially

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://mern-chat-user:dXW9hJ7UwZCRPc3A@cluster0.xn2vabl.mongodb.net/job_scraper?retryWrites=true&w=majority", {
  useNewUrlParser : true,
  useUnifiedTopology : true,
});

const scrapedDataSchema = new mongoose.Schema(
  {
    scraped_data : String,
  }
);

const scrapedData = mongoose.model("scrapedData", scrapedDataSchema);

// // Schedule the main function to run every day at 12:00 AM
// const job = cron.schedule('0 0 * * *', async () => {
//   try {
//     console.log("Running the main function at 12:00 AM...");
//     data = await main(); // Update the data variable with the new scraped data

//     // Save data to JSON file
//     fs.writeFileSync(dataFilePath, JSON.stringify(data), { flag: "w" });

//     console.log("Main function completed.");
//   } catch (error) {
//     console.error("Error running the main function:", error);
//   }
// }, {
//   scheduled: true,
//   timezone: 'Asia/Kolkata' // Adjust the timezone as needed
// });

// // Start the cron job
// job.start();

// Endpoint to get the scraped data
app.get("/scraper", async(req, res) => {
  try {
    // Check if data is available
    const dataFromDatabase = await scrapedData.findOne();
    console.log(dataFromDatabase);

    if (dataFromDatabase) {
      res.json(dataFromDatabase);
    } else {
      res.json({ message: "Data not available. Run the /trigger-scrape endpoint to manually trigger the scraping process." });
    }
  } catch (error) {
    console.error("Error handling /scraper request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// // API endpoint to serve the saved JSON data
// app.get("/api/data", (req, res) => {
//   try {
//     // Read the JSON file and send its content
//     const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
//     const parsedData = JSON.parse(jsonData);
//     res.json(parsedData);
//   } catch (error) {
//     console.error("Error serving /api/data request:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Trigger the scraping process manually
// app.get("/trigger-scrape", async (req, res) => {
//   try {

//     console.log("Manually triggering the scraping process...");
//     data = await main(); // Update the data variable with the new scraped data

//     try {
//       const str_data = JSON.stringify(data);
//       const newScrapedData = new scrapedData({ scraped_data : str_data});
//       await newScrapedData.save();
//       res.status(201).json({ message: "newScrapedData stored successfully !"});

//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Internal Server Error"});
    
//     }
//     // Save data to JSON file
//     fs.writeFileSync(dataFilePath, JSON.stringify(data), { flag: "w" });

//     res.json({ message: "Scraping process triggered successfully." });
//   } catch (error) {
//     console.error("Error triggering the scraping process:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/trigger-scrape", async (req, res) => {
  try {
    console.log("Manually triggering the scraping process...");
    data = await main(); // Update the data variable with the new scraped data

    const str_data = JSON.stringify(data);
    // const newScrapedData = new scrapedData({ scraped_data: str_data });
    // await newScrapedData.save();

    const updatedData = await scrapedData.findOneAndUpdate(
      {}, // Match all documents
      { $set: { scraped_data: str_data } }, // Update the 'scraped_data' field
      { new: true, upsert: true } // Return the modified document, and create a new one if it doesn't exist
    );



    // Only send a response once
    res.status(201).json({ message: "newScrapedData stored successfully !" });
  } catch (error) {
    console.error("Error triggering the scraping process:", error);
    // Handle errors appropriately
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});






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


// const express = require("express");
// const { main } = require("./scraper");
// const cron = require("node-cron");
// const cors = require("cors");
// const app = express();
// const path = require("path");
// require("dotenv").config();
// const PORT = process.env.PORT || 4000;

// let data = null; // Initialize data to null initially

// app.use(cors());
// app.use(express.json());

// // Schedule the main function to run every day at 12:00 AM
// // const job = cron.schedule('*/40 * * * * *', async () => {
// //   try {
// //     console.log("Running the main function at 12:00 AM...");
// //     data = await main(); // Update the data variable with the new scraped data
// //     console.log("Main function completed.");
// //   } catch (error) {
// //     console.error("Error running the main function:", error);
// //   }
// // }, {
// //   scheduled: true,
// //   timezone: 'Asia/Kolkata' // Adjust the timezone as needed
// // });

// // job.start();

// app.get("/scraper", (req, res) => {
//   try {
//     // Check if data is available
//     if (data) {
//       res.json(data);
//     } else {
//       res.json({ message: "Data not available. Run the /trigger-scrape endpoint to manually trigger the scraping process." });
//     }
//   } catch (error) {
//     console.error("Error handling /scraper request:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/trigger-scraper", async (req, res) => {
//   try {
//     console.log("Manually triggering the scraping process...");
//     data = await main(); // Update the data variable with the new scraped data
//     res.json({ message: "Scraping process triggered successfully." });
//   } catch (error) {
//     console.error("Error triggering the scraping process:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/", (req, res) => {
//   res.send("Render Puppeteer server is up and running!");
// });

// // app.use(express.static(path.join(__dirname, '/frontend/client/dist')));

// // app.get('/', (req, res) => {
// //   res.sendFile(path.join(__dirname + '/frontend/client/dist/index.html'));
// // });


// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });
