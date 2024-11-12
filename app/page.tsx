import Image from "next/image";
import Link from "next/link";
import { CircleChevronRight } from "lucide-react";
import { simpleBlogCard } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";

import CopyEmail from "@/components/CopyEmail";
import githubIcon from "../public/assets/icons/github.svg";
import whatsapp from "../public/assets/icons/whatsapp.svg";
import instaIcon from "../public/assets/icons/instagram.svg";
import linkedIcon from "../public/assets/icons/linkedin.svg";

export const revalidate = 3600;

async function getData() {
	const query = `
    *[_type == 'post']| order(_createdAt desc)[0...5]{
        title,
        "slug": slug.current,
        featuredImage,
        tags[]-> {_id, slug, name}
    }`;

	const data = client.fetch(query);

	return data;
}

export default async function Home() {
	const posts: simpleBlogCard[] = await getData();

	// console.log("mydata", data);

	return (
		<div className="flex flex-col min-h-screen mt-32">
			<main className="flex-grow ">
				<header className="py-20">
					<div className="container ">
						<h1 className="text-7xl font-semibold	mb-8">
							Building the Web. Performance. <br />
							Custom Builds. UX. & More
						</h1>
					</div>
				</header>
				<section>
					<div className="container grid grid-cols-1 md:grid-cols-2 grid-rows-6 gap-10 lg:gap-32">
						<Link href="/work/trulawn" className="work-item">
							<div className="work-item__image">
								<Image
									src="/assets/img/days.webp"
									width={540}
									height={640}
									alt="days"
								/>
							</div>
							<div className="work-item__info">
								<div className="work-item__title">Trulawn</div>
								<div className="work-item__description">
									Full stack application
								</div>
							</div>
						</Link>
						<Link href="/" className="work-item">
							<div className="work-item__image">
								<Image
									src="/assets/img/tripscout.webp"
									width={540}
									height={640}
									alt="days"
								/>
							</div>
							<div className="work-item__info">
								<div className="work-item__title">
									Budget Manager
								</div>
								<div className="work-item__description">
									React Native Application
								</div>
							</div>
						</Link>
						<Link href="/" className="work-item">
							<div className="work-item__image">
								<Image
									src="/assets/img/athotel.webp"
									width={540}
									height={640}
									alt="days"
								/>
							</div>

							<div className="work-item__info">
								<div className="work-item__title">
									Family Hub
								</div>
								<div className="work-item__description">
									full stack application
								</div>
							</div>
						</Link>
						<Link href="/" className="work-item">
							<div className="work-item__image">
								<Image
									src="/assets/img/invision.webp"
									width={540}
									height={640}
									alt="days"
								/>
							</div>
							<div className="work-item__info">
								<div className="work-item__title">
									https://www.s1jobs.com/resources/remote-working-guide/
								</div>
								<div className="work-item__description">
									To be announced
								</div>
							</div>
						</Link>
						<Link href="/work#other_work" className="work-item">
							<div className="work-item__image">
								<Image
									src="/assets/img/archive.webp"
									width={540}
									height={640}
									alt="days"
								/>
							</div>
							<div className="work-item__info">
								<div className="work-item__title">
									Other work
								</div>
								<div className="work-item__description">
									Get to see some my past work
								</div>
							</div>
						</Link>
					</div>
				</section>
				<section className="container py-20">
					<div className="text-container">
						<p className="text-[22px] mb-4">
							I'm all about creating high-performing, thoughtfully
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
							className="font-semibold text-[22px]"
						>
							More about me
						</Link>
					</div>
				</section>
				{posts && posts?.length > 0 && (
					<section className="py-20">
						<div className="container flex justify-between">
							<h2 className="text-2xl">
								The latest.{" "}
								<span className="text-gray-500">
									Take a look at what’s new in my blog.
								</span>
							</h2>
							<Link href="/blog" className="text-2xl underline">
								All Articles
							</Link>
						</div>

						<div
							className="scroll-container flex w-full gap-x-10 overflow-x-scroll snap-x scroll-smooth snap-mandatory pt-10"
							role="list"
						>
							{posts?.map((post, id) => (
								<article
									role="listitem"
									key={id}
									className="snap-start "
								>
									<div className="card-view flex-shrink-0 z-10">
										<Link
											href={`blog/${post.slug}`}
											className="group"
										>
											<div className="border border-black/-5 dark:border-white/5 rounded-[22px] w-[400px] h-[500px] p-8 relative overflow-hidden flex items-end bg-[#121212]">
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
													<div className="mb-2 font-medium text-white">
														{post?.tags?.map(
															(tag) => (
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
													<div className="text-white/60 mb-3 line-clamp-2">
														{post.title}
													</div>
													<div className="text-white">
														Read more{" "}
														<CircleChevronRight className="inline h-4 w-4 text-white" />
													</div>
												</div>
											</div>
										</Link>
									</div>
								</article>
							))}
						</div>
					</section>
				)}
				<section className="py-20">
					<div className="text-container">
						<h2 className="text-2xl">
							Get in touch (click to copy)
						</h2>

						<CopyEmail email="hey@domarkas.co" />
						<ul className="flex justify-between mt-10 align-middle social-icons-list">
							<li>
								<a
									href="https://wa.link/l3y41j"
									target="_blank"
									rel="noopener noreferrer"
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
