import type { Image, Artist } from './SearchTypes'

export type Album = {
  id: string
  images: Array<Image>
  name: string
  tracks: Tracks
  artists: Array<Artist>
}

export type Tracks = {
  items: Array<Track>
}

export type Track = {
  preview_url: string | null
  id: string
  name: string
  uri: string
  artists: Array<Artist>
  duration_ms: number
}
