import React from "react";
import { Youtube, Linkedin, Instagram, Github, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
	return (
		<>
			<div className="flex flex-col min-h-screen mt-32">
				<main className="flex-grow ">
					<section className="container grid w-full py-20 ">
						<div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
							<div className="lg:pl-20">
								
								<figure className="max-w-xs px-2.5 mx-auto lg:mx-0 lg:max-w-none">
	<Image
		src="/assets/img/viktoras-mongodb-london.webp"
		alt="Viktoras Domarkas at the MongoDB conference in London"
		width={1000}
		height={1333}
		sizes="(min-width: 1024px) 500px, 320px"
		priority
		className="aspect-square rotate-3 rounded-2xl object-cover bg-zinc-100 dark:bg-zinc-800"
	/>
	<figcaption className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
		MongoDB conference, London
	</figcaption>
</figure>
								
							</div>
							<div className="lg:order-first lg:row-span-2">
								<h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
									I’m Viktoras.<br />I’ve been building for the web since 2017.
								</h1>
								<div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
									<p>I started writing code while living in the United Kingdom, and spent years there building websites and web applications for agencies and their clients. Most of it ran on WordPress, but not the off-the-shelf kind: custom functionality in PHP and React, third-party and CRM integrations, bespoke page-building tools for editorial teams, and the kind of migrations that come with four-digit page counts. These days I’m based in Klaipėda, Lithuania, and I work with teams wherever they are.
									</p>

									<p>
									The way I work is right there in this site’s headline: match the tool to the problem. Sometimes the right answer is a custom build, because the product needs to do things no existing platform was built for. Sometimes it’s WordPress, because the client’s team needs to publish and edit without calling a developer every time. I’ve shipped both, and I care more about what a thing needs to do than about what’s currently trending.
									</p>

									<p>
										The problem I’ve picked for myself right now is <Link href="/work/aukse" className="text-orange-500 hover:text-orange-600 hover:underline">Aukse</Link>, a household expense tracker I’m building end to end: React and TypeScript up front, Node, Express and PostgreSQL behind it, Docker and nginx on a Hetzner server underneath. My family uses it every day, which is the most honest feedback loop a developer can get.
									</p>
									<p>On a team, I’m usually the one asking questions early. I’ve learned that a quick conversation about the details, the edge cases, the “what should happen when”, saves everyone from discovering them halfway through the build. Not every question needs an answer on day one; projects just go smoother when the guesswork stays small.</p>

									<p>
										Away from the keyboard I lift weights, explore new places, and occasionally turn up at conferences to be around people who build things. That’s the MongoDB event in London in the photo.
									</p>

									<p>
										If you’re building something and need a developer who can take it from the database to the pixels, I’d like to hear from you.
									</p>
								</div>
							</div>
							<div className="lg:pl-20">
								<ul role="list">
								<li className="mt-4 flex">
										<a
											className="group flex text-sm font-medium text-zinc-800 transition hover:text-orange-500 dark:text-zinc-200 dark:hover:text-orange-500"
											href="https://www.linkedin.com/in/viktoras-domarkas/"
										>
											<Linkedin className="h-6 w-6 flex-none" />

											<span className="ml-4">
												LinkedIn
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
												GitHub
											</span>
										</a>
									</li>
									
									<li className="mt-4 flex">
										<a
											className="group flex text-sm font-medium text-zinc-800 transition hover:text-orange-500 dark:text-zinc-200 dark:hover:text-orange-500"
											href="https://www.youtube.com/@viktorasdomarkas9104"
										>
											<Youtube />
											<span className="ml-4">
												YouTube
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
												Instagram
											</span>
										</a>
									</li>
									<li className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex">
									
	<span className="group flex text-sm font-medium text-zinc-800 dark:text-zinc-200">
		<MapPin />
		<span className="ml-4">Klaipėda, Lithuania</span>
	</span>
</li>
									
<li className="mt-4 flex">
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
				</main>
			</div>
		</>
	);
};


export default About;
