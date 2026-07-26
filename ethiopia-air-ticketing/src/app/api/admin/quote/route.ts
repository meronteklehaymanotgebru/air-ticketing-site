import { NextResponse } from 'next/server';
import { updateBooking, getBookings } from '@/lib/store';

export async function POST(request: Request) {
  const { bookingId, price, validity, notes } = await request.json();
  await updateBooking(bookingId, {
    status: 'quoted',
    quotation: { price, validity, notes },
  });
  return NextResponse.json({ success: true });
}