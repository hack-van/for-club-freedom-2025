"use client";

import {
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import type { ComponentProps, CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type MediaPlayerProps = ComponentProps<typeof MediaController>;

const variables = {
  "--media-primary-color": "var(--primary)",
  "--media-secondary-color": "var(--background)",
  "--media-text-color": "var(--foreground)",
  "--media-background-color": "var(--background)",
  "--media-control-hover-background": "var(--accent)",
  "--media-font-family": "var(--font-sans)",
  "--media-live-button-icon-color": "var(--muted-foreground)",
  "--media-live-button-indicator-color": "var(--destructive)",
  "--media-range-track-background": "var(--border)",
} as CSSProperties;

export const MediaPlayer = ({ style, ...props }: MediaPlayerProps) => (
  <MediaController
    style={{
      ...variables,
      ...style,
    }}
    {...props}
  />
);

export type MediaPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;

export const MediaPlayerControlBar = (props: MediaPlayerControlBarProps) => (
  <MediaControlBar {...props} />
);

export type MediaPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;

export const MediaPlayerTimeRange = ({
  className,
  ...props
}: MediaPlayerTimeRangeProps) => (
  <MediaTimeRange className={cn("p-2.5", className)} {...props} />
);

export type MediaPlayerTimeDisplayProps = ComponentProps<
  typeof MediaTimeDisplay
>;

export const MediaPlayerTimeDisplay = ({
  className,
  ...props
}: MediaPlayerTimeDisplayProps) => (
  <MediaTimeDisplay className={cn("p-2.5", className)} {...props} />
);

export type MediaPlayerVolumeRangeProps = ComponentProps<
  typeof MediaVolumeRange
>;

export const MediaPlayerVolumeRange = ({
  className,
  ...props
}: MediaPlayerVolumeRangeProps) => (
  <MediaVolumeRange className={cn("p-2.5", className)} {...props} />
);

export type MediaPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>;

export const MediaPlayerPlayButton = ({
  className,
  ...props
}: MediaPlayerPlayButtonProps) => (
  <MediaPlayButton className={cn("p-2.5", className)} {...props} />
);

export type MediaPlayerSeekBackwardButtonProps = ComponentProps<
  typeof MediaSeekBackwardButton
>;

export const MediaPlayerSeekBackwardButton = ({
  className,
  ...props
}: MediaPlayerSeekBackwardButtonProps) => (
  <MediaSeekBackwardButton className={cn("p-2.5", className)} {...props} />
);

export type MediaPlayerSeekForwardButtonProps = ComponentProps<
  typeof MediaSeekForwardButton
>;

export const MediaPlayerSeekForwardButton = ({
  className,
  ...props
}: MediaPlayerSeekForwardButtonProps) => (
  <MediaSeekForwardButton className={cn("p-2.5", className)} {...props} />
);

export type MediaPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>;

export const MediaPlayerMuteButton = ({
  className,
  ...props
}: MediaPlayerMuteButtonProps) => (
  <MediaMuteButton className={cn("p-2.5", className)} {...props} />
);

export type MediaFullScreenProps = ComponentProps<typeof MediaFullscreenButton>;

export const MediaPlayerFullScreenButton = ({
  className,
  ...props
}: MediaFullScreenProps) => (
  <MediaFullscreenButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerContentProps = ComponentProps<"video">;

export const VideoPlayerContent = ({
  className,
  ...props
}: VideoPlayerContentProps) => (
  <video className={cn("mt-0 mb-0", className)} {...props} />
);

export type AudioPlayerContentProps = ComponentProps<"audio">;

export const AudioPlayerContent = ({
  className,
  ...props
}: AudioPlayerContentProps) => (
  <audio className={cn("w-full", className)} {...props} />
);
