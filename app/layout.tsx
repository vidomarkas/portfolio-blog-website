import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Console from "@/components/Console";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager } from "@next/third-parties/google";

const geistSans = localFont({
	src: "../public/assets/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "300 400 500 600",
});
const geistMono = localFont({
	src: "../public/assets/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const sourceSerif = localFont({
	src: "../public/assets/fonts/SourceSerif4-Regular.woff2",
	variable: "--font-source-serif",
	weight: "400",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://domarkas.co"),
	title: {
		default: "Viktoras Domarkas | Full-Stack Developer",
		template: "%s | Viktoras Domarkas",
	},
	description:
		"Full-stack developer building websites and web apps end to end. React, TypeScript and Node, WordPress when it fits. Based in Klaipėda, Lithuania, open to remote.",
	openGraph: {
		type: "website",
		siteName: "Viktoras Domarkas",
		locale: "en_GB",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<GoogleTagManager gtmId="GTM-N5S5WW8J" />
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					{children}
					<Footer />
				</ThemeProvider>
				<Console />
				<SpeedInsights />
			</body>
		</html>
	);
}
