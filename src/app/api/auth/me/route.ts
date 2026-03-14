import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getSiteData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null });
  }

  const data = getSiteData();
  const user = data.users?.find((u: any) => u.id === session.userId);

  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ 
    user: { 
      id: user.id, 
      name: user.name, 
      email: user.email 
    } 
  });
}
