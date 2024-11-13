import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { simpleBlogCard } from "@/lib/interface";
import { Bell } from "lucide-react";

export const revalidate = 3600;

async function getData() {
	const query = `
    *[_type == 'post']| order(_createdAt desc){
        title,
        "slug": slug.current,
        featuredImage,
        excerpt,
        tags[]-> {_id, slug, name}
    }`;

	const data = client.fetch(query);

	return data;
}

export default async function Blog() {
	const posts: simpleBlogCard[] = await getData();

	return (
		<div className="flex flex-col min-h-screen mt-32">
			<div className="container text-center mt-24 mb-20">
				<h1 className="text-6xl font-bold mb-3">
					Inside the Industry: Stories and insights
				</h1>
				<p className="text-[#666] font-medium mb-6">
					Subscribe to learn about new product features, the latest in
					technology, and updates.
				</p>
				<form
					action=""
					className="inline-flex justify-center border p-1 dark:border-gray-600 mx-auto rounded-2xl gap-x-2"
				>
					<input
						type="email"
						name="email"
						id="email"
						className="border dark:bg-[#18181a] dark:border-gray-600 rounded-xl px-4"
						required
						placeholder="email@example.com"
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl flex gap-x-2"
					>
						<Bell />
						Subscribe
					</button>
				</form>
			</div>
			<div className="container grid grid-cols-12 gap-6">
				<div className="col-span-8">
					{posts?.map((post, id) => (
						<article
							role="listitem"
							key={id}
							className="border-b first-of-type:pt-0 first-of-type:mt-0 last-of-type:border-b-0 pt-4 pb-8 mt-4 dark:border-[#363636]"
						>
							<div className="">
								<Link href={`blog/${post.slug}`} className="">
									<div className="flex justify-between gap-x-4">
										<div className="">
											<h2 className="text-2xl font-bold mb-3">
												{post.title}
											</h2>
											<p className="text-[#666] dark:text-gray-400 mb-4">
												{post.excerpt}
											</p>
											<div className="flex mb-2 font-medium gap-4">
												{post?.tags?.map((tag) => (
													<span
														className="px-4 py-1 bg-gray-100 dark:bg-[#363636] rounded-full"
														key={tag?._id}
													>
														{tag?.name}
													</span>
												))}
											</div>
										</div>
										<div className="relative h-[200px] w-[300px] overflow-hidden shrink-0 grow-0 rounded-xl">
											<Image
												src={urlFor(
													post.featuredImage
												).url()}
												width={300}
												height={100}
												alt={post.title}
												className="absolute top-0 left-0 object-center"
											/>
										</div>
									</div>
								</Link>
							</div>
						</article>
					))}
				</div>
				<aside className=" col-span-4">
					<div className="sticky top-32">
						<div>
							<h2>Recommended topics</h2>
						</div>
						<div>search</div>
						{/* <Image className="w-full h-auto" src={blogImg} alt="the blog" /> */}
					</div>
				</aside>
			</div>
		</div>
	);
}
