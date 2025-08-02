const {
  isValidPhone,
  isValidEmail,
  isValidName,
  isValidDate,
  isValidServiceId
} = require('./validaciones');

describe('Validaciones básicas', () => {
  test('isValidPhone - acepta 9 dígitos', () => {
    expect(isValidPhone('099123456')).toBe(true);
    expect(isValidPhone('09912345')).toBe(false);
    expect(isValidPhone('abcdefgh')).toBe(false);
  });

  test('isValidEmail - valida formato de correo', () => {
    expect(isValidEmail('correo@ejemplo.com')).toBe(true);
    expect(isValidEmail('correo')).toBe(false);
    expect(isValidEmail('correo@com')).toBe(false);
  });

  test('isValidName - nombre no vacío', () => {
    expect(isValidName('Juan')).toBe(true);
    expect(isValidName('   ')).toBe(false);
    expect(isValidName('')).toBe(false);
  });

  test('isValidDate - valida fecha parseable', () => {
    expect(isValidDate('2025-08-01')).toBe(true);
    expect(isValidDate('fecha')).toBe(false);
  });

  test('isValidServiceId - debe existir en lista', () => {
    const servicios = [
      { id: 'corte-cabello' },
      { id: 'afeitado-tradicional' }
    ];

    expect(isValidServiceId('corte-cabello', servicios)).toBe(true);
    expect(isValidServiceId('no-existe', servicios)).toBe(false);
  });
});
