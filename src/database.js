const mongoose = require('mongoose');

const MONGODB_URI = process.env.DB_CONNECTION;

connection = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log('Database is connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connection;
