import { client, urlFor } from "@/lib/sanity";
import { fullWork } from "@/lib/interface";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { slugify } from "@/lib/utils";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600;

async function getData(slug: string) {
	const query = `
    *[_type == "work" && slug.current == '${slug}']{
  "slug": slug.current,
    title,
    body,
    featuredImage,

}[0]`;

	const data = await client.fetch(query);

	return data;
}

export default async function BlogArticle({
	params,
}: {
	params: { slug: string };
}) {
	const { featuredImage, title, body }: fullWork = await getData(params.slug);
	// console.log("data", data);

	return (
		<div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-6 pt-10 mt-20 relative">
			<aside className="lg:col-start-2 lg:col-span-3">
				<div>
					<div> Viktoras Domarkas</div>
					<div> web developer</div>
					<div>date published ...</div>
					<div></div>
					<Link
						href="/blog"
						className="px-4 py-2 border border-black text-black dark:border-white dark:text-white rounded-xl inline-flex gap-x-2 group h-fit"
						title="See more of Viktoras Domarkas work"
					>
						<LinkIcon />
						Live link
					</Link>
				</div>
			</aside>
			<div className="lg:col-span-7 pb-12">
				{title}
				<article className="prose max-w-prose dark:prose-invert mx-auto">
					<PortableText value={body} />
				</article>
			</div>
		</div>
	);
}
