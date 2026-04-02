import type { TrackResponse } from "@/types/lastfm";
import { useEffect, useState } from "react";

export function useLastFm() {
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


  return {
    track, loading, error
  }
}
