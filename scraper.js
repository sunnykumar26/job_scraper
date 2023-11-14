    const puppeteer = require("puppeteer");
    const url = "https://www.sarkariexam.com/category/top-online-form";
    const fs = require("fs");

    const main = async(res) => {
        const browser = await puppeteer.launch({headless: true, defaultViewport: false});
        const page = await browser.newPage();
        await page.goto(url);

        await page.waitForSelector(".category-typepost div ul");
        // await page.waitForTimeout(5000);

        const products_link = await page.$$eval(".category-typepost div ul li", 
            
            el => {
                
                const links =  el.map(
                    el=> el.querySelector('a').getAttribute("href")
                );

                return links.slice(0,44); 
                // return links.slice(0,10); 
            }
        );

        // console.log(products_link);
        
        const completeData = [];
        for(let i of products_link) {
            await page.goto(i);
            
            const data = await page.evaluate(
                ()=> {

                    const full_page = document.querySelector("body > div.page_newloop > div.newmidpageloop > div.content-mid-sub > div > div").textContent;
                    // return {data : full_page};

                    const dataString = full_page.slice(170, full_page.length);

                    // Define the regular expressions to match specific patterns
                    const postNameRegex = /Vacancy Details for (.+?):\n/;
                    const lastDateRegex = /Last Date (.+?)\n/;
                    const maxAgeRegex = /Maximum – (\d+) Years/m;
                    const qualificationRegex = /Candidates who have (.+?).\n/;

                    // Extract relevant information using regex matches
                    const postNameMatch = dataString.match(postNameRegex);
                    const lastDateMatch = dataString.match(lastDateRegex);
                    const maxAgeMatch = dataString.match(maxAgeRegex);
                    const qualificationMatch = dataString.match(qualificationRegex);

                    // Ensure matches are found before accessing their groups
                    const postName = postNameMatch ? postNameMatch[1].trim() : "Not found";
                    const lastDate = lastDateMatch ? lastDateMatch[1].trim() : "Not found";
                    const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : "age as per rules";
                    const qualification = qualificationMatch ? qualificationMatch[1].trim() : "Not found";

                    const result = {
                            p: postName,
                            l: lastDate,
                            m: maxAge,
                            q: qualification,
                        };
                    
                    return result;
                }
            )
            if(data.p !== "Not found")
            {
                completeData.push(data);
            }

            await page.goBack();
        }

        // console.log(completeData);

        // fs.writeFile("data_scraped.json", JSON.stringify(completeData), {flag: "w"},(err) => {
        //     if(err) throw err;
        //     console.log("successfully saved data in file !");
        // })
        // res.send(JSON.stringify(completeData));
        
        await browser.close();
        return completeData
    }

    // main();


    // const cron = require('node-cron');

    // const job = cron.schedule('*/40 * * * * *', main, {
    //     scheduled: true,
    //     timezone: 'Asia/Kolkata'
    // });

    // job.start();

    module.exports = {main};