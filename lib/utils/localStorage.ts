export interface StoredActivity {
  _id: string;
  type: string;
  category: string;
  value: number;
  unit: string;
  co2: number;
  description?: string;
  date: string;
}

const STORAGE_KEY = 'carbon_tracker_activities';

const safeParse = (value: string | null) => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export function loadLocalActivities(): StoredActivity[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = safeParse(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed;
}

export function persistLocalActivities(activities: StoredActivity[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
}

export function storeLocalActivity(activity: StoredActivity) {
  if (typeof window === 'undefined') return;
  const existing = loadLocalActivities();
  persistLocalActivities([activity, ...existing]);
}
