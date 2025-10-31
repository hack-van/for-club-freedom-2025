import {
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../globals.css?url";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import Navbar from "@/components/navbar";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Club Freedom Testimonials",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <Navbar />
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
