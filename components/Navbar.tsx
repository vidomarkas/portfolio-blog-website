"use client";
import * as React from "react";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { ModeToggle } from "./ModeToggle";
import { cn } from "@/lib/utils";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerTrigger,
} from "@/components/ui/drawer";

const links = [
	{ name: "Work", path: "/work" },
	{ name: "Blog", path: "/blog" },
	{ name: "About", path: "/about" },
];

export const Navbar = () => {
	const [open, setOpen] = React.useState(false);
	const pathName = usePathname();

	const onOpenChange = React.useCallback((open: boolean) => {
		setOpen(open);
	}, []);

	return (
		<header className="nav-pill fixed top-3 left-4 right-4 z-40 mx-auto flex max-w-[500px] items-center justify-between overflow-hidden rounded-full border border-black/5 bg-white/60 py-2 pl-2 pr-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#121212]/60">
			<Link
				href="/"
				className="flex shrink-0 items-center gap-3"
				aria-label="Home"
			>
				<Image
					src="/assets/img/viktoras-domarkas.webp"
					alt="Viktoras Domarkas"
					width={40}
					height={40}
					className="h-10 w-10 rounded-full object-cover"
					priority
				/>
				<span className="whitespace-nowrap font-medium">
					Viktoras Domarkas
				</span>
			</Link>

			{/* Desktop */}
			<nav className="hidden md:block" aria-label="Primary">
				<ul className="flex items-center gap-5">
					{links.map((link) => (
						<li key={link.path}>
							<Link
								href={link.path}
								className={cn(
									"whitespace-nowrap font-medium underline-offset-4 transition-colors hover:underline",
									pathName === link.path
										? "underline"
										: "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
								)}
							>
								{link.name}
							</Link>
						</li>
					))}
					<li className="flex h-6 w-6 items-center">
						<ModeToggle />
					</li>
				</ul>
			</nav>

			{/* Mobile */}
			<div className="md:hidden">
				<Drawer open={open} onOpenChange={onOpenChange}>
					<DrawerTrigger>
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="!size-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 9h16.5m-16.5 6.75h16.5"
								></path>
							</svg>
							<span className="sr-only">Toggle Menu</span>
						</div>
					</DrawerTrigger>
					<DrawerContent>
						<nav className="overflow-auto p-6">
							<ul className="flex flex-col space-y-3">
								<li className="text-center">
									<MobileLink href="/" onOpenChange={setOpen}>
										Home
									</MobileLink>
								</li>
								{links.map((link) => (
									<li
										key={link.path}
										className="text-center my-2"
									>
										<MobileLink
											href={link.path}
											onOpenChange={setOpen}
										>
											{link.name}
										</MobileLink>
									</li>
								))}
							</ul>
						</nav>
						<DrawerFooter>
							<ModeToggle />
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
		</header>
	);
};

interface MobileLinkProps extends LinkProps {
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
}

function MobileLink({
	href,
	onOpenChange,
	className,
	children,
	...props
}: MobileLinkProps) {
	const router = useRouter();
	return (
		<Link
			href={href}
			onClick={() => {
				router.push(href.toString());
				onOpenChange?.(false);
			}}
			className={cn("text-lg", className)}
			{...props}
		>
			{children}
		</Link>
	);
}
