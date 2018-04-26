require('dotenv').load()

let MONGO_DB; 

if (process.env.NODE_ENV="production"){
    MONGO_DB = process.env.MONGODB_PROD;
}
MONGO_DB = process.env.MONGODB_DEV;

module.exports = {
    DATABASE:MONGO_DB
};