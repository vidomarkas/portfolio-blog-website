"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import vikPhoto from "@/public/assets/img/vik.avif";
import Link from "next/link";

const IMG_PADDING = 12;

export const TextParallaxContent = ({
	imgUrl,
	heading,
	timeToRead,
	date,
	children,
}) => {
	return (
		<div
			style={{
				paddingLeft: IMG_PADDING,
				paddingRight: IMG_PADDING,
			}}
		>
			<div className="relative h-[150vh]">
				<StickyImage imgUrl={imgUrl} />
				<OverlayCopy
					heading={heading}
					date={date}
					timeToRead={timeToRead}
				/>
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

const OverlayCopy = ({ heading, date, timeToRead }) => {
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
			<h1 className="block text-center text-4xl font-bold md:text-6xl mb-10">
				{heading}
			</h1>
			<div className="mb-3">
				<span>{date}</span>
				{timeToRead > 0 && <span> · {timeToRead} min read</span>}
			</div>

			<Link href="/about">
				<div className="flex items-center">
					<div className="relative mr-2">
						<svg
							width="40"
							height="40"
							viewBox="0 0 40 40"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M40 20C40 23.5104 39.0761 26.9589 37.321 29.9991C35.566 33.0393 33.0417 35.564 30.0018 37.3195C26.9619 39.075 23.5135 39.9994 20.0031 40C16.4928 40.0006 13.0441 39.0772 10.0036 37.3226L11.0033 35.5903C13.7397 37.1694 16.8435 38.0005 20.0028 38C23.1622 37.9995 26.2657 37.1675 29.0016 35.5875C31.7375 34.0076 34.0094 31.7353 35.5889 28.9992C37.1685 26.263 38 23.1593 38 20H40Z"
								fill="#006A44"
							/>
							<path
								d="M10 2.67949C13.0401 0.924302 16.4886 0.000183694 19.999 2.73748e-08C23.5093 -0.000183639 26.9579 0.923574 29.9982 2.67844C33.0384 4.43331 35.5633 6.95748 37.3189 9.99728C39.0746 13.0371 39.9993 16.4854 40 19.9958L38 19.9962C37.9993 16.8369 37.1671 13.7334 35.587 10.9975C34.0069 8.26173 31.7346 5.98998 28.9984 4.4106C26.2621 2.83122 23.1584 1.99983 19.9991 2C16.8397 2.00017 13.7361 2.83187 11 4.41154L10 2.67949Z"
								fill="#FDB913"
							/>
							<path
								d="M10 37.3205C6.95992 35.5653 4.43536 33.0409 2.68001 30.0009C0.924663 26.9609 0.000364707 23.5125 1.07875e-07 20.0021C-0.000364491 16.4917 0.923217 13.0431 2.67793 10.0027C4.43265 6.96235 6.95669 4.43739 9.9964 2.68157L10.9968 4.41341C8.26102 5.99365 5.98939 8.26611 4.41014 11.0024C2.8309 13.7387 1.99967 16.8425 2 20.0019C2.00033 23.1612 2.8322 26.2648 4.41201 29.0008C5.99182 31.7368 8.26393 34.0088 11 35.5885L10 37.3205Z"
								fill="#C1272D"
							/>
						</svg>

						<Image
							className="absolute top-1 left-1 h-8 w-8 rounded-full"
							src={vikPhoto}
							alt="web developer Viktoras Domarkas"
						/>
					</div>

					<div>By Viktoras Domarkas</div>
				</div>
			</Link>
		</motion.div>
	);
};
