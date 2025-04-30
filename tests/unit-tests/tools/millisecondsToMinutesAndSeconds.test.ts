import { expect, test } from 'vitest';
import millisecondsToMinutesAndSeconds from '../../../src/tools/millisecondsToMinutesAndSeconds';

test.each([
  {
    value: 1000,
    expected: '0:01',
  },
  {
    value: 39000.43,
    expected: '0:39',
  },
])('$value equals $expected seconds', (entry) => {
  // GIVEN
  const { value, expected } = entry;

  // WHEN
  const result = millisecondsToMinutesAndSeconds(value);

  // THEN
  expect(result).toStrictEqual(expected);
});
