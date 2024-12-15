import mongoose, { Schema, Document } from 'mongoose';

// Enum for Vehicle status
export enum VehicleStatus {
  AVAILABLE = 'AVAILABLE',
  IN_USE = 'IN_USE',
  MAINTENANCE = 'MAINTENANCE'
}

// Interface for the Vehicle document
export interface IVehicle extends Document {
  name: string;
  status: VehicleStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema for Vehicle
const VehicleSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(VehicleStatus),
      default: VehicleStatus.AVAILABLE
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Export the Mongoose model
export default mongoose.model<IVehicle>('Vehicle', VehicleSchema);
