const {
  getAvailableBarber,
  filterBookingsByDate
} = require('./bookingLogic');

describe('getAvailableBarber', () => {
  const barbers = [
    { id: 1, name: 'Martín' },
    { id: 2, name: 'Lucas' },
    { id: 3, name: 'Nicolás' }
  ];

  test('devuelve un barbero disponible si hay alguno libre', () => {
    const bookings = [
      { date: '2025-08-01', time: '10:00', barberId: 1 },
      { date: '2025-08-01', time: '10:00', barberId: 2 }
    ];
    const result = getAvailableBarber('2025-08-01', '10:00', bookings, barbers);
    expect(result).toEqual({ id: 3, name: 'Nicolás' });
  });

  test('devuelve null si todos los barberos están ocupados', () => {
    const bookings = [
      { date: '2025-08-01', time: '10:00', barberId: 1 },
      { date: '2025-08-01', time: '10:00', barberId: 2 },
      { date: '2025-08-01', time: '10:00', barberId: 3 }
    ];
    const result = getAvailableBarber('2025-08-01', '10:00', bookings, barbers);
    expect(result).toBeNull();
  });

  test('devuelve el primer barbero libre si hay varios', () => {
    const bookings = [
      { date: '2025-08-01', time: '10:00', barberId: 2 }
    ];
    const result = getAvailableBarber('2025-08-01', '10:00', bookings, barbers);
    expect(result).toEqual({ id: 1, name: 'Martín' });
  });

  test('devuelve null si no hay barberos definidos', () => {
    const result = getAvailableBarber('2025-08-01', '10:00', [], []);
    expect(result).toBeNull();
  });
});

describe('filterBookingsByDate', () => {
  const bookings = [
    { date: '2025-08-01', time: '10:00', name: 'Juan' },
    { date: '2025-08-02', time: '11:00', name: 'Ana' },
    { date: '2025-08-01', time: '09:00', name: 'Carlos' },
    { date: '2025-08-01', time: '14:00', name: 'Laura' }
  ];

  test('devuelve los turnos del 1 de agosto ordenados por hora', () => {
    const result = filterBookingsByDate(bookings, '2025-08-01');
    expect(result.length).toBe(3);
    expect(result[0].name).toBe('Carlos');
    expect(result[1].name).toBe('Juan');
    expect(result[2].name).toBe('Laura');
  });

  test('devuelve array vacío si no hay turnos para la fecha', () => {
    const result = filterBookingsByDate(bookings, '2025-08-03');
    expect(result).toEqual([]);
  });

  test('no modifica el array original', () => {
    const original = [...bookings];
    filterBookingsByDate(bookings, '2025-08-01');
    expect(bookings).toEqual(original);
  });
});
