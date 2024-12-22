import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { client, urlFor } from "@/lib/sanity";

export const revalidate = 100;

async function getData() {
	const query = `{
    "projects": *[_type == "work" && (!defined(featured) || featured == false)]| order(year desc) {
        title,
        slug,
        industry, year,
        services[]-> {_id, slug, name},
        technologies[]-> {_id, slug, name}
    },
    "featuredProjects": *[_type == "work" && featured == true]| order(year desc) {
        title,
        slug,
          featuredImage,
        excerpt,
        industry, year,
         services[]-> {_id, slug, name},
         technologies[]-> {_id, slug, name}
    }
         }`;

	const data = client.fetch(query);

	return data;
}

const page = async () => {
	const { projects, featuredProjects } = await getData();

	// console.log("projects", projects);
	// console.log("featuredProjects", featuredProjects);
	// const projectsFake = [
	// 	{ title: "Work1", tags: ["DEV", "UX", "UI", "Branding", "Motion"] },
	// 	{ title: "Work2", tags: ["DEV", "UX", "UI", "Branding", "Motion"] },
	// 	{ title: "Work3", tags: ["DEV", "UX", "UI", "Branding", "Motion"] },
	// ];
	return (
		<main className="mt-32">
			<section className="container py-20">
				<div className="grid lg:grid-cols-2 gap-x-6 gap-y-8 lg:gap-y-0 ">
					<div className="col-span-1 ">
						<h1 className="text-7xl font-bold whitespace-nowrap">
							Featured Work
						</h1>
					</div>
					<div className="col-span-1  flex lg:justify-end">
						<p className="text-justify max-w-xl lg:max-w-md ttext-zinc-600 dark:text-zinc-400">
							I have had the privilege of working with some of the
							most well-known companies in the world. Here are
							some of the works I’m most proud of.
						</p>
					</div>
				</div>
			</section>
			<section>
				<div className="container">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{featuredProjects.map((project, index) => {
							return (
								<Link
									key={index}
									href={`/work/${project.slug.current}`}
									className="project"
									title={`See ${project.title} project in detail`}
								>
									<div className="aspect-video rounded-3xl overflow-hidden project-image">
										<Image
											className="object-cover w-full "
											src={urlFor(
												project.featuredImage
											).url()}
											width={600}
											height={600}
											alt={project.title}
										/>
									</div>

									<div className="">
										<div className="pt-8">
											<h2 className="text-2xl font-semibold mb-4">
												{project.title}
											</h2>
											{/* <div>{project.excerpt}</div> */}
											<ul className="flex gap-x-4 gap-y-2 flex-wrap">
												{project.services &&
													project.services.map(
														(service, i) => (
															<li
																key={i}
																className="rounded-full border border-black dark:border-white px-2.5 text-sm"
															>
																{service.name}
															</li>
														)
													)}
											</ul>
											{/* <ul className="flex gap-x-4">
												{project.technologies &&
													project.technologies.map(
														(tech, i) => (
															<li
																key={i}
																className="rounded-full border border-black dark:border-white px-2.5 text-sm"
															>
																{tech.name}
															</li>
														)
													)}
											</ul> */}
										</div>
									</div>
								</Link>
							);
						})}
					</div>
					{/* <div className="flex justify-center my-20">
						<Link
							href="/work"
							className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl flex gap-x-2 group h-fit"
							title="Load more Viktoras' work"
						>
							Load More
						</Link>
					</div> */}
				</div>
			</section>
			<section className="py-20 text-center bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100">
				logo carousel
			</section>

			<section className="py-20 ">
				<div className="container">
					<h2 id="other_work" className="text-3xl font-bold mb-10">
						Other notable projects
					</h2>
					<div className="grid grid-cols-12 w-full text-start font-medium">
						<div className="col-span-3">Client</div>
						<div className="col-span-3">Industry</div>
						<div className="col-span-5">Services</div>
						<div className="col-span-1">Year</div>
					</div>
					<Accordion type="single" collapsible>
						{projects.map((project, index) => (
							<AccordionItem
								key={index}
								value={`item-${index + 1}`}
							>
								<AccordionTrigger>
									<div className="grid grid-cols-12 w-full text-start">
										<div className="col-span-3">
											{project.title}
										</div>
										<div className="col-span-3">
											{project.industry}
										</div>
										<div className="col-span-5">
											{project.services &&
												project.services[0].name}
										</div>
										<div className="col-span-1">
											{project.year}
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<div>
										<h2 className="text-xl">
											All Services
										</h2>
										{project.services &&
											project.services.map(
												(service, index) => (
													<div key={index}>
														{service.name}
													</div>
												)
											)}
									</div>
									{project.technologies &&
										project.technologies.length > 0 && (
											<div>
												<h2 className="text-xl">
													Technologies
												</h2>
												{project.technologies &&
													project.technologies.map(
														(service, index) => (
															<div key={index}>
																{service.name}
															</div>
														)
													)}
											</div>
										)}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>
		</main>
	);
};

export default page;
