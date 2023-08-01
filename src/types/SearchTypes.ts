export type Track = {
  preview_url: string | null
  id: string
  name: string
  uri: string
  album: Album
  artists: Array<Artist>
}

export type Album = {
  id: string
  images: Array<Image>
  name: string
}

export type Image = {
  url: string
  height: number
  width: number
}

export type Artist = {
  id: string
  name: string
  images: Array<Image>
}

export type SearchItems = {
  tracks: {
    items: Array<Track>
  }
  albums: {
    items: Array<Album>
  }
  artists: {
    items: Array<Artist>
  }
}
