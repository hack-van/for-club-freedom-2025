"use client";

import { Button } from "./ui/button";
import { Mic } from "lucide-react";
import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";

type Props = {};

export default function AudioRecorder(props: Props) {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
    });

  const isRecording = status === "recording";
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isRecording) {
      stopRecording();
      console.log("Recording stopped. Audio URL:", mediaBlobUrl);
    } else {
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
