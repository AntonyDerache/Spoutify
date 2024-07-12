import {
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest';
import { AudioManager } from '../../../src/tools/audioManager';

const mocks = {
  Audio: {
    pause: vi.fn(),
    play: vi.fn(),
    volume: vi.fn(),
  },
};

global.Audio = vi.fn().mockImplementation(() => ({
  pause: mocks.Audio.pause,
  play: mocks.Audio.play,
  volume: mocks.Audio.volume,
}));

describe('Audio manager', () => {
  let audioManager: AudioManager;

  beforeEach(() => {
    vi.clearAllMocks();
    audioManager = new AudioManager();
  });

  test('play audio', () => {
    // WHEN
    audioManager.playAudio();

    // THEN
    expect(audioManager.isPlaying).toBeTruthy();
    expect(mocks.Audio.play).toHaveBeenCalledOnce();
  });

  test('pause audio', () => {
    // WHEN
    audioManager.playAudio();
    audioManager.pauseAudio();

    // THEN
    expect(audioManager.isPlaying).toBeFalsy();
    expect(mocks.Audio.pause).toHaveBeenCalledOnce();
  });

  test('set new source', () => {
    // GIVEN
    const source = 'source';

    // WHEN
    audioManager.setSrc(source, false);

    // THEN
    expect(audioManager.isPlaying).toBeFalsy();
    expect(audioManager.getCurrentSrc()).toStrictEqual(source);
  });

  test('set new source and play it right after', () => {
    // GIVEN
    const source = 'source';

    // WHEN
    audioManager.setSrc(source);

    // THEN
    expect(audioManager.isSrcPlaying()).toBeTruthy();
    expect(audioManager.getCurrentSrc()).toStrictEqual(source);
    expect(mocks.Audio.play).toHaveBeenCalledOnce();
  });
});
