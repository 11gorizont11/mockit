import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema(
  {
    route: {
      type: String,
      required: true
    },
    userId: String
  },
  {
    timestamps: true
  }
);

const RouteModel = mongoose.model('Route', routeSchema);

export default RouteModel;
