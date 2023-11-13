const cron = require('node-cron');
const task = () => {
};

const job = cron.schedule('0 0 * * *', task, {
    scheduled: true,
    timezone: 'Asia/Kolkata'
});

job.start(); 