"use client";

import { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Button } from "./ui/button";
import { Square, Video } from "lucide-react";

type Props = {
  onRecordingComplete: (videoFile: File) => void;
};

export default function VideoRecorder({ onRecordingComplete }: Props) {
  const processedUrlRef = useRef<string | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
    clearBlobUrl,
  } = useReactMediaRecorder({
    video: true,
    audio: true,
    blobPropertyBag: { type: "video/mp4" },
  });

  const isRecording = status === "recording";

  // Handle video preview stream
  useEffect(() => {
    const videoElement = videoPreviewRef.current;

    if (videoElement && previewStream) {
      videoElement.srcObject = previewStream;
      videoElement.play().catch(console.error);
      setHasPermission(true);
    } else if (videoElement && !previewStream && !isRecording) {
      videoElement.srcObject = null;
    }
  }, [previewStream, isRecording]);

  // Debug logging
  useEffect(() => {
    console.log("Status changed:", status);
    console.log("MediaBlobUrl:", mediaBlobUrl);
    console.log("PreviewStream:", previewStream);
  }, [status, mediaBlobUrl, previewStream]);

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
          const file = new File([blob], `video-recording-${Date.now()}.webm`, {
            type: blob.type || "video/webm",
          });

          console.log("Video file created:", file);
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
      {/* Video Preview */}
      <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
        {isRecording && (
          <video
            ref={videoPreviewRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {!isRecording && mediaBlobUrl && (
          <video
            src={mediaBlobUrl}
            controls
            controlsList="nodownload"
            className="w-full h-full object-cover"
          />
        )}

        {/* Recording indicator */}
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            REC
          </div>
        )}
      </div>

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
            <Video className="size-6" />
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
