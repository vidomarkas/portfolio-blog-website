"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import useScrollListener from "../lib/hooks/useScrollListener";

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
				<Link href="/" className="font-medium text-[22px]">
					Viktoras Domarkas
				</Link>
				<div className="flex items-center">
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
					<ModeToggle />
				</div>
			</div>
		</header>
	);
};
