export interface IAudioManager {
  isPlaying: boolean
  pauseAudio: () => void
  playAudio: () => void
  setSrc: (src: string) => void
  setVolume: (volume: number) => void
  getCurrentSrc: () => string
  isSrcPlaying: () => boolean
  setOnEndedCallback: (onendedCallback: () => void) => void
}

export class AudioManager implements IAudioManager {
  private audioRef: HTMLAudioElement = new Audio()
  public isPlaying = false

  constructor(src?: string) {
    this.audioRef.volume = 0.5
    if (src) {
      this.audioRef.src = src
    }
  }

  public setOnEndedCallback = (onendedCallback: () => void) => {
    this.audioRef.onended = () => {
      onendedCallback()
    }
  }

  public playAudio = () => {
    this.audioRef.play()
    this.isPlaying = true
  }

  public pauseAudio = () => {
    this.audioRef.pause()
    this.isPlaying = false
  }

  public setSrc = (src: string, startPlaying = true) => {
    this.audioRef.src = src
    if (startPlaying) {
      this.playAudio()
    }
  }

  public setVolume = (volume: number) => {
    this.audioRef.volume = volume
  }

  public getCurrentSrc = () => {
    return this.audioRef.src
  }

  public isSrcPlaying = () => {
    return this.isPlaying
  }
}
