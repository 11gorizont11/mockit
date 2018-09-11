// TODO: fix configuration connect to app;
import mongoose from 'mongoose';

mongoose.Promise = Promise; // Ask Mongoose to use standard Promises
mongoose.set('debug', true); // Ask Mongoose to log DB request to console

mongoose.connect('mongodb://localhost:27017/mockit-api');

const db = mongoose.connection;
db.on('error', console.error);

export default mongoose;
