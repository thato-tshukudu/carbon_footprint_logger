import { NextRequest, NextResponse } from 'next/server';
import { getServerSession, type Session } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import Activity from '@/lib/models/Activity';
import dbConnect from '@/lib/mongodb';

interface ActivityPayload {
  type: string;
  category: string;
  value: number;
  unit: string;
  co2: number;
  description?: string;
  date?: string;
}

type SafeSession = Session & { user: { id: string } };

export async function GET() {
  try {
    const session = (await getServerSession(authOptions)) as SafeSession | null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const activities = await Activity.find({ user: session.user.id }).sort({ date: -1 });

    return NextResponse.json(activities);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as SafeSession | null;

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = (await request.json()) as ActivityPayload;
    const { type, category, value, unit, co2, description, date } = payload;

    if (!type || !category || value == null || !unit || co2 == null) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await dbConnect();

    const activity = new Activity({
      user: session.user.id,
      type,
      category,
      value,
      unit,
      co2,
      description,
      date: date ? new Date(date) : new Date(),
    });

    await activity.save();

    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
