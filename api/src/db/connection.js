import mongoose from 'mongoose';
import config from 'config';

const env = process.env.NODE_ENV;

mongoose.Promise = Promise;

if (env === 'development') {
  mongoose.set('debug', true);
}
mongoose.set('useCreateIndex', true);

console.log('MONGO', config.get(`${env}.MONGO_URL`));
mongoose.connect(
  config.get(`${env}.MONGO_URL`),
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error);

export default mongoose;
