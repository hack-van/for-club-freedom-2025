"use client";

import { Button } from "./ui/button";
import { Mic, Square } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  useReactMediaRecorder,
  ReactMediaRecorder,
} from "react-media-recorder";
import TimeElapsed from "./time-elapsed";

type Props = {
  onRecordingComplete: (audioFile?: File) => void;
};

export default function AudioRecorder({ onRecordingComplete }: Props) {
  return (
    <ReactMediaRecorder
      audio
      blobPropertyBag={{ type: "audio/mpeg" }}
      onStop={(_, blob) => {
        const audioFile = new File(
          [blob],
          `audio-recording-${Date.now()}.mp3`,
          {
            type: "audio/mpeg",
          }
        );
        onRecordingComplete(audioFile);
      }}
      render={({
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        clearBlobUrl,
      }) => {
        const isRecording = status === "recording";

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

            {isRecording && <TimeElapsed isRecording={isRecording} />}

            {/* Controls */}
            <div className="flex items-center gap-3">
              {!isRecording && (
                <Button
                  size="icon"
                  className="size-12 rounded-full"
                  type="button"
                  onClick={startRecording}
                >
                  <Mic className="size-6" />
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
