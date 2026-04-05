export interface ActivityType {
  id: string;
  type: string;
  category: string;
  unit: string;
  co2Factor: number; // kg CO2 per unit
  description: string;
}

export const activities: ActivityType[] = [
  {
    id: 'car-travel',
    type: 'Car Travel',
    category: 'transport',
    unit: 'km',
    co2Factor: 0.2, // approx 0.2 kg CO2 per km for average car
    description: 'Driving a car',
  },
  {
    id: 'bus-travel',
    type: 'Bus Travel',
    category: 'transport',
    unit: 'km',
    co2Factor: 0.1,
    description: 'Taking a bus',
  },
  {
    id: 'meat-consumption',
    type: 'Meat Consumption',
    category: 'food',
    unit: 'kg',
    co2Factor: 15, // beef approx 15 kg CO2 per kg
    description: 'Eating meat',
  },
  {
    id: 'vegetable-consumption',
    type: 'Vegetable Consumption',
    category: 'food',
    unit: 'kg',
    co2Factor: 0.5,
    description: 'Eating vegetables',
  },
  {
    id: 'electricity-use',
    type: 'Electricity Use',
    category: 'energy',
    unit: 'kWh',
    co2Factor: 0.5, // average
    description: 'Using electricity',
  },
  {
    id: 'flight',
    type: 'Flight',
    category: 'transport',
    unit: 'km',
    co2Factor: 0.15, // per km
    description: 'Flying',
  },
];

export const categories = ['transport', 'food', 'energy'];