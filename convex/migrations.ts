import { Migrations } from "@convex-dev/migrations";
import { components, internal } from "./_generated/api.js";
import { DataModel } from "./_generated/dataModel.js";

export const migrations = new Migrations<DataModel>(components.migrations);

export const backFillSearchText = migrations.define({
  table: "testimonials",
  migrateOne(ctx, doc) {
    const email = doc.email || "";
    const name = doc.name || "";
    const summary = doc.summary || "";
    const text = doc.testimonialText || "";
    const title = doc.title || "";
    const searchText = [email, name, summary, text, title].join(" ");
    return { ...doc, searchText };
  },
});

export const backFillStorageId = migrations.define({
  table: "testimonials",
  async migrateOne(ctx, doc) {
    if (!doc.media_id) {
      return { storageId: undefined }
    }
    const url = await ctx.storage.getUrl(doc.media_id);
    if (!url) {
      return { storageId: undefined }
    }
    // Extract storageId from URL
    const storageId = url.split("/").pop() || undefined;
    return { storageId };
  },
});

export const unsetCreatedAt = migrations.define({
  table: "testimonials",
  migrateOne() {
    return { createdAt: undefined };
  },
});

export const runBackfillSearchText = migrations.runner(
  internal.migrations.backFillSearchText
);

export const runBackfillStorageId = migrations.runner(
  internal.migrations.backFillStorageId
);

export const runUnsetCreatedAt = migrations.runner(
  internal.migrations.unsetCreatedAt
);


