"use client";

import {
  AudioPlayerContent,
  AudioPlayerContentProps,
  MediaPlayer,
  MediaPlayerControlBar,
  MediaPlayerMuteButton,
  MediaPlayerPlayButton,
  MediaPlayerTimeDisplay,
  MediaPlayerTimeRange,
  MediaPlayerVolumeRange,
} from "../ui/media-player";

export default function AudioPlayer(props: AudioPlayerContentProps) {
  return (
    <MediaPlayer audio className="w-full overflow-hidden rounded-lg border">
      <AudioPlayerContent {...props} slot="media" />
      <MediaPlayerControlBar className="flex">
        <MediaPlayerPlayButton />
        <MediaPlayerTimeRange />
        <MediaPlayerTimeDisplay showDuration />
        <MediaPlayerMuteButton />
        <MediaPlayerVolumeRange />
      </MediaPlayerControlBar>
    </MediaPlayer>
  );
}
