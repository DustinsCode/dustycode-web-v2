
export type RecentTracks = {
  recenttracks: {
    track: Track[];
  };
  "@attr": {
    user: string;
    totalPages: number;
    page: number;
    perPage: number;
    total: number;
  }
}

export type Track = {
  artist: Artist;
  streamable: number;
  mbid: string;
  name: string;
  url: string;
  image: LastFMImage[];
  date?: {
    uts: string;
    "#text": string;
  };
  "@attr"?: {
    nowplaying: boolean;
  }
};

export type TrackResponse = {
  name: string;
  artist: string;
  url: string;
  image: string;
  nowplaying: boolean;
}

export type Artist = {
  mbid: string;
  "#text": string;
}

export type LastFMImage = {
  size: string;
  "#text": string;
}
