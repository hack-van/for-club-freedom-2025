/* eslint-disable no-restricted-imports */
import {
  mutation as rawMutation,
  internalMutation as rawInternalMutation,
} from "./_generated/server";
/* eslint-enable no-restricted-imports */
import { DataModel } from "./_generated/dataModel";
import { Triggers } from "convex-helpers/server/triggers";
import {
  customCtx,
  customMutation,
} from "convex-helpers/server/customFunctions";

// start using Triggers, with table types from schema.ts
const triggers = new Triggers<DataModel>();

// register a function to run when a `ctx.db.insert`, `ctx.db.patch`, `ctx.db.replace`, or `ctx.db.delete` changes the "testimonials" table
triggers.register("testimonials", async (ctx, change) => {
  if (change.operation !== "insert") {
    return;
  }
  const mediaId = change.newDoc.media_id;

  if (!mediaId) {
    console.log(
      `New testimonial inserted with id ${change.id} but no media ID.`
    );
    return;
  }

  const id = change.id;
  const mediaUrl = await ctx.storage.getUrl(mediaId);
  console.log(
    `New testimonial inserted with id ${id} and media URL: ${mediaUrl}`
  );

  // TODO: Make API call to transcription service like AssemblyAI or Google Speech-to-Text

  // Update the testimonial with the transcript and summary
});

// create wrappers that replace the built-in `mutation` and `internalMutation`
// the wrappers override `ctx` so that `ctx.db.insert`, `ctx.db.patch`, etc. run registered trigger functions
export const mutation = customMutation(rawMutation, customCtx(triggers.wrapDB));
export const internalMutation = customMutation(
  rawInternalMutation,
  customCtx(triggers.wrapDB)
);
