import z from "zod";

export const testimonialSchema = z
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

export type Testimonial = z.infer<typeof testimonialSchema>;
