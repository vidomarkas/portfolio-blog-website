import { client } from "@/lib/sanity";
import { simpleBlogCard, Tags } from "@/lib/interface";

import SubscribeForm from "@/components/SubscribeForm";
import PostsContainer from "@/components/PostsContainer";

export const revalidate = 3600;

async function getData() {
	const query = `{
    "sanityTags": *[_type == "tag" && count(*[_type == "post" && references(^._id)]) > 0] {
        name,
        slug
    }}`;

	const data = client.fetch(query);

	return data;
}

export default async function Blog() {
	const { sanityTags } = await getData();

	const tags: Tags[] = sanityTags;

	return (
		<div className="flex flex-col min-h-screen mt-32">
			<div className="container text-center mt-24 mb-20">
				<h1 className="text-6xl font-bold mb-3">
					Inside the Industry: Stories and Insights
				</h1>
				<p className="text-[#666] font-medium mb-6">
					Subscribe to learn about new product features, the latest in
					technology, and updates.
				</p>
				<SubscribeForm />
			</div>
			<PostsContainer tags={tags} />
		</div>
	);
}
