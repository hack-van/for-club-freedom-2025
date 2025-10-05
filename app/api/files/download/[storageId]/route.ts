// app/api/files/download/[storageId]/route.ts
import { NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: { storageId: string } }
) {
  const url = await fetchQuery(api.testimonials.getUrl, { storageId: params.storageId as any });
  if (!url) return new NextResponse("Not found", { status: 404 });

  // Stream from Convex's signed URL
  const upstream = await fetch(url, { cache: "no-store" });
  if (!upstream.ok || !upstream.body) return new NextResponse("Not found", { status: 404 });

  const filename = `${params.storageId}.mp3`; // ← set your preferred name (or look it up from DB)
  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "application/octet-stream",
      "Content-Length": upstream.headers.get("content-length") ?? "",
      "Accept-Ranges": upstream.headers.get("accept-ranges") ?? "bytes",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, max-age=0, no-store",
    },
  });
}
