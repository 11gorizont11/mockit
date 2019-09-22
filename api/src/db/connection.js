import mongoose from 'mongoose';
import config from 'config';

const env = process.env.NODE_ENV;

const connectUrl = env !== 'production' ? config.get(`${env}.MONGO_URL`) : `mongodb://${process.env.MONGO_URL}/mockit-api-prod`;

mongoose.Promise = Promise;

if (env === 'development') {
  mongoose.set('debug', true);
}
mongoose.set('useCreateIndex', true);

mongoose.connect(connectUrl, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error);

export default mongoose;
