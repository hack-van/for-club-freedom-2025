import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";

const openSans = Open_Sans({
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Club Freedom Testimonial",
  description: "Share your testimonial with Club Freedom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
