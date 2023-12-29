
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const DB_URL = process.env.DB_URL;

function dbConnection() {
    mongoose.connect(DB_URL, { family: 4 })
    .then(()=>console.log("Database Connected"))
    .catch((err) => {
        console.log("Error while connecting to the Database");
        console.error(err);
        process.exit(1);
    })
};


module.exports = dbConnection;

