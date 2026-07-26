import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'bookings.json');

export interface BookingRequest {
  id: number;
  createdAt: string;
  status: 'pending' | 'quoted';
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  travelClass: string;
  flexibleDates: boolean;
  preferredAirlines?: string;
  budget?: string;
  specialRequests?: string;
  name: string;
  phone: string;
  contactMethod: 'WhatsApp' | 'Telegram';
  quotation?: {
    price: string;
    validity: string;
    notes?: string;
  };
}

async function readBookings(): Promise<BookingRequest[]> {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeBookings(bookings: BookingRequest[]) {
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
  await fs.writeFile(dataFilePath, JSON.stringify(bookings, null, 2));
}

export async function addBooking(booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) {
  const bookings = await readBookings();
  const newBooking: BookingRequest = {
    ...booking,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  bookings.push(newBooking);
  await writeBookings(bookings);
  return newBooking;
}

export async function getBookings() {
  return await readBookings();
}

export async function updateBooking(id: number, update: Partial<BookingRequest>) {
  const bookings = await readBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...update };
    await writeBookings(bookings);
  }
}