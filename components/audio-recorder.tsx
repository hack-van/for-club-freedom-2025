"use client";

import { Button } from "./ui/button";
import { Mic } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

type Props = {
  onRecordingComplete: (audioFile: File) => void;
};

export default function AudioRecorder({ onRecordingComplete }: Props) {
  const processedUrlRef = useRef<string | null>(null);

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
    });

  const isRecording = status === "recording";

  // Debug effect to track status and mediaBlobUrl changes
  useEffect(() => {
    console.log("Status changed:", status);
    console.log("MediaBlobUrl:", mediaBlobUrl);
  }, [status, mediaBlobUrl]);

  // Handle when recording is complete and blob URL is available
  useEffect(() => {
    if (mediaBlobUrl && mediaBlobUrl !== processedUrlRef.current) {
      console.log("Media Blob URL received:", mediaBlobUrl);
      processedUrlRef.current = mediaBlobUrl;

      // Convert blob URL to File object
      fetch(mediaBlobUrl)
        .then((response) => response.blob())
        .then((blob) => {
          // Create a File object from the blob
          const file = new File([blob], `recording-${Date.now()}.webm`, {
            type: blob.type || "audio/webm",
          });

          console.log("File created:", file);
          onRecordingComplete(file);
        })
        .catch((error) => {
          console.error("Error converting recording to file:", error);
        });
    }
  }, [mediaBlobUrl]);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isRecording) {
      console.log("Stopping recording...");
      stopRecording();
      console.log("Stop recording called, current mediaBlobUrl:", mediaBlobUrl);
    } else {
      console.log("Starting recording...");
      startRecording();
    }
  };

  return (
    <div className="flex flex-col p-4 border items-center rounded-lg gap-4">
      <Button
        size="icon"
        className="size-12 rounded-full"
        onClick={handleToggle}
        variant={isRecording ? "destructive" : "default"}
      >
        <Mic className="size-6" />
      </Button>
      <div className="text-sm font-medium">
        {isRecording ? `Recording...` : "Tap to start recording"}
      </div>
    </div>
  );
}
