export const SEARCH_DATA_MOCK = {
  artists: {
    items: [
      {
        id: 'travis-scott-id',
        images: [],
        name: 'Travis Scott',
        popularity: 92,
        type: 'artist',
      },
      {
        id: 'travis-tritt',
        images: [],
        name: 'Travis Tritt',
        popularity: 63,
        type: 'artist',
      },
      {
        id: 'tandy-travis',
        images: [],
        name: 'Randy Travis',
        type: 'artist',
      },
    ],
    limit: 10,
  },
  albums: {
    items: [],
  },
  tracks: {
    items: [],
  },
};

export const SEARCH_DATA_MOCK_2 = {
  artists: {
    items: [
      {
        id: 'twenty-one-pilots-id',
        name: 'Twenty One Pilots',
        images: [],
        popularity: 92,
        type: 'artist',
      },
    ],
  },
  albums: {
    items: [
      {
        album_type: 'album',
        artists: [
          {
            id: 'twenty-one-pilots-id',
            name: 'Twenty One Pilots',
            type: 'artist',
          },
        ],
        id: 'clancy-id',
        images: [],
        name: 'Clancy',
        total_tracks: 13,
        type: 'album',
      },
    ],
  },
  tracks: {
    items: [],
  },
};
