import { Request, Response } from 'express';
import Vehicle, { IVehicle, VehicleStatus } from '../models/vehicle';

// Create a new vehicle
export const createVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, status } = req.body;

    // Validate status if provided
    if (status && !Object.values(VehicleStatus).includes(status)) {
      res.status(400).json({ message: 'Invalid status value' });
      return;
    }

    const newVehicle: IVehicle = new Vehicle({ name, status });
    await newVehicle.save();

    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle', error });
  }
};

// Get all vehicles
export const getVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicles: IVehicle[] = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error });
  }
};

// Update vehicle status
export const updateVehicleStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(VehicleStatus).includes(status)) {
      res.status(400).json({ message: 'Invalid status value' });
      return;
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedVehicle) {
      res.status(404).json({ message: 'Vehicle not found' });
      return;
    }

    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error });
  }
};
