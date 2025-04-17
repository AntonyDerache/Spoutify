import { expect, test } from 'vitest';
import searchInArray from '../../../src/tools/searchInAnArray';

test.each([
  {
    value: 'toto',
    arr: ['ToTo', 'titi', 'tutU', 'tAta'],
    expected: ['ToTo'],
  },
  {
    value: 'alt',
    arr: ['alternance', 'Alternative', 'Altitude', 'tutU', 'tAta'],
    expected: ['alternance', 'Alternative', 'Altitude'],
  },
])("Find elements in an array regardless of case sensitivity", (entry) => {
  // GIVEN
  const { value, arr, expected } = entry;

  // WHEN
  const result = searchInArray(value, arr);

  // THEN
  expect(result).toStrictEqual(expected);
});

test('test ci', () => {
  expect(false).toBeFalsy();
});
