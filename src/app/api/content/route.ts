import { NextResponse } from 'next/server';
import { getSiteData, updateSiteData } from '@/lib/db';

export async function GET() {
  return NextResponse.json(getSiteData());
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const success = updateSiteData(data);
    if (!success) {
      return NextResponse.json({ error: 'Failed to update configuration' }, { status: 500 });
    }
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
