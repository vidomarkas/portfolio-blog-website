"use client";
import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import useScrollListener from "../lib/hooks/useScrollListener";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerTrigger,
} from "@/components/ui/drawer";

export const Navbar = () => {
	const [navClassList, setNavClassList] = useState(["header"]);
	const [open, setOpen] = React.useState(false);
	const links = [
		{ name: "About", path: "/about" },
		{ name: "Work", path: "/work" },
		{ name: "Blog", path: "/blog" },
	];
	const pathName = usePathname();

	const scroll = useScrollListener();

	const onOpenChange = React.useCallback((open: boolean) => {
		setOpen(open);
	}, []);

	useEffect(() => {
		const _classList = ["header"];

		// Check if user has scrolled more than 150px
		if (scroll.y > 113 && scroll.y - scroll.lastY < 0) {
			_classList.push("header--scrolled");
		}

		// Reduce padding when scrolled more than 150px
		if (scroll.y > 113 && scroll.y - scroll.lastY > 0) {
			_classList.push("header--hidden");
		}

		setNavClassList(_classList);
	}, [scroll.y, scroll.lastY]);

	return (
		<header className={navClassList.join(" ")}>
			<div className="container mx-auto flex justify-between items-center">
				<Link
					href="/"
					className="font-medium text-[22px] underline-offset-8 hover:underline"
				>
					<div className="hidden md:block">Viktoras Domarkas</div>
					<div className="block md:hidden">V.D.</div>
				</Link>
				<div className="md:flex items-center hidden">
					<nav className="flex mr-6">
						<ul className="font-medium text-[22px] leading-none	 flex gap-6 nav">
							{links.map((link, index) => {
								return (
									<li key={index}>
										<Link
											href={link.path}
											className={cn(
												"py-2 px-4 relative transition-all duration-500 ease-out hover:underline underline-offset-8",
												pathName === link.path
													? "underline"
													: ""
											)}
										>
											{link.name}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
					<span className="h-[24px] w-[24px]">
						<ModeToggle />
					</span>
				</div>
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
										<MobileLink
											href="/"
											onOpenChange={setOpen}
											className=""
										>
											Home
										</MobileLink>
									</li>
									{links.map((link, index) => {
										return (
											<li
												key={index}
												className="text-center my-2"
											>
												<MobileLink
													href={link.path}
													onOpenChange={setOpen}
													className=""
												>
													{link.name}
												</MobileLink>
											</li>
										);
									})}
								</ul>
							</nav>
							<DrawerFooter>
								<ModeToggle />
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
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
