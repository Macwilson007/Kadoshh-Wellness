import { NextResponse } from 'next/server';
import { getSiteData, updateSiteData } from '@/lib/db';

export async function GET() {
  return NextResponse.json(getSiteData());
}

export async function POST(req: Request) {
  try {
    const incomingData = await req.json();
    const existingData = getSiteData();
    
    // Merge only the keys we want to allow editing from admin
    // Explicitly preserve bookings and users which aren't edited via this general content endpoint
    const updatedData = {
      ...existingData,
      ...incomingData,
      bookings: existingData.bookings || [], // Prevent overwriting with partial admin state
      users: existingData.users || [],       // Prevent overwriting with partial admin state
    };

    const success = updateSiteData(updatedData);
    if (!success) {
      return NextResponse.json({ error: 'Failed to update configuration' }, { status: 500 });
    }
    return NextResponse.json({ success: true, data: updatedData });
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
