import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true }, // e.g., 'car travel'
  category: { type: String, required: true }, // 'transport', 'food', 'energy'
  value: { type: Number, required: true }, // e.g., km, kg, kWh
  unit: { type: String, required: true }, // 'km', 'kg', 'kWh'
  co2: { type: Number, required: true }, // kg CO2
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);