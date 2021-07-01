const scheduler = require('../Utils/schedulerHook');

exports.sendMail = async (req, res, next) => {
   try{
        /* Request sample 
            {
                to: "abc@test.com",
                subject: "Sample mail: 01/07/21",
                body: "Hello name",
               "datetime": "2021-07-01T19:44:30"
            }
        */

        const { to, subject, body, datetime } = req.body;

        /**
         * Getting actual system datetime from delay
         */
        const today = new Date();
        const date = today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+("0" + (today.getDate())).slice(-2);
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        /**
         * Schedule job immediately
         */
        if(datetime == "") {
            const getRes = getCommonCode(to, subject, body, datetime);
            return res.send(getRes)
        }

        if(datetime !== "" && (datetime.split('T')[0] > date)){
            const getRes = getCommonCode(to, subject, body, datetime);
            return res.send(getRes)
        }

        if(datetime !== "" && (datetime.split('T')[0] <= date) || (datetime.split('T')[1] < time)) {
            return res.send({
                success: false,
                message: 'Ddatetime should be greater than current time'
            });
        }
   } catch(err) {
        console.log("Exception-sendMail::",err);
   } 
}

function getCommonCode(to, subject, body, datetime) {
    try {
        const scheduleMessage = !datetime ? "Sent" : "Scheduled"
        if(to && to !== "")  {
            const temp = scheduler.cronHandler(to, subject, body, datetime);
            return {
                success: false,
                message: 'Mail has been '+scheduleMessage
            };
        } else {
            return {
                success: false,
                message: 'Please provide receiver email address'
            };
        }
    } catch (err) {
        console.log("Exception-getCommonCode::",err);
    }
}