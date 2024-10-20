"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
	AnimatePresence,
	MotionValue,
	motion,
	useMotionValue,
	useTransform,
} from "framer-motion";
import useScrollListener from "../lib/hooks/useScrollListener";

const Navbar = () => {
	const links = [
		{ name: "About", path: "/about" },
		{ name: "Work", path: "/work" },
		{ name: "Blog", path: "/blog" },
	];
	const pathName = usePathname();

	const [navClassList, setNavClassList] = useState(["header"]);
	const scroll = useScrollListener();

	useEffect(() => {
		let _classList = ["header"];

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

	const MotionLink = motion(Link);

	const mapRange = (
		inputLower: number,
		inputUpper: number,
		outputLower: number,
		outputUpper: number
	) => {
		const INPUT_RANGE = inputUpper - inputLower;
		const OUTPUT_RANGE = outputUpper - outputLower;

		return (value: number) =>
			outputLower +
			(((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0);
	};

	const setTransform = (
		item: HTMLElement & EventTarget,
		event: React.PointerEvent,
		x: MotionValue,
		y: MotionValue
	) => {
		const bounds = item.getBoundingClientRect();
		const relativeX = event.clientX - bounds.left;
		const relativeY = event.clientY - bounds.top;
		const xRange = mapRange(0, bounds.width, -1, 1)(relativeX);
		const yRange = mapRange(0, bounds.height, -1, 1)(relativeY);
		x.set(xRange * 10);
		y.set(yRange * 10);
		// console.log(xRange);
	};
	return (
		<header className={navClassList.join(" ")}>
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className="font-medium text-[22px]">
					Viktoras Domarkas
				</Link>
				<div className="flex items-center">
					<nav className="flex mr-6">
						<ul className="font-medium text-[22px] leading-none	 flex gap-6 nav">
							<AnimatePresence>
								{links.map((link, index) => {
									const x = useMotionValue(0);
									const y = useMotionValue(0);
									const textX = useTransform(
										x,
										(latest) => latest * 0.5
									);
									const textY = useTransform(
										y,
										(latest) => latest * 0.5
									);
									return (
										<motion.li
											key={index}
											onPointerMove={(event) => {
												const item =
													event.currentTarget;
												setTransform(item, event, x, y);
											}}
											onPointerLeave={(event) => {
												x.set(0);
												y.set(0);
											}}
											style={{ x, y }}
										>
											<MotionLink
												href={link.path}
												className={cn(
													"py-2 px-4 relative transition-all duration-500 ease-out",
													pathName === link.path
														? "text-slate-400"
														: ""
												)}
											>
												<motion.span
													style={{
														x: textX,
														y: textY,
													}}
													className="z-10 relative"
												>
													{link.name}
												</motion.span>
											</MotionLink>
										</motion.li>
									);
								})}
							</AnimatePresence>
						</ul>
					</nav>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
};

export default Navbar;
