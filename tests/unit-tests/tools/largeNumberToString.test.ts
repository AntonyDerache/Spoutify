import { expect, test } from 'vitest';
import largeNumberToString from '../../../src/tools/largeNumberToString';

test.each([
  {
    value: 9474928,
    expected: '9 474 928',
  },
  {
    value: 2349287653,
    expected: '2 349 287 653',
  },
])('cast $value to $expected', (entry) => {
  // GIVEN
  const { value, expected } = entry;

  // WHEN
  const result = largeNumberToString(value);

  // THEN
  expect(result).toStrictEqual(expected);
});
