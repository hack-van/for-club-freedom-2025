import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchAction } from "convex/nextjs";

export async function GET(
  _: Request,
  ctx: RouteContext<"/testimonials/[id]/download-media">
) {
  const { id } = await ctx.params;
  const url = await fetchAction(api.testimonials.generateMediaDownloadUrl, {
    id,
  } as { id: Id<"testimonials"> });

  if (!url) {
    return new Response("Media not found", { status: 404 });
  }

  return Response.redirect(url);
}
