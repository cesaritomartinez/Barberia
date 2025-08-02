function getAvailableBarber(date, time, existingBookings, barberList) {
  const bookedIds = existingBookings
    .filter((b) => b.date === date && b.time === time)
    .map((b) => b.barberId);

  return barberList.find((b) => !bookedIds.includes(b.id)) || null;
}

function filterBookingsByDate(bookings, date) {
  return bookings
    .filter((b) => b.date === date)
    .sort((a, b) => a.time.localeCompare(b.time));
}

module.exports = {
  getAvailableBarber,
  filterBookingsByDate
};
