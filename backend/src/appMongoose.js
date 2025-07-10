const { connect } = require('mongoose');

const MONGO_URL = "mongodb+srv://siri963690:siri963690@cluster111.ka2ei.mongodb.net";
const DB_NAME = "library"; 

const connectToDatabase = async () => {
  try {
    await connect(`${MONGO_URL}/${DB_NAME}?retryWrites=true&w=majority`);
    console.log(`Connected to MongoDB at ${MONGO_URL}/${DB_NAME}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectToDatabase();

module.exports = {};
