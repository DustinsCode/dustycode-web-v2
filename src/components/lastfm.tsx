import clsx from 'clsx';
import { useEffect, useState } from "react";
import type { TrackResponse } from '../types/lastfm.ts';

export default function LastFM() {
  const [track, setTrack] = useState<TrackResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/lastfm/recentTracks')
      .then(res => res.json())
      .then(data => {
        setTrack(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      })
  }, [])

  if (loading) return (
    <div className="border border-solid rounded-lg p-6">
      <div className='skeleton h-6 w-32 mb-2' />
      <div className=' flex gap-3 items-center'>
        <div className='skeleton size-16 rounded-full' />
        <div className='skeleton h-4 w-32' />
      </div>
    </div>
  )
  if (!track) return null;
  if (error) return null;

  return (
    <div className="border border-solid rounded-lg p-6">
      <h2 className="text-2xl mb-2">
        {track.nowplaying ? "Now playing" : "Recently Played"}
      </h2>
      <div className="flex gap-3 items-center">
        <img src={track.image}
          className={clsx(track.nowplaying && 'animate-spin [animation-duration:5s]', 'rounded-full')}
        />
        <a href={track.url}>
          {track.name} by {track.artist}
        </a>
      </div>
    </div>
  )
}
