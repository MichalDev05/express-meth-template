const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

if (!uri){
    console.log("MONGODB_URI not found in .env file");
    process.exit();
}

mongoose.connect(uri).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

module.exports = mongoose;
