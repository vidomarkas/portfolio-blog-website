import React from "react";
import { Youtube, Linkedin, Instagram, Github, Mail } from "lucide-react";

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
										I&apos;m a self-taught web developer
										from Lithuania, now based in the UK,
										where I&apos;ve been living for 15
										years. I’m passionate about creating
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
				</main>
			</div>
		</>
	);
};


export default About;
