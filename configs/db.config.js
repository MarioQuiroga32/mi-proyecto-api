const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://marioquiroga:mario@cluster0-pvdys.mongodb.net/test?retryWrites=true";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.info(`Connected to the database: ${MONGODB_URI}`))
    .catch(error => console.error(`Database connection error ${MONGODB_URI}:`, error));