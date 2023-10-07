const mongoose = require('mongoose');

const { MONOGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect(MONOGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
};
