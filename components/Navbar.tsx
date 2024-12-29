"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import useScrollListener from "../lib/hooks/useScrollListener";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

export const Navbar = () => {
	const links = [
		{ name: "About", path: "/about" },
		{ name: "Work", path: "/work" },
		{ name: "Blog", path: "/blog" },
	];
	const pathName = usePathname();

	const [navClassList, setNavClassList] = useState(["header"]);
	const scroll = useScrollListener();

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
					<Drawer>
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
							<DrawerHeader>
								<DrawerTitle>Menu</DrawerTitle>
								<DrawerDescription>
									<nav className="">
										<ul className="">
											{links.map((link, index) => {
												return (
													<li key={index}>
														<Link
															href={link.path}
															className={cn(
																"py-2 px-4 relative transition-all duration-500 ease-out hover:underline underline-offset-8",
																pathName ===
																	link.path
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
								</DrawerDescription>
							</DrawerHeader>
							<DrawerFooter>
								{/* <Button>Submit</Button> */}
								<ModeToggle />
								<DrawerClose>
									{/* <Button variant="outline">Cancel</Button> */}
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
			</div>
		</header>
	);
};
