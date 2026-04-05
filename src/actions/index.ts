import type { RecentTracks, Track, TrackResponse } from "@/types/lastfm";
import { ActionError, defineAction } from "astro:actions";
import { subDays } from "date-fns";

export const server = {
  getRecentTrack: defineAction({
    handler: async () => {
      const opts = {
        apiKey: import.meta.env.LAST_FM_API_KEY,
        baseUrl: import.meta.env.LAST_FM_BASE_URL,
        user: "dustycode",
        method: 'user.getrecenttracks',
        nowplaying: 'true',
        limit: 1,
        format: 'json',
        from: subDays(Date.now(), 1)
      }

      const responseRaw = await fetch(`${opts.baseUrl}?method=${opts.method}&user=${opts.user}&api_key=${opts.apiKey}&limit=${opts.limit}&from=${opts.from}&nowplaying=${opts.nowplaying}&format=${opts.format}`)
      if (responseRaw.status !== 200) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not fetch track"
        })
      }

      const responseJson: RecentTracks = await responseRaw.json();
      const track: Track = responseJson.recenttracks.track[0];
      const response: TrackResponse = {
        name: track.name,
        artist: track.artist["#text"],
        nowplaying: track["@attr"]?.nowplaying ?? false,
        url: track.url,
        image: track.image[1]["#text"]
      }
      return response;

    }
  })
}
