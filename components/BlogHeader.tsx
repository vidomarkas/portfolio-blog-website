"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IMG_PADDING = 12;

export const TextParallaxContent = ({ imgUrl, heading, children }) => {
	return (
		<div
			style={{
				paddingLeft: IMG_PADDING,
				paddingRight: IMG_PADDING,
			}}
		>
			<div className="relative h-[150vh]">
				<StickyImage imgUrl={imgUrl} />
				<OverlayCopy heading={heading} />
			</div>
			{children}
		</div>
	);
};

const StickyImage = ({ imgUrl }) => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["end end", "end start"],
	});

	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
	const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

	return (
		<motion.div
			style={{
				backgroundImage: `url(${imgUrl})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				height: `calc(100vh - ${IMG_PADDING * 2}px)`,
				top: IMG_PADDING,
				scale,
			}}
			ref={targetRef}
			className="sticky z-0 overflow-hidden rounded-3xl"
		>
			<motion.div
				className="absolute inset-0 bg-neutral-950/70"
				style={{
					opacity,
				}}
			/>
		</motion.div>
	);
};

const OverlayCopy = ({ heading }) => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [250, -10]);
	const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

	return (
		<motion.div
			style={{
				y,
				opacity,
			}}
			ref={targetRef}
			className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white p-4"
		>
			<h1 className="block text-center text-4xl font-bold md:text-6xl">
				{heading}
			</h1>
		</motion.div>
	);
};
