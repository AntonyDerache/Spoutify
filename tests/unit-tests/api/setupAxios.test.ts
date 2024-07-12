import {
  assert,
  describe,
  expect,
  test,
} from 'vitest';
import setupAxios from '../../../src/api/setupAxios';

describe('SetupAxios', () => {
  test('return params url', () => {
    // GIVEN
    const params = {
      param1: 'value',
      param2: 'value2',
      param3: 'value3',
    };
    const expectedUrl = '?param1=value&param2=value2&param3=value3';

    // WHEN
    const urlParams = setupAxios(params);

    // THEN
    expect(urlParams).toStrictEqual(expectedUrl);
  });

  test('return empty string if passing empty object', () => {
    // GIVEN
    const params = {};

    // WHEN
    const urlParams = setupAxios(params);

    // THEN
    assert.isEmpty(urlParams);
  });
});
