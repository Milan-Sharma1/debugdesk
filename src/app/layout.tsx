import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import Header from "../components/home/Header";
import Footer from "@/components/home/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});
//TODO: Add data for seo
//TODO: add search with particial matching
//TODO: add tag searching 
export const metadata: Metadata = {
    title: "Debug Desk | Your Knowledge-Sharing Hub",
    description:
        "Debug Desk is a cutting-edge Q&A platform built with Next.js and Appwrite, designed for developers and tech enthusiasts to ask questions, share answers, and collaborate effectively.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextTopLoader showSpinner={false} />
                <Header />
                {children}
                <Analytics />
                <Toaster
                    toastOptions={{
                        style: {
                            background: "#1a1a1a",
                            color: "#e0e0e0",
                            borderColor: "#333",
                        },
                    }}
                />
                <Footer />
            </body>
        </html>
    );
}
