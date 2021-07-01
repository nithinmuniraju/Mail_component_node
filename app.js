require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mailRoutes = require('./Routes/scheduleMailRoute');

app.use('/mail',mailRoutes);

app.listen(process.env.PORT, (err) => {
    if(err) {
        throw new Error('Error connecting server. Please try again after sometime');
    }

    console.log('Server running successfully on port: '+process.env.PORT)
})