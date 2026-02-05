const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var routes = require('./route/routes');
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:4200"
}));

app.listen(3000, function check(error) {
    if (error) {
        console.log('Error starting server:', error);
    } else {
        console.log('Server is running on port 3000');
    }
}) ;

mongoose.connect('mongodb://127.0.0.1:27017/myStudent', {
})
.then(() => console.log("Connected to the database successfully"))
    .catch((error) => console.log("Error connecting to database:", error));

app.use(express.json());
app.use(routes);


