"use client";

import {
  MediaPlayer,
  MediaPlayerControlBar,
  MediaPlayerFullScreenButton,
  MediaPlayerPlayButton,
  MediaPlayerTimeDisplay,
  MediaPlayerTimeRange,
  MediaPlayerVolumeRange,
  VideoPlayerContent,
  VideoPlayerContentProps,
} from "../ui/media-player";

export default function VideoPlayer(props: VideoPlayerContentProps) {
  return (
    <MediaPlayer className="w-full overflow-hidden rounded-lg border">
      <VideoPlayerContent {...props} slot="media" crossOrigin="" playsInline />
      <MediaPlayerControlBar className="flex">
        <MediaPlayerPlayButton />
        <MediaPlayerTimeRange />
        <MediaPlayerTimeDisplay showDuration />
        <MediaPlayerVolumeRange />
        <MediaPlayerFullScreenButton />
      </MediaPlayerControlBar>
    </MediaPlayer>
  );
}
