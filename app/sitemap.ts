import { client } from "@/lib/sanity";

const BASE_URL = "https://domarkas.co";

async function fetchBlogPosts() {
	const query = `
    *[_type == "post"]{
        "slug": slug.current,
        _updatedAt
    }`;

	return await client.fetch(query);
}

async function fetchWorkItems() {
	const query = `
    *[_type == "work" && hasCaseStudy == true]{
        "slug": slug.current,
        _updatedAt
    }`;

	return await client.fetch(query);
}

export default async function sitemap() {
	const [blogPosts, workItems] = await Promise.all([
		fetchBlogPosts(),
		fetchWorkItems(),
	]);

	const lastModified = new Date();

	return [
		{
			url: BASE_URL,
			lastModified,
		},
		{
			url: `${BASE_URL}/about`,
			lastModified,
		},
		{
			url: `${BASE_URL}/work`,
			lastModified,
		},
		{
			url: `${BASE_URL}/blog`,
			lastModified,
		},
		...workItems.map((work: { slug: string; _updatedAt: string }) => ({
			url: `${BASE_URL}/work/${work.slug}`,
			lastModified: new Date(work._updatedAt),
		})),
		...blogPosts.map((post: { slug: string; _updatedAt: string }) => ({
			url: `${BASE_URL}/blog/${post.slug}`,
			lastModified: new Date(post._updatedAt),
		})),
	];
}
