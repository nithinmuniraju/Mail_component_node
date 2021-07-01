var cron = require('node-schedule');
const { sendMail } = require('../utils/mailHook');

const cronHandler = function(to, subject, body, schedule){
    try{
        if(schedule === "") {
            /**
             * Scheduling job immediately if no scheduled datetime
            */
            sendMail(subject, body, to); 
        } else {
            /**
             * Scheduling job for given scheduled datetime
             * Format Ex: 2020-12-31T20:19:01
            */
            const scheduleDate = new Date(schedule).toString().split(' ');
            const week = scheduleDate[0];
            const month = scheduleDate[1];
            const day = scheduleDate[2];
    
            const getTime = scheduleDate[4].split(':');
            
            const hours = getTime[0];
            const minute = getTime[1];
            const sec = getTime[2];

            job = cron.scheduleJob(`${sec} ${minute} ${hours} ${day} ${month} ${week}`, async () => {
                sendMail(subject, body, to);
            });
        }
    } catch(err) {
        console.log('Exception-cronHandler::', err);
    }
}
module.exports = {
    cronHandler
}