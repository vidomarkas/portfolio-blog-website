import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { simpleBlogCard } from "@/lib/interface";

export const revalidate = 3600;

async function getData() {
	const query = `
    *[_type == 'post']| order(_createdAt desc){
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

	return (
		<div className="flex flex-col min-h-screen mt-32">
			<div className="flex">
				{posts?.map((post, id) => (
					<article role="listitem" key={id} className="">
						<div className="flex-shrink-0 z-10">
							<Link href={`blog/${post.slug}`} className="group">
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
											{post?.tags?.map((tag) => (
												<p key={tag?._id}>
													#{tag?.name}
												</p>
											))}
										</div>
										<div className="text-white/60 mb-3 line-clamp-2">
											{post.title}
										</div>
										<div className="text-white">
											Read more{" "}
											{/* <CircleChevronRight className="inline h-4 w-4 text-white" /> */}
										</div>
									</div>
								</div>
							</Link>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
