const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  reconnectTries: 60,
  reconnectInterval: 10000
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connection to database established!');
});

db.on('connecting', () => {
  console.log('Connecting to database...');
});

db.on('disconnected', () => {
  console.log('Disconnected from database');
});

db.on('error', err => {
  console.log('Failed to connect to database:', err.message);
});
