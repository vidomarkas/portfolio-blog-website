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
    *[_type == "work" && featured == true]{
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

	return [
		...blogPosts.map((post: { slug: string; _updatedAt: string }) => ({
			url: `${BASE_URL}/blog/${post.slug}`,
			lastModified: new Date(post._updatedAt),
		})),
		...workItems.map((work: { slug: string; _updatedAt: string }) => ({
			url: `${BASE_URL}/work/${work.slug}`,
			lastModified: new Date(work._updatedAt),
		})),
		{
			url: BASE_URL,
		},
		{
			url: `${BASE_URL}/about`,
		},
		{
			url: `${BASE_URL}/work`,
		},
		{
			url: `${BASE_URL}/blog`,
		},
		{
			url: `${BASE_URL}/cookies`,
		},
		{
			url: `${BASE_URL}/privacy-policy`,
		},
	];
}
