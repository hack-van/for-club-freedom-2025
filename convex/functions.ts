/* eslint-disable no-restricted-imports */
import { mutation as rawMutation, internalMutation as rawInternalMutation } from "./_generated/server";
/* eslint-enable no-restricted-imports */
import { DataModel } from "./_generated/dataModel";
import { Triggers } from "convex-helpers/server/triggers";
import { customCtx, customMutation } from "convex-helpers/server/customFunctions";

// start using Triggers, with table types from schema.ts
const triggers = new Triggers<DataModel>();

// register a function to run when a `ctx.db.insert`, `ctx.db.patch`, `ctx.db.replace`, or `ctx.db.delete` changes the "testimonials" table
triggers.register("testimonials", async (ctx, change) => {
    if (change.operation !== "insert") {
        return;
    }
    const id = change.id;
    const audioUrl = await ctx.storage.getUrl(change.newDoc.audio);
    console.log(`New testimonial inserted with id ${id} and audio URL: ${audioUrl}`);

    // TODO: Make API call to transcription service like AssemblyAI or Google Speech-to-Text

    const transcript = "Transcription placeholder"; // Replace with actual transcription result
    const summary = "Summary placeholder"; // Replace with actual summary result

    // Update the testimonial with the transcript and summary
    await ctx.db.patch(id, { testimonialText: transcript, summary: summary });
});

// create wrappers that replace the built-in `mutation` and `internalMutation`
// the wrappers override `ctx` so that `ctx.db.insert`, `ctx.db.patch`, etc. run registered trigger functions
export const mutation = customMutation(rawMutation, customCtx(triggers.wrapDB));
export const internalMutation = customMutation(rawInternalMutation, customCtx(triggers.wrapDB));
