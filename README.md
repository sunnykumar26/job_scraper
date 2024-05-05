
# Job Scraper

Job Scraper is the server-side component of the Job Scraper application. It provides functionality for web scraping job information from a specific website and storing the scraped data in a MongoDB database. This repository contains the code for handling requests, managing data, and implementing business logic.

## Overview

The backend application is built using Node.js and Express.js framework. It utilizes Puppeteer for web scraping and connects to a MongoDB database to store the scraped job data. Endpoints are provided for fetching the scraped data and triggering the scraping process manually.

![scraper_backend](https://github.com/sunnykumar26/job_scraper/assets/113859373/135369bd-f58f-4792-8567-26613d67b705)
## Prerequisites

Before running the backend server, ensure you have the following prerequisites installed on your machine:

- Node.js and npm (Node Package Manager)
- MongoDB (Make sure MongoDB server is running)

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```
2. install the npm packages
   ```
   npm install
   ```
3.Run frontend
   ```
   cd frontend
   cd client
   npm run dev
   ```
3. Run backend
   ```
   nodemon server.js
   ```


![Untitled-2024-05-06-0149](https://github.com/sunnykumar26/job_scraper/assets/113859373/0f21a770-32e5-4d88-99d8-2fb35a146c43)
