"use client";

import clsx from "clsx";
import { motion, useSpring, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Confetti from "react-dom-confetti";
import { slugify } from "../lib/utils";
import { useWindowSize } from "@uidotdev/usehooks";
import { ArrowRight } from "lucide-react";

export const Toc = ({ headings, objective }) => {
	const [activeId, setActiveId] = useState("");
	const headingsList = useRef(null);
	const scrollRef = useRef(0);
	const [tocCollapsed, setTocCollapsed] = useState(false);
	const innerContentContainerRef = useRef(null);
	const collapsedHeight = 120;
	const [innerContainerHeight, setInnerContainerHeight] = useState(0);
	const [bottom, setBottom] = useState(false);
	const win = useWindowSize();
	const scrollBarHeight = useSpring(0);
	const scrollCollapsedHeight = useSpring(0);
	const [postContentLoaded, setPostContentLoaded] = useState(false);
	const path = usePathname();

	useLayoutEffect(() => {
		setTimeout(() => {
			setPostContentLoaded(true);
		}, 1500);

		return () => {
			setPostContentLoaded(false);
		};
	}, [path]);

	const components = (type, node, text, children) => {
		if (type === "heading2" || type === "heading3") {
			const id = slugify(text);

			if (!text) {
				return <></>;
			}

			return (
				<li
					className={clsx("first:pt-0 last:pb-6", {
						"text-sm py-0.5": type === "heading3",
						"text-base py-2": type === "heading2",
					})}
				>
					<a
						href={`#${id}`}
						className={clsx(
							"inline-block lg:ml-8 rounded-sm text-gray-15 leading-6 px-2 relative transition-colors duration-200 focus:outline-none focus:ring-2 ring-gray-EE",
							{
								"pl-6": type === "heading3",
								"pl-2": type === "heading2",
								underline: activeId === id,
								"text-opacity-50 hover:text-primary-purple hover:text-opacity-100":
									activeId !== id,
							}
						)}
					>
						<>{text}</>
					</a>
				</li>
			);
		}

		return <></>;
	};

	const tocScroll = useTransform(
		scrollCollapsedHeight,
		[0, innerContainerHeight - 60],
		[0, -(innerContainerHeight - collapsedHeight)]
	);

	const collapseToc = () => {
		setTocCollapsed(!tocCollapsed);
	};

	useEffect(() => {
		const innerContainer = innerContentContainerRef?.current;

		if (!innerContainer) return;

		setInnerContainerHeight(innerContainer.clientHeight);
	}, [innerContentContainerRef]);

	useEffect(() => {
		const activeItem = document.querySelector(`[href='#${activeId}']`);
		const lastItem = headingsList.current?.lastChild;
		const activeParent = activeItem?.parentElement;
		const activeParentOffset = activeParent?.offsetTop || 0;
		const activeParentHeight = activeParent?.clientHeight || 0;
		const activeParentCenter = activeParentOffset + activeParentHeight;

		console.log("activeId", activeId);
		console.log("activeItem", activeItem);

		if (lastItem === activeParent) {
			setTimeout(() => {
				setBottom(true);
			}, 200);
		} else if (lastItem !== activeParent && bottom) {
			setBottom(false);
		}

		scrollBarHeight.set(activeParentCenter);
		scrollCollapsedHeight.set(activeParentOffset);
	}, [activeId]);

	useEffect(() => {
		if (win.width < 1024) {
			setTocCollapsed(true);
		} else {
			setTocCollapsed(false);
		}

		if (innerContainerHeight > win.height - 300) {
			setTocCollapsed(true);
		}
	}, [win, innerContainerHeight]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				console.log("entries", entries);
				entries.forEach((entry) => {
					const id = entry.target.getAttribute("id");

					if (entry.isIntersecting) {
						setActiveId(id);
						scrollRef.current = window.scrollY;
					} else {
						const diff = scrollRef.current - window.scrollY;
						const isScrollingUp = diff > 0;
						const currentIndex = headings.findIndex(
							(heading) => heading.id === id
						);
						const prevEntry = headings[currentIndex - 1];
						const prevId = prevEntry?.id;

						if (isScrollingUp && prevId) {
							setActiveId(prevId);
						}
					}
				});
			},
			{
				rootMargin: "0px 0px -85% 0px",
			}
		);

		const observeHeadings = () => {
			headings.forEach((heading) => {
				const headingId = slugify(
					heading.children.map((child: any) => child.text).join(" ")
				);

				const currentHeading = document.getElementById(headingId);

				if (currentHeading) {
					observer.observe(currentHeading);
				}
			});
		};

		if (postContentLoaded) {
			setTimeout(observeHeadings, 0);
		}

		return () => {
			headings.forEach((heading) => {
				const headingId = slugify(
					heading.children.map((child: any) => child.text).join(" ")
				);

				const currentHeading = document.getElementById(headingId);

				if (currentHeading) {
					observer.unobserve(currentHeading);
				}
			});
		};
	}, [postContentLoaded, headings]);

	return (
		<div className="sticky top-28 mb-12">
			<div className="bg-white overflow-hidden pt-6 px-6 pb-2.5 relative border-2 rounded-xl border-gray-EE">
				<header className="pb-4">
					<button
						onClick={() => collapseToc()}
						className="flex justify-between items-center w-full"
					>
						<h2 className="text-xl font-semibold">
							Table of contents
						</h2>
						<ArrowRight
							className={clsx(
								"w-7 h-7 -mr-2 transition-transform",
								{
									"rotate-90": tocCollapsed,
									"-rotate-90": !tocCollapsed,
								}
							)}
						/>
					</button>
				</header>
				<div className="relative">
					<motion.div
						className="overflow-hidden"
						animate={{
							height: tocCollapsed ? collapsedHeight : "auto",
						}}
					>
						<motion.div
							className="relative"
							ref={innerContentContainerRef}
							style={{
								y: tocCollapsed ? tocScroll : 0,
							}}
						>
							<div className="w-1 bg-[#EEE3FC] absolute top-0 left-4 bottom-0 hidden lg:block" />
							<motion.div
								style={{
									height: scrollBarHeight,
								}}
								className="w-1 origin-top bg-[#8E44EC] absolute top-0 left-4 hidden lg:block"
							/>
							<ul className="list-none" ref={headingsList}>
								{headings.map((heading) => {
									console.log("heading", heading);
									const headingText = heading.children
										.map((child: any) => child.text)
										.join(" ");

									const slug = slugify(headingText);
									return (
										<li
											key={heading?._key}
											className={clsx(
												"first:pt-0 last:pb-6",
												{
													"text-sm py-0.5":
														heading.style === "h3",
													"text-base py-2":
														heading.style === "h2",
												}
											)}
										>
											<a
												href={`#${slug}`}
												className={clsx(
													"inline-block lg:ml-8 rounded-sm text-gray-900 leading-6 px-2 relative transition-colors duration-200 focus:outline-none focus:ring-2 ring-gray-200",
													{
														"pl-6":
															heading.style ===
															"h3",
														"pl-2":
															heading.style ===
															"h2",
														underline:
															activeId ===
															heading.id,
														"text-opacity-50 hover:text-primary-purple hover:text-opacity-100":
															activeId !==
															heading.id,
													}
												)}
											>
												{headingText}
											</a>
										</li>
									);
								})}
							</ul>
						</motion.div>
					</motion.div>
					<div
						className={clsx(
							"absolute transition-opacity w-full inset-0 lg:left-7 bottom-auto hidden lg:block h-4 bg-gradient-to-b from-white to-transparent pointer-events-none",
							{
								"opacity-0": !tocCollapsed,
							}
						)}
					/>
					<div
						className={clsx(
							"absolute transition-opacity w-full inset-0 lg:left-7 top-auto h-4 bg-gradient-to-t from-white to-transparent pointer-events-none",
							{
								"opacity-0": !tocCollapsed,
							}
						)}
					/>
				</div>
				<div className="items-center bg-gray-100 rounded-lg z-10 relative -mx-3.5 py-2.5 pl-16 -mt-2 hidden lg:flex">
					<svg
						width="64"
						height="64"
						viewBox="0 0 64 64"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="absolute left-0 top-0"
					>
						<path
							d="M32 0C32 0 32 7.92318 32 13C21 13 12 22 12 33C12 44 21 53 32 53C43 53 52 44 52 33C52 22 43 13 32.5 13"
							stroke="#EEE3FC"
							strokeWidth="4"
						/>
						<motion.path
							d="M32 0C32 0 32 7.92318 32 13C21 13 12 22 12 33C12 44 21 53 32 53C43 53 52 44 52 33C52 22 43 13 32.5 13"
							stroke="#8E44EC"
							strokeWidth="4"
							animate={bottom ? "filled" : "empty"}
							variants={{
								filled: { pathLength: 1 },
								empty: { pathLength: 0 },
							}}
							transition={{
								duration: 0.3,
							}}
						/>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M25 30.5C24.4477 30.5 24 30.9477 24 31.5V39.5C24 40.0523 24.4477 40.5 25 40.5H39C39.5523 40.5 40 40.0523 40 39.5V31.5C40 30.9477 39.5523 30.5 39 30.5H25ZM31.5 33.5C30.9477 33.5 30.5 33.9477 30.5 34.5V37.5C30.5 38.0523 30.9477 38.5 31.5 38.5H32.5C33.0523 38.5 33.5 38.0523 33.5 37.5V34.5C33.5 33.9477 33.0523 33.5 32.5 33.5H31.5Z"
							fill="#8E44EC"
						/>
						<motion.path
							d="M36.5 30.5V29C36.5 26.5147 34.4853 24.5 32 24.5V24.5C29.5147 24.5 27.5 26.5147 27.5 29V30.5"
							stroke="#8E44EC"
							strokeWidth="3"
							animate={bottom ? "open" : "closed"}
							variants={{
								open: { pathLength: 0.8 },
								closed: { pathLength: 1 },
							}}
							transition={{
								duration: 0.1,
								delay: 0.2,
							}}
						/>
					</svg>
					{objective ? (
						<div className="text-base-tight flex flex-col">
							<span className="font-bold">{objective}</span>
							<span className="text-gray-50">{objective}</span>
						</div>
					) : (
						<div className="text-base-tight flex flex-col">
							<span className="font-bold">Congratulations!</span>
							<span className="text-gray-600">
								You’ve thoroughly explored this topic!
							</span>
						</div>
					)}
				</div>
				<div className={clsx("absolute bottom-10 left-10")}>
					<Confetti
						active={bottom}
						config={{
							colors: [
								"#8E44EC",
								"#E8C7FF",
								"#59B5F8",
								"#C3EEFE",
							],
							elementCount: 200,
							width: "8px",
							height: "8px",
							stagger: 0.2,
							startVelocity: 35,
							spread: 90,
						}}
					/>
				</div>
			</div>
		</div>
	);
};
