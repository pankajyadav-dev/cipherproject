const {connect} = require('mongoose');



const MONGO_URL = "mongodb://virat:virat123@localhost:27017";


const DB_NAME = "library?authSource=admin";

const connectToDatabase = async () => {
  try {
    await connect(`${MONGO_URL}/${DB_NAME}`);
    console.log(`Connected to MongoDB at ${MONGO_URL}/${DB_NAME}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();


module.exports = {};


