import Image from "next/image";
import Link from "next/link";
import { CircleChevronRight, Briefcase } from "lucide-react";
// import { simpleBlogCard } from "@/lib/interface";
import { FeaturedProject, Post, Tag } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";

import CopyEmail from "@/components/CopyEmail";
import githubIcon from "../public/assets/icons/github.svg";
import whatsapp from "../public/assets/icons/whatsapp.svg";
import instaIcon from "../public/assets/icons/instagram.svg";
import linkedIcon from "../public/assets/icons/linkedin.svg";

// export const revalidate = 3600;
export const revalidate = 100;

async function getData() {
	const query = `{
    "posts": *[_type == 'post']| order(_createdAt desc)[0...5]{
        title,
        "slug": slug.current,
        featuredImage,
        tags[]-> {_id, slug, name}
    },
     "featuredProjects": *[_type == "work" && featured == true]| order(year desc) {
            title,
            slug,
            featuredImage,
            excerpt,
            industry, year,
            services[]-> {_id, slug, name},
            technologies[]-> {_id, slug, name}
    }}`;

	const data = client.fetch(query);

	return data;
}

export default async function Home() {
	const { posts, featuredProjects } = await getData();

	return (
		<div className="flex flex-col min-h-screen mt-32">
			<main className="flex-grow ">
				<header className="py-20">
					<div className="container ">
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-8">
							Hi, I’m Vik, <br /> Web Developer <br />& Digital
							Creator
						</h1>
					</div>
				</header>
				<section className="container pt-6 pb-10 lg:py-20">
					<div className="text-container">
						<p className="text-[22px] mb-4 text-zinc-600 dark:text-zinc-400">
							I’m all about creating high-performing, thoughtfully
							crafted web experiences that make a difference. To
							me, quality isn’t just about speed—it’s about
							building something that’s tailored and built to
							last. From bespoke builds to seamless integrations,
							I bring together the technical and creative sides of
							web development to build solutions that genuinely
							work. This is my approach, my work, and a glimpse
							into what drives me forward.
						</p>
						<Link
							href="/about"
							className="font-semibold text-[22px] underline-offset-8 hover:underline"
							aria-label="Read more about Viktoras Domarkas"
						>
							More about me
						</Link>
					</div>
				</section>
				<section>
					<div
						className={`container grid grid-cols-1 md:grid-cols-2 grid-rows-${featuredProjects.length + 1} gap-10 lg:gap-32 py-20`}
					>
						<div className="md:flex items-center justify-center">
							<h2 className="text-4xl sm:text-4xl lg:text-6xl font-bold">
								Some of my work
							</h2>
						</div>
						{featuredProjects.map(
							(project: FeaturedProject, index: number) => {
								return (
									<Link
										key={index}
										href={`/work/${project.slug.current}`}
										className="work-item"
										title={`See ${project.title} project in detail`}
									>
										<div className="work-item__image">
											<Image
												src={urlFor(
													project.featuredImage
												).url()}
												width={800}
												height={800}
												alt={project.title}
											/>
										</div>
										<div className="work-item__info">
											<h2 className="work-item__title mb-4">
												{project.title}
											</h2>

											<ul className="flex gap-x-4 gap-y-2 flex-wrap">
												{project.services &&
													project.services.map(
														(
															service,
															i: number
														) => (
															<li
																key={i}
																className="rounded-full border border-gray-300 dark:border-white px-2.5 text-sm"
															>
																{service.name}
															</li>
														)
													)}
											</ul>
										</div>
									</Link>
								);
							}
						)}

						<div className="flex justify-center">
							<Link
								href="/work"
								className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl flex gap-x-2 group h-fit"
								title="See more of Viktoras Domarkas work"
							>
								<Briefcase />
								See more of my work
							</Link>
						</div>
					</div>
				</section>

				{posts && posts?.length > 0 && (
					<section className="py-20 overflow-x-hidden">
						<div className="container flex justify-between">
							<h2 className="text-2xl">
								The latest.{" "}
								<span className="text-zinc-600 dark:text-zinc-400">
									Take a look at what’s new in my blog.
								</span>
							</h2>
							<Link
								href="/blog"
								className="text-xl hover:underline underline-offset-8 hidden lg:block"
								aria-label="Visit all posts page"
							>
								See all posts
							</Link>
						</div>

						<ul className="scroll-container flex w-full gap-x-2 lg:gap-x-10 overflow-x-scroll snap-x scroll-smooth snap-mandatory pt-10">
							{posts?.map((post: Post, id: number) => (
								<li key={id} className="snap-start ">
									<article className="card-view flex-shrink-0 z-10">
										<Link
											href={`blog/${post.slug}`}
											className="group"
											aria-label={`Read the blog post ${post.title}`}
										>
											<div className=" border border-black/-5 dark:border-white/5 rounded-[22px] aspect-[3/4] w-[75vw] lg:w-[400px] lg:h-[500px] p-8 relative overflow-hidden flex items-end bg-[#121212]">
												<div className="card-overlay">
													<Image
														src={urlFor(
															post.featuredImage
														).url()}
														width={400}
														height={500}
														alt={post.title}
														className="w-full h-full object-cover object-center group-hover:scale-105 transition "
													/>
												</div>
												<div className="card-description">
													<div className="mb-2 font-medium text-white/60">
														{post?.tags?.map(
															(tag: Tag) => (
																<p
																	key={
																		tag?._id
																	}
																>
																	#{tag?.name}
																</p>
															)
														)}
													</div>
													<h3 className="text-white mb-3 line-clamp-2">
														{post.title}
													</h3>
													<div className="text-white/60">
														Read more{" "}
														<CircleChevronRight className="inline h-4 w-4 text-white/60" />
													</div>
												</div>
											</div>
										</Link>
									</article>
								</li>
							))}
						</ul>
						<div className="container">
							<Link
								href="/blog"
								className="mt-6 text-xl hover:underline underline-offset-8 lg:hidden block"
								aria-label="Visit all blog posts page"
							>
								See all posts
							</Link>
						</div>
					</section>
				)}
				<section className="container py-20 my-20">
					<div className="text-container">
						<h2 className="text-2xl">
							Get in touch <br className="inline lg:hidden" />{" "}
							(click the email to copy)
						</h2>

						<CopyEmail email="hey@domarkas.co" />
						<ul className="flex justify-between mt-10 align-middle social-icons-list">
							<li>
								<a
									href="https://wa.link/l3y41j"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Contact me via WhatsApp"
								>
									<Image
										src={whatsapp}
										alt="X"
										height={30}
										width={30}
										className="dark:invert"
									/>
								</a>
							</li>
							<li>
								<a
									href="https://github.com/vidomarkas"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Visit my GitHub profile"
								>
									<Image
										src={githubIcon}
										alt="Github"
										height={30}
										width={30}
										className="dark:invert"
									/>
								</a>
							</li>
							<li>
								<a
									href="https://www.instagram.com/viktorascodes/"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Visit my instagram profile"
								>
									<Image
										src={instaIcon}
										alt="Instagram"
										height={30}
										width={30}
										className="dark:invert"
									/>
								</a>
							</li>
							<li>
								<a
									href="https://www.linkedin.com/in/viktoras-domarkas"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Visit my LinkedIn profile"
								>
									<Image
										src={linkedIcon}
										alt="Linkedin"
										height={30}
										width={30}
										className="dark:invert"
									/>
								</a>
							</li>
						</ul>
					</div>
				</section>
			</main>
		</div>
	);
}
