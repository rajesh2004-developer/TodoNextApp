const mongoose = require('mongoose');

const uri = process.env.MONGO_CONNECT;

export const connectDB = async () => {
  await mongoose
    .connect(uri)
    .then(() => console.log('MongoDB Connected Successfully!'))
    .catch((err) => console.error('MongoDB Connection Error:', err));
};
