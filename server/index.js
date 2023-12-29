const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require('./config/database')


const app = express();

dotenv.config();
const PORT = process.env.PORT;

//middleware - body parser
app.use(express.json());

//server connection
app.listen(PORT, () => {
    console.log(`Server is runing on port-${PORT}`)
})

// DB connection


//default route
app.get('/', (req, res) => {
    res.send('<h1>Study Notion App</h1>')
})