import type { RecentTracks, Track, TrackResponse } from "@/types/lastfm"
import type { APIRoute } from "astro"
import { subDays } from "date-fns"
export const prerender = false;

export const GET: APIRoute = async () => {

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
    return new Response(JSON.stringify({
      message: "Error fetching recent track"
    }), {
      status: responseRaw.status
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
  return new Response(
    JSON.stringify(response),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
