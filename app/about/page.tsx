"use client";

// import { useAnimate } from "framer-motion";
import React from "react";
import { Youtube, Linkedin, Instagram, Github, Mail } from "lucide-react";
// import Image from "next/image";

const About = () => {
	return (
		<>
			<div className="flex flex-col min-h-screen mt-32">
				<main className="flex-grow ">
					<section className="container grid w-full py-20 ">
						<div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
							<div className="lg:pl-20">
								<div className="max-w-xs px-2.5 lg:max-w-none">
									{/* <Image /> */}
								</div>
							</div>
							<div className="lg:order-first lg:row-span-2">
								<h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
									I’m Vik. I’m a web developer and a digital
									creator.
								</h1>
								<div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
									<p>
										Hi, I’m Viktoras — a self-taught web
										developer from Lithuania, now based in
										the UK. I’m passionate about creating
										meaningful and functional digital
										experiences. What began as a curious
										exploration into coding in 2017 has
										grown into a fulfilling career that I
										genuinely love.
									</p>

									<p>
										Over the years, I’ve worked on a wide
										range of projects — from improving small
										business websites to creating advanced
										web applications and custom solutions
										for businesses. I love solving problems
										and turning ideas into reality, whether
										it’s by building a smooth user
										interface, optimizing performance, or
										creating tailored tools to meet unique
										needs.
									</p>

									<p>
										But it’s not just about coding for me.
										I’m passionate about personal growth and
										constantly challenging myself to learn
										and improve. That same mindset drives my
										approach to development — I’m always
										looking for better ways to do things and
										exploring the latest technologies.
									</p>

									<p>
										When I’m not coding, you’ll often find
										me at the gym, exploring new places, or
										brainstorming ideas for my next project.
										I believe in balancing work with life
										and drawing inspiration from the world
										around me to bring fresh ideas to
										everything I do.
									</p>

									<p>
										Let’s connect — whether you want to chat
										about web development, share
										experiences, or collaborate on something
										exciting!
									</p>
								</div>
							</div>
							<div className="lg:pl-20">
								<ul role="list">
									<li className="mt-4 flex">
										<a
											className="group flex text-sm font-medium text-zinc-800 transition hover:text-orange-500 dark:text-zinc-200 dark:hover:text-orange-500"
											href="https://www.youtube.com/@viktorasdomarkas9104"
										>
											<Youtube />
											<span className="ml-4">
												Follow on YouTube
											</span>
										</a>
									</li>

									<li className="mt-4 flex">
										<a
											className="group flex text-sm font-medium text-zinc-800 transition hover:text-orange-500 dark:text-zinc-200 dark:hover:text-orange-500"
											href="https://www.instagram.com/viktorascodes/"
										>
											<Instagram />
											<span className="ml-4">
												Follow on Instagram
											</span>
										</a>
									</li>

									<li className="mt-4 flex">
										<a
											className="group flex text-sm font-medium text-zinc-800 transition hover:text-orange-500 dark:text-zinc-200 dark:hover:text-orange-500"
											href="https://github.com/vidomarkas"
										>
											<Github />
											<span className="ml-4">
												Follow on GitHub
											</span>
										</a>
									</li>
									<li className="mt-4 flex">
										<a
											className="group flex text-sm font-medium text-zinc-800 transition hover:text-orange-500 dark:text-zinc-200 dark:hover:text-orange-500"
											href="https://www.linkedin.com/in/viktoras-domarkas/"
										>
											<Linkedin className="h-6 w-6 flex-none" />

											<span className="ml-4">
												Follow on LinkedIn
											</span>
										</a>
									</li>
									<li className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex">
										<a
											className="group flex text-sm font-medium text-zinc-800 transition hover:text-orange-500 dark:text-zinc-200 dark:hover:text-orange-500"
											href="mailto:hey@domarkas.co"
										>
											<Mail />
											<span className="ml-4">
												hey@domarkas.co
											</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</section>
					{/* <MouseImageTrail
						renderImageBuffer={50}
						rotationRange={25}
						images={[
							"/assets/img/archive.webp",
							"/assets/img/athotel.webp",
							"/assets/img/days.webp",
							"/assets/img/invision.webp",
							"/assets/img/tripscout.webp",
							"/assets/img/archive.webp",
							"/assets/img/athotel.webp",
							"/assets/img/days.webp",
							"/assets/img/invision.webp",
							"/assets/img/tripscout.webp",
							"/assets/img/archive.webp",
							"/assets/img/athotel.webp",
							"/assets/img/days.webp",
							"/assets/img/invision.webp",
							"/assets/img/tripscout.webp",
						]}
					>
						<section className="grid h-screen w-full place-content-center ">
							<p className="flex items-center gap-2 text-3xl font-bold uppercase ">
							
								<span>Hover me</span>
							</p>
						</section>
					</MouseImageTrail>
					<section>
						<h2 className="text-7xl">My Stack</h2>
					</section> */}
					{/* Certificates */}
				</main>
			</div>
		</>
	);
};

