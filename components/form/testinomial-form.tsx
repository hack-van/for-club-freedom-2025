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
import UploadPreview from "../upload-preview";
import dynamic from "next/dynamic";
import { Mic, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

// Dynamic import with SSR disabled
const AudioRecorder = dynamic(() => import("../audio-recorder"), {
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

const VideoRecorder = dynamic(() => import("../video-recorder"), {
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
    email: z.email("Please enter a valid email address"),
    audioFile: z
      .file({ error: "Please record your audio testimonial" })
      .optional(),
    writtenText: z.string(),
    constent: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms",
    }),
  })
  .superRefine((data, ctx) => {
    if (
      (!data.writtenText || data.audioFile) &&
      (data.writtenText || !data.audioFile)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Please provide your testimonial",
        path: ["writtenText"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Please provide an audio testimonial",
        path: ["audioFile"],
      });
    }
  });

export default function TestimonialForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", writtenText: "", constent: false },
  });
  const router = useRouter();

  const generateUploadUrl = useMutation(api.testimonials.generateUploadUrl);
  const postTestimonial = useMutation(api.testimonials.postTestimonial);

  const [tabValue, setTabValue] = useState("text");

  const handleTabChange = (value: string) => {
    setTabValue(value);
    form.resetField("audioFile");
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      let storageId: string | undefined = undefined;
      if (values.audioFile) {
        storageId = await uploadAudioFile(values.audioFile);
        if (!storageId) {
          throw new Error("Failed to upload audio file");
        }
      }

      // Step 3: Save testimonial data with storage ID
      const id = await postTestimonial({
        name: values.name,
        email: values.email,
        audio: storageId as any,
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
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <FormLabel>Email</FormLabel>
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
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
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
                name="audioFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audio Testimonial</FormLabel>
                    <FormControl>
                      <AudioRecorder
                        onRecordingComplete={(audioFile) => {
                          // Update the form
                          field.onChange(audioFile);
                          console.log("Recorded audio file:", audioFile);
                        }}
                      />
                    </FormControl>
                    {field.value ? <UploadPreview file={field.value} /> : null}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="video">
              <FormField
                control={form.control}
                name="audioFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Testimonial</FormLabel>
                    <FormDescription>
                      Please record a short video testimonial
                    </FormDescription>
                    <FormControl>
                      <VideoRecorder
                        onRecordingComplete={(videoFile) => {
                          // Update the form
                          field.onChange(videoFile);
                          console.log("Recorded video file:", videoFile);
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
