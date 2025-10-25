"use client";

import { ReactMediaRecorder } from "react-media-recorder";
import { Button } from "./ui/button";
import { Square, Video } from "lucide-react";
import { useRef, useState } from "react";
import TimeElapsed from "./time-elapsed";

type Props = {
  onRecordingComplete: (videoFile?: File) => void;
};

export default function VideoRecorder({ onRecordingComplete }: Props) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  return (
    <ReactMediaRecorder
      video
      audio
      blobPropertyBag={{
        type: "video/mp4",
      }}
      onStart={() => {
        setElapsed(0);
        intervalRef.current = setInterval(() => {
          setElapsed((prev) => prev + 1);
        }, 1000);
      }}
      onStop={(_, blob) => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        const videoFile = new File(
          [blob],
          `video-recording-${Date.now()}.mp4`,
          {
            type: "video/mp4",
          }
        );
        onRecordingComplete(videoFile);
      }}
      render={({
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        clearBlobUrl,
        previewStream,
      }) => {
        const isRecording = status === "recording";
        console.log("Rendering VideoRecorder, status:", status);

        return (
          <div className="flex flex-col p-4 border items-center rounded-lg gap-4 w-full">
            {/* Video Preview */}
            {isRecording && previewStream && (
              <div className="relative">
                <TimeElapsed
                  seconds={elapsed}
                  className="absolute top-2 left-2"
                />
                <video
                  autoPlay
                  ref={(ref) => {
                    if (ref) {
                      ref.srcObject = previewStream;
                    }
                  }}
                  muted
                  playsInline
                  className="w-full"
                />
              </div>
            )}

            {/* Video Playback */}
            {!isRecording && mediaBlobUrl && (
              <video controls src={mediaBlobUrl} className="w-full" />
            )}

            {/* Controls */}
            <div className="flex items-center gap-3">
              {!isRecording && (
                <Button
                  size="icon"
                  className="size-12 rounded-full"
                  type="button"
                  onClick={startRecording}
                >
                  <Video className="size-6" />
                </Button>
              )}
              {isRecording && (
                <Button
                  size="icon"
                  className="size-12 rounded-full"
                  variant="destructive"
                  type="button"
                  onClick={stopRecording}
                >
                  <Square className="size-6" />
                </Button>
              )}

              {mediaBlobUrl && !isRecording && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    clearBlobUrl();
                    onRecordingComplete(undefined);
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
