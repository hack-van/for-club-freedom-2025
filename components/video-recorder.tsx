"use client";

import { ReactMediaRecorder } from "react-media-recorder";
import { Button } from "./ui/button";
import { Square, Video } from "lucide-react";

type Props = {
  onRecordingComplete: (videoFile?: File) => void;
};

export default function VideoRecorder({ onRecordingComplete }: Props) {
  return (
    <ReactMediaRecorder
      video
      audio
      blobPropertyBag={{
        type: "video/mp4",
      }}
      onStop={(_, blob) => {
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

        return (
          <div className="flex flex-col p-4 border items-center rounded-lg gap-4 w-full">
            {/* Video Preview */}
            {isRecording && previewStream && (
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
