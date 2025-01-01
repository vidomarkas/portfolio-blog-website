import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import PostSkeleton from "./PostSkeleton";
import { Post } from "@/lib/interface";

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

interface PostsListProps {
	selectedTagIDs: string[];
	searchQuery: string;
}

const PostsList = ({ selectedTagIDs, searchQuery }: PostsListProps) => {
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
				<div className="mb-4 text-zinc-600 dark:text-zinc-400">
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

			{posts?.map((post: Post, id: number) => (
				<article
					role="listitem"
					key={id}
					className="border-b first-of-type:pt-0 first-of-type:mt-0 last-of-type:border-b-0 pt-4 pb-8 mt-4 dark:border-[#363636]"
				>
					<Link href={`blog/${post.slug}`}>
						<div className="flex flex-col md:flex-row md:justify-between md:gap-x-4">
							<div className="order-2 md:order-1">
								<h2 className="text-2xl font-bold mb-3">
									{post.title}
								</h2>
								<p className="text-zinc-600 dark:text-zinc-400 mb-4">
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
							<div className="relative h-[200px] w-full md:w-[300px] overflow-hidden shrink-0 grow-0 rounded-xl order-1 md:order-2 mb-4 md:mb-0">
								<Image
									src={urlFor(post.featuredImage).url()}
									width={300}
									height={100}
									alt={post.title}
									className="absolute top-0 left-0 object-center w-full"
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
