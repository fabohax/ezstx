import type { Metadata } from "next";
import { Inter, Chakra_Petch } from "next/font/google";
import { Providers } from '@/components/ui/provider';
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "zyfr | 40230",
  description: "easy on-boarding for all",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${chakraPetch.variable} antialiased`}>
        <Providers>
          <>
            {children}
          </>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
