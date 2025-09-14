import { useState } from "react"

export function YooperButton() {

  const [isPlaying, setIsPlaying] = useState(false);


  return (
    <div className="inline">
      <button
        className="text-blue hover:cursor-pointer"
        onClick={() => {
          setIsPlaying(true);
        }}
      >Upper Peninsula</button
      >
      <audio id="audioPlayer" preload="auto">
        <source
          src="https://ia801608.us.archive.org/31/items/gl_20230503/02%20The%20Wreck%20of%20the%20Edmund%20Fitzgerald.mp3"
          type="audio/mp3"
        />
      </audio>
    </div>
  )
}
