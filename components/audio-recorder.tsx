"use client";

import { Button } from "./ui/button";
import { Mic, Square } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

type Props = {
  onRecordingComplete: (audioFile: File) => void;
};

export default function AudioRecorder({ onRecordingComplete }: Props) {
  const processedUrlRef = useRef<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      blobPropertyBag: { type: "audio/mpeg" },
    });

  const isRecording = status === "recording";

  // Debug logging
  useEffect(() => {
    console.log("Status changed:", status);
    console.log("MediaBlobUrl:", mediaBlobUrl);
  }, [status, mediaBlobUrl]);

  // Handle completed recording
  useEffect(() => {
    if (mediaBlobUrl && mediaBlobUrl !== processedUrlRef.current) {
      console.log("Media Blob URL received:", mediaBlobUrl);
      processedUrlRef.current = mediaBlobUrl;

      // Convert blob URL to File object
      fetch(mediaBlobUrl)
        .then((response) => response.blob())
        .then((blob) => {
          // Create a File object from the blob
          const file = new File([blob], `audio-recording-${Date.now()}.mp3`, {
            type: blob.type,
          });

          console.log("Audio file created:", file);
          onRecordingComplete(file);
        })
        .catch((error) => {
          console.error("Error converting recording to file:", error);
        });
    }
  }, [mediaBlobUrl, onRecordingComplete]);

  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isRecording) {
      console.log("Stopping recording...");
      stopRecording();
    } else {
      console.log("Starting recording...");
      try {
        await startRecording();
      } catch (error) {
        console.error("Failed to start recording:", error);
        setHasPermission(false);
      }
    }
  };

  const handleClearRecording = () => {
    if (clearBlobUrl) {
      clearBlobUrl();
    }
    processedUrlRef.current = null;
  };

  return (
    <div className="flex flex-col p-4 border items-center rounded-lg gap-4 w-full">
      {/* Audio Preview */}
      {!isRecording && mediaBlobUrl && (
        <audio
          src={mediaBlobUrl}
          controls
          controlsList="nodownload"
          className="w-full object-cover"
        />
      )}

      {/* Controls */}
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          className="size-12 rounded-full"
          onClick={handleToggle}
          variant={isRecording ? "destructive" : "default"}
        >
          {isRecording ? (
            <Square className="size-6" />
          ) : (
            <Mic className="size-6" />
          )}
        </Button>

        {mediaBlobUrl && !isRecording && (
          <Button size="sm" variant="outline" onClick={handleClearRecording}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
