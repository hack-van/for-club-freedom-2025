import { Migrations } from "@convex-dev/migrations";
import { api, components, internal } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { internalAction } from "./_generated/server";

export const migrations = new Migrations<DataModel>(components.migrations);

export const backFillSearchText = migrations.define({
  table: "testimonials",
  migrateOne(_, doc) {
    if (doc.searchText) {
      return {};
    }
    const email = doc.email || "";
    const name = doc.name || "";
    const summary = doc.summary || "";
    const text = doc.testimonialText || "";
    const title = doc.title || "";
    const searchText = [email, name, summary, text, title].join(" ");
    return { searchText };
  },
});

export const unsetCreatedAt = migrations.define({
  table: "testimonials",
  migrateOne() {
    return { createdAt: undefined };
  },
});

export const runMigration = migrations.runner([
  internal.migrations.backFillSearchText,
  internal.migrations.unsetCreatedAt,
]);

export const migrateToR2 = internalAction({
  async handler(ctx) {
    const medias = await ctx.runQuery(api.internal.r2.foundMediaForMigrations);
    console.log("Number medias to migrate:", medias.length);
    for (const media of medias) {
      if (!media.mediaId || !media.mediaType) {
        continue;
      }
      const storageId = await ctx.runAction(
        internal.internal.r2.uploadToR2Action,
        {
          mediaId: media.mediaId,
          mediaType: media.mediaType.contentType,
        }
      );
      if (storageId) {
        await ctx.runMutation(api.internal.r2.updateStorageId, {
          testimonialId: media._id,
          storageId,
        });
      }
    }
  },
});
