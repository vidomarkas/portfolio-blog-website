import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Console from "@/components/Console";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
	title: {
		default:
			"Viktoras Domarkas - Web Developer in the UK | Front-End & Back-End Expertise",
		template: "%s - Viktoras Domarkas - Web Developer in the UK",
	},
	description:
		"Viktoras Domarkas is a skilled web developer specialising in building high-performance websites, bespoke web applications, and seamless user experiences. Based in the UK, he brings almost a decade of expertise in front-end and back-end development, delivering tailored solutions that drive results.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
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