// const MouseImageTrail = ({
// 	children,
// 	// List of image sources
// 	images,
// 	// Will render a new image every X pixels between mouse moves
// 	renderImageBuffer,
// 	// images will be rotated at a random number between zero and rotationRange,
// 	// alternating between a positive and negative rotation
// 	rotationRange,
// }) => {
// 	const [scope, animate] = useAnimate();

// 	const lastRenderPosition = useRef({ x: 0, y: 0 });
// 	const imageRenderCount = useRef(0);

// 	const handleMouseMove = (e) => {
// 		const { clientX, clientY } = e;

// 		const distance = calculateDistance(
// 			clientX,
// 			clientY,
// 			lastRenderPosition.current.x,
// 			lastRenderPosition.current.y
// 		);

// 		if (distance >= renderImageBuffer) {
// 			lastRenderPosition.current.x = clientX;
// 			lastRenderPosition.current.y = clientY;

// 			renderNextImage();
// 		}
// 	};

// 	const calculateDistance = (x1, y1, x2, y2) => {
// 		const deltaX = x2 - x1;
// 		const deltaY = y2 - y1;

// 		// Using the Pythagorean theorem to calculate the distance
// 		const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

// 		return distance;
// 	};

// 	const renderNextImage = () => {
// 		const imageIndex = imageRenderCount.current % images.length;
// 		const selector = `[data-mouse-move-index="${imageIndex}"]`;

// 		const el = document.querySelector(selector);

// 		el.style.top = `${lastRenderPosition.current.y}px`;
// 		el.style.left = `${lastRenderPosition.current.x}px`;
// 		el.style.zIndex = imageRenderCount.current.toString();

// 		const rotation = Math.random() * rotationRange;

// 		animate(
// 			selector,
// 			{
// 				opacity: [0, 1],
// 				transform: [
// 					`translate(-50%, -25%) scale(0.5) ${
// 						imageIndex % 2
// 							? `rotate(${rotation}deg)`
// 							: `rotate(-${rotation}deg)`
// 					}`,
// 					`translate(-50%, -50%) scale(1) ${
// 						imageIndex % 2
// 							? `rotate(-${rotation}deg)`
// 							: `rotate(${rotation}deg)`
// 					}`,
// 				],
// 			},
// 			{ type: "spring", damping: 15, stiffness: 200 }
// 		);

// 		animate(
// 			selector,
// 			{
// 				opacity: [1, 0],
// 			},
// 			{ ease: "linear", duration: 0.5, delay: 5 }
// 		);

// 		imageRenderCount.current = imageRenderCount.current + 1;
// 	};

// 	return (
// 		<div
// 			ref={scope}
// 			className="relative overflow-hidden"
// 			onMouseMove={handleMouseMove}
// 		>
// 			{children}

// 			{images.map((img, index) => (
// 				<img
// 					className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
// 					src={img}
// 					alt={`Mouse move image ${index}`}
// 					key={index}
// 					data-mouse-move-index={index}
// 				/>
// 			))}
// 		</div>
// 	);
// };

export default About;
