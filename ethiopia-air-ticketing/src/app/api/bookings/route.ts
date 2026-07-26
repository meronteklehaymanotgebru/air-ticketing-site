import { NextResponse } from 'next/server';
import { getBookings } from '@/lib/store';

export async function GET() {
  const bookings = await getBookings();
  return NextResponse.json(bookings);
}