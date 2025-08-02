const suma = require('./suma');

test('suma 10 + (-4) es 6', () => {
  expect(suma(10, -4)).toBe(6);
});
