import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const page = () => {
	const projects = [
		{ title: "Work1", tags: ["DEV", "UX", "UI", "Branding", "Motion"] },
		{ title: "Work2", tags: ["DEV", "UX", "UI", "Branding", "Motion"] },
		{ title: "Work3", tags: ["DEV", "UX", "UI", "Branding", "Motion"] },
		{ title: "Work4", tags: ["DEV", "UX", "UI", "Branding", "Motion"] },
	];
	return (
		<main className="mt-32">
			<section className="container py-20">
				<div className="grid lg:grid-cols-2 gap-x-6 gap-y-8 lg:gap-y-0 ">
					<div className="col-span-1 ">
						<h1 className="text-7xl font-bold whitespace-nowrap">
							My Work
						</h1>
					</div>
					<div className="col-span-1  flex lg:justify-end">
						<p className="text-justify max-w-xl lg:max-w-md text-[#666] dark:text-gray-400">
							I have had the privilege of working with some of the
							most well-known companies in the world. Here are
							some of the works I'm most proud of.
						</p>
					</div>
				</div>
			</section>
			<section>
				<div className="container">
					<div className="grid grid-cols-2 gap-4">
						{projects.map((project, index) => {
							return (
								<div
									key={index}
									className="bg-[#f9fafb] dark:bg-[#202021] rounded-3xl p-8 aspect-square flex flex-col justify-between"
								>
									<div>
										<Image
											src="/assets/img/days.webp"
											width={200}
											height={200}
											alt="days"
										/>
									</div>
									<div className="">
										<h2 className="text-xl font-semibold mb-4">
											{project.title}
										</h2>
										<ul className="flex gap-x-4">
											{project.tags.map((tag, i) => (
												<li
													key={i}
													className="rounded-full border border-black dark:border-white px-2.5 text-sm"
												>
													{tag}
												</li>
											))}
										</ul>
									</div>
								</div>
							);
						})}
					</div>
					<div className="flex justify-center my-20">
						<Link
							href="/work"
							className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl flex gap-x-2 group h-fit"
							title="Load more Viktoras' work"
						>
							Load More
						</Link>
					</div>
				</div>
			</section>

			<section className="py-20 ">
				<div className="container">
					<h2 id="other_work" className="text-3xl font-bold mb-10">
						Other notable projects
					</h2>
					{/* <ul>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
					</ul> */}
					<div className="grid grid-cols-12 w-full text-start font-medium">
						<div className="col-span-4">Client</div>
						<div className="col-span-2">Industry</div>
						<div className="col-span-5">Services</div>
						<div className="col-span-1">Year</div>
					</div>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1">
							<AccordionTrigger>
								<div className="grid grid-cols-12 w-full text-start">
									<div className="col-span-4">
										Merkur Casinos
									</div>
									<div className="col-span-2">Gambling</div>
									<div className="col-span-5">
										Front & Backend Development
									</div>
									<div className="col-span-1">2025</div>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>
								<div className="grid grid-cols-12 w-full text-start">
									<div className="col-span-4">Merkur</div>
									<div className="col-span-2">Gambling</div>
									<div className="col-span-5">
										Front & Backend Development
									</div>
									<div className="col-span-1">2025</div>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger>
								<div className="grid grid-cols-12 w-full text-start">
									<div className="col-span-4">
										Ernest Gordon
									</div>
									<div className="col-span-2">Gambling</div>
									<div className="col-span-5">
										Front & Backend Development
									</div>
									<div className="col-span-1">2025</div>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-4">
							<AccordionTrigger>
								<div className="grid grid-cols-12 w-full text-start">
									<div className="col-span-4">Merkur</div>
									<div className="col-span-2">Gambling</div>
									<div className="col-span-5">
										Front & Backend Development
									</div>
									<div className="col-span-1">2025</div>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-5">
							<AccordionTrigger>
								<div className="grid grid-cols-12 w-full text-start">
									<div className="col-span-4">Merkur</div>
									<div className="col-span-2">Gambling</div>
									<div className="col-span-5">
										Front & Backend Development
									</div>
									<div className="col-span-1">2025</div>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</section>
		</main>
	);
};

export default page;
