import { ComponentProps, lazy, Suspense } from "react";
import { LoadingAudioRecorder, LoadingVideoRecorder } from "./loading";

const LazyVideoRecorder = lazy(() => import("./video-recorder"));
const LazyAudioRecorder = lazy(() => import("./audio-recorder"));

export function AudioRecorder({
  onRecordingComplete,
}: ComponentProps<typeof LazyAudioRecorder>) {
  return (
    <Suspense fallback={<LoadingAudioRecorder />}>
      <LazyAudioRecorder onRecordingComplete={onRecordingComplete} />
    </Suspense>
  );
}

export function VideoRecorder({
  onRecordingComplete,
}: ComponentProps<typeof LazyVideoRecorder>) {
  return (
    <Suspense fallback={<LoadingVideoRecorder />}>
      <LazyVideoRecorder onRecordingComplete={onRecordingComplete} />
    </Suspense>
  );
}
