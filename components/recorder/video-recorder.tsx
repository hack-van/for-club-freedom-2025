"use client";

import { ReactMediaRecorder } from "react-media-recorder";
import { Button } from "../ui/button";
import { Square, Video } from "lucide-react";
import TimeElapsed from "./time-elapsed";

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
        error,
      }) => {
        const isRecording = status === "recording";

        // Show error message for insecure contexts
        if (error || status === "permission_denied") {
          return (
            <div className="flex flex-col p-4 border items-center rounded-lg gap-4 w-full">
              <div className="text-center text-red-600">
                <p className="font-semibold">
                  Camera access denied or unavailable
                </p>
                <p className="text-sm mt-2">
                  {window.location.protocol === "http:" &&
                  !window.location.hostname.includes("localhost")
                    ? "Camera access requires HTTPS or localhost. Try accessing via localhost or enable HTTPS."
                    : "Please allow camera access and try again."}
                </p>
              </div>
            </div>
          );
        }

        return (
          <div className="flex flex-col p-4 border items-center rounded-lg gap-4 w-full">
            {/* Video Preview */}
            {isRecording && previewStream && (
              <div className="relative">
                <TimeElapsed
                  isRecording={isRecording}
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
