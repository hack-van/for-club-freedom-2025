"use client";

import { useRef } from "react";
import { Button } from "../ui/button";
import { useController } from "react-hook-form";
import { Testimonial } from "@/lib/schema";
import { Video } from "lucide-react";

export default function MobileVideoRecorder() {
  const { field } = useController<Testimonial>({
    name: "mediaFile",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col p-4 border items-center rounded-lg gap-4 w-full">
      <input
        capture="user"
        type="file"
        accept="video/*"
        className="hidden"
        ref={(input) => {
          field.ref(input);
          inputRef.current = input;
        }}
        name={field.name}
        onChange={(e) => {
          e.preventDefault();
          const file = e.target.files?.[0];
          field.onChange(file);
        }}
      />

      {/* Video Preview */}
      {field.value && field.value instanceof File && (
        <video
          controls
          src={URL.createObjectURL(field.value)}
          className="w-full"
        />
      )}

      {/* Controllers */}
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          className="size-12 rounded-full"
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          <Video className="size-6" />
        </Button>
        {field.value && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              field.onChange(undefined);
            }}
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
