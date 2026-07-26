import { NextResponse } from 'next/server';
import { addBooking } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const booking = await addBooking(body);

    // Notify the agency via Telegram (if configured)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const message = formatTelegramMessage(booking);
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
          parse_mode: 'HTML',
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking submission error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}

function formatTelegramMessage(booking: any) {
  return `
<b>🛫 New Booking Request</b>
<b>From:</b> ${booking.from}
<b>To:</b> ${booking.to}
<b>Dates:</b> ${booking.departureDate} ${booking.returnDate ? `→ ${booking.returnDate}` : '(one‑way)'}
<b>Passengers:</b> ${booking.adults} Adult(s), ${booking.children} Child(ren), ${booking.infants} Infant(s)
<b>Class:</b> ${booking.travelClass}
<b>Preferred Airlines:</b> ${booking.preferredAirlines || 'Any'}
<b>Budget:</b> ${booking.budget}
<b>Flexible Dates:</b> ${booking.flexibleDates ? 'Yes' : 'No'}
<b>Special Requests:</b> ${booking.specialRequests || 'None'}
<b>Contact:</b> ${booking.name} (${booking.contactMethod}: ${booking.phone})
  `.trim();
}