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
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FileUpload from "../file-upload";
import { Checkbox } from "../ui/checkbox";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  audioFile: z.array(z.any()).min(1, "Please upload an audio file"),
  constent: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to the terms" }),
});

export default function TestimonialForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", audioFile: [], constent: false },
  });

  const generateUploadUrl = useMutation(api.testimonials.generateUploadUrl);
  const postTestimonial = useMutation(api.testimonials.postTestimonial);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Upload the audio file
    const file = values.audioFile[0] as FileWithPreview;
    if (!file || !file.file) {
      toast.error("Please upload an audio file.");
      return;
    }

    // Ensure we have a proper File object (not FileMetadata)
    if (!(file.file instanceof File)) {
      toast.error("Invalid file format. Please select a new file.");
      return;
    }

    try {
      // Step 1: Generate upload URL
      const uploadUrl = await generateUploadUrl();

      // Step 2: Upload the file to Convex storage
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.file.type },
        body: file.file,
      });

      if (!result.ok) {
        throw new Error("Failed to upload file");
      }

      const { storageId } = await result.json();

      // Step 3: Save testimonial data with storage ID
      await postTestimonial({
        name: values.name,
        email: values.email,
        audio: storageId,
      });

      toast.success("Testimonial submitted successfully!", {
        description: "Thank you for your submission.",
      });
      form.reset();
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
          <FormField
            control={form.control}
            name="audioFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Audio Testimonial</FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value || []}
                    onChange={(files: FileWithPreview[]) =>
                      field.onChange(files)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
