import { NextResponse } from 'next/server';
import { getSiteData, updateSiteData } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = getSiteData();
  const userBookings = (data.bookings || []).filter((b: any) => b.userId === session.userId);

  return NextResponse.json(userBookings);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { serviceId, date, time } = await request.json();

    if (!serviceId || !date || !time) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const data = getSiteData();
    const service = data.services.find((s: any) => s.id === serviceId);

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    const newBooking = {
      id: `BK-${Math.floor(Math.random() * 9000) + 1000}`,
      userId: session.userId,
      serviceId,
      serviceTitle: service.title,
      price: service.price,
      date,
      time,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    data.bookings = [...(data.bookings || []), newBooking];
    updateSiteData(data);

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error) {
    return NextResponse.json({ error: 'Booking failed' }, { status: 500 });
  }
}
