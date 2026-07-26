export interface BookingFormData {
  tripType: string;
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  passengers: string;
  travelClass: string;
  name: string;
  phone: string;
}

export const generateWhatsAppLink = (data: BookingFormData, phoneNumber: string) => {
  const message = `Hello, I would like to request a flight quote. ✈️

📍 *From:* ${data.from || 'Not specified'}
📍 *To:* ${data.to || 'Not specified'}
📅 *Departure:* ${data.departDate || 'Not specified'}
${data.tripType === 'round-trip' ? `📅 *Return:* ${data.returnDate || 'Not specified'}` : ''}
👥 *Passengers:* ${data.passengers || '1 Adult'}
💺 *Class:* ${data.travelClass}

👤 *Name:* ${data.name || 'Not specified'}
📞 *Phone:* ${data.phone || 'Not specified'}

Please send me the best available fare. Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const generateTelegramLink = (data: BookingFormData, username: string) => {
  // Telegram uses the same message format, just a different URL structure
  const message = `Hello, I would like to request a flight quote. ✈️\n\n📍 From: ${data.from}\n📍 To: ${data.to}\n📅 Departure: ${data.departDate}\n👥 Passengers: ${data.passengers}\n💺 Class: ${data.travelClass}\n\n👤 Name: ${data.name}\n📞 Phone: ${data.phone}`;
  
  const encodedMessage = encodeURIComponent(message);
  return `https://t.me/${username}?text=${encodedMessage}`;
};