import mongoose, { Schema } from 'mongoose';

const routeSchema = new mongoose.Schema(
  {
    host: {
      type: String,
      required: true
    },
    statusCode: Number,
    method: String,
    path: String,
    headers: [String],
    userId: String,
    body: String
  },
  {
    timestamps: true
  }
);

const RouteModel = mongoose.model('Route', routeSchema);

export default RouteModel;
