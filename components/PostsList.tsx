import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import PostSkeleton from "./PostSkeleton";

async function getData(selectedTagSlugs: string[], searchQuery: string) {
	const tagFilter =
		selectedTagSlugs.length > 0
			? `&& count(tags[@->slug.current in [${selectedTagSlugs.map((slug: string) => `"${slug}"`).join(", ")}]]) > 0`
			: "";

	const searchFilter = searchQuery
		? `&& (title match "${searchQuery}*" || excerpt match "${searchQuery}*" || pt::text(body) match "${searchQuery}*")`
		: "";

	const query = `
        *[_type == 'post' ${tagFilter} ${searchFilter}] | order(_createdAt desc) {
          title,
          "slug": slug.current,
          featuredImage,
          excerpt,
          tags[]-> {_id, slug, name}
        }
      `;

	const data = await client.fetch(query);

	return data;
}

const PostsList = ({ selectedTagIDs, searchQuery }) => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch data when selectedTagIDs changes
		const fetchPosts = async () => {
			setLoading(true);
			const fetchedPosts = await getData(selectedTagIDs, searchQuery);
			setPosts(fetchedPosts);
			setLoading(false);
		};

		fetchPosts();
	}, [selectedTagIDs, searchQuery]);

	if (loading)
		return (
			<>
				{Array.from({ length: 10 }).map((_, index) => (
					<PostSkeleton key={index} />
				))}
			</>
		);

	if (posts.length === 0)
		return (
			<div className="h-full flex flex-col items-center">
				<p className="text-center">No results found.</p>
			</div>
		);

	return (
		<>
			{selectedTagIDs?.length > 0 && (
				<div className="mb-4 text-[#666] dark:text-gray-400">
					Showing only articles in{" "}
					<span className=" text-black dark:text-white">
						{selectedTagIDs.length === 1
							? selectedTagIDs[0]
							: selectedTagIDs.length === 2
								? selectedTagIDs.join(" and ")
								: selectedTagIDs.slice(0, -1).join(", ") +
									", and " +
									selectedTagIDs[selectedTagIDs.length - 1]}
					</span>{" "}
					{selectedTagIDs.length === 1 ? "category" : "categories"}.
				</div>
			)}

			{posts?.map((post, id) => (
				<article
					role="listitem"
					key={id}
					className="border-b first-of-type:pt-0 first-of-type:mt-0 last-of-type:border-b-0 pt-4 pb-8 mt-4 dark:border-[#363636]"
				>
					<Link href={`blog/${post.slug}`}>
						<div className="flex justify-between gap-x-4">
							<div>
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
									src={urlFor(post.featuredImage).url()}
									width={300}
									height={100}
									alt={post.title}
									className="absolute top-0 left-0 object-center"
								/>
							</div>
						</div>
					</Link>
				</article>
			))}
		</>
	);
};

export default PostsList;
