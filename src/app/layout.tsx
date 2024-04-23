import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="shortcut icon" href="/weatherLogo.webp" type="image/x-icon" />
      </head>
      <body className={`${inter.className}, container`}>
        <main>{children}</main>
        <Toaster richColors expand={false} />
      </body>
    </html>
  );
}
