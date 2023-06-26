const mongoose = require('mongoose');

const MONGODB_URI = `//josuesalazar:<MnilYdLew1gE9DRa>@cluster0.n29ix7h.mongodb.net/?retryWrites=true&w=majority`;

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
