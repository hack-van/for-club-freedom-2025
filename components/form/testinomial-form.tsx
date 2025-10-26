"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Mic, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

// Dynamic import with SSR disabled
const AudioRecorder = dynamic(() => import("../recorder/audio-recorder"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col p-4 border items-center rounded-lg gap-4">
      <Button size="icon" className="size-12 rounded-full" disabled>
        <Mic className="size-6" />
      </Button>
      <div className="text-sm font-medium">Loading recorder...</div>
    </div>
  ),
});

const VideoRecorder = dynamic(() => import("../recorder/video-recorder"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col p-4 border items-center rounded-lg gap-4">
      <Button size="icon" className="size-12 rounded-full" disabled>
        <Video className="size-6" />
      </Button>
      <div className="text-sm font-medium">Loading recorder...</div>
    </div>
  ),
});

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Please enter a valid email address").optional(),
    mediaFile: z
      .file({ error: "Please record your audio testimonial" })
      .optional(),
    writtenText: z.string(),
    constent: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms",
    }),
  })
  .superRefine((data, ctx) => {
    if (
      (!data.writtenText || data.mediaFile) &&
      (data.writtenText || !data.mediaFile)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Please provide your testimonial",
        path: ["writtenText"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Please provide an audio testimonial",
        path: ["mediaFile"],
      });
    }
  });

export default function TestimonialForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", writtenText: "", constent: false },
  });
  const router = useRouter();

  const generateUploadUrl = useMutation(api.testimonials.generateUploadUrl);
  const postTestimonial = useMutation(api.testimonials.postTestimonial);

  const [tabValue, setTabValue] = useState("video");

  const handleTabChange = (value: string) => {
    setTabValue(value);
    form.resetField("mediaFile");
    form.resetField("writtenText");
  };

  const uploadAudioFile = async (file: File) => {
    const uploadUrl = await generateUploadUrl();
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!result.ok) {
      return undefined;
    }
    const { storageId } = await result.json();
    return storageId as string;
  };

  const canSwitchTab =
    form.watch("mediaFile") == null && form.watch("writtenText") === "";

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let storageId: string | undefined = undefined;
      let media_type = "text";
      if (values.mediaFile) {
        storageId = await uploadAudioFile(values.mediaFile);
        if (!storageId) {
          throw new Error("Failed to upload audio file");
        }
        if (values.mediaFile.type.startsWith("audio")) {
          media_type = "audio";
        } else if (values.mediaFile.type.startsWith("video")) {
          media_type = "video";
        }
      }

      // Step 3: Save testimonial data with storage ID
      const id = await postTestimonial({
        name: values.name,
        email: values.email,
        media_id: storageId as any,
        media_type: media_type,
        text: values.writtenText,
      });

      toast.success("Testimonial submitted successfully!", {
        description: "Thank you for your submission.",
      });
      form.reset();
      router.push(`/testimonials/${id}`);
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error("Failed to submit testimonial", {
        description: "Please try again later.",
      });
    }
  }

  return (
    <div className="w-full max-w-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <small>(optional)</small>
                </FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Tabs
            className="w-full"
            value={tabValue}
            onValueChange={handleTabChange}
          >
            <TabsList>
              <TabsTrigger value="video" disabled={!canSwitchTab}>
                Video
              </TabsTrigger>
              <TabsTrigger value="audio" disabled={!canSwitchTab}>
                Audio
              </TabsTrigger>
              <TabsTrigger value="text" disabled={!canSwitchTab}>
                Text
              </TabsTrigger>
            </TabsList>
            <TabsContent value="text">
              <FormField
                control={form.control}
                name="writtenText"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Written Testimonial</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Start typing..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="audio">
              <FormField
                control={form.control}
                name="mediaFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audio Testimonial</FormLabel>
                    <FormDescription>
                      Please find a quiet place to record your audio
                      testimonial.
                    </FormDescription>
                    <FormControl>
                      <AudioRecorder
                        onRecordingComplete={(mediaFile) => {
                          field.onChange(mediaFile);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="video">
              <FormField
                control={form.control}
                name="mediaFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Testimonial</FormLabel>
                    <FormDescription>
                      Please find a quiet place to record your video
                      testimonial.
                    </FormDescription>
                    <FormControl>
                      <VideoRecorder
                        onRecordingComplete={(videoFile) => {
                          field.onChange(videoFile);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>
          <FormField
            control={form.control}
            name="constent"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3">
                <FormControl>
                  <Checkbox
                    name="constent"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-2 leading-none">
                  <FormLabel className="text-sm font-normal">
                    I agree that my personal information and testimonial may be
                    processsed and published on the Club Freedom service.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner />}
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
