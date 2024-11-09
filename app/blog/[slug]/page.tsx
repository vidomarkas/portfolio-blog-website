import { client, urlFor } from "@/lib/sanity";
import { fullBlog } from "@/lib/interface";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { slugify } from "@/lib/utils";
import { TextParallaxContent } from "@/components/BlogHeader";
import { Toc } from "@/components/Toc";


export const revalidate = 3600;

async function getData(slug: string) {
	const query = `
    *[_type == "post" && slug.current == '${slug}']{
  "slug": slug.current,
    title,
    body,
    featuredImage,
    publishedAt,
    "headings": body[style in ["h2", "h3", "h4", "h5", "h6"]],
    "timeToRead": round(length(pt::text(body)) / 5 / 180 )
}[0]`;

	const data = await client.fetch(query);

	return data;
}

export default async function BlogArticle({
	params,
}: {
	params: { slug: string };
}) {
	const {
		featuredImage,
		title,
		body,
		headings = [],
		publishedAt,
		timeToRead,
	}: fullBlog = await getData(params.slug);

	const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<>
			<TextParallaxContent
				imgUrl={urlFor(featuredImage).url()}
				heading={title}
				date={formattedDate}
				timeToRead={timeToRead}
			>
				<div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-6 pt-10 relative">
					<aside className="lg:col-start-2 lg:col-span-3">
						{headings?.length > 0 && (
							<Toc headings={headings} objective={null} />
						)}
					</aside>
					<div className="lg:col-span-7 pb-12">
						<article
							id="blogPostBody"
							className="prose max-w-prose dark:prose-invert mx-auto"
						>
							<PortableText
								value={body}
								components={myPortableTextComponents}
							/>
						</article>
					</div>
				</div>
			</TextParallaxContent>
			<section className="bg-red-500 p-20">more to read</section>
		</>
	);
}

const myPortableTextComponents = {
	types: {
		image: ({ value }: any) => (
			<Image
				src={urlFor(value).url()}
				alt="Post"
				width={700}
				height={700}
			/>
		),
	},
	block: {
		h2: ({ value }: any) => (
			<h2
				id={slugify(
					value.children.map((child: any) => child.text).join(" ")
				)}
				className="text-3xl font-bold mb-3"
			>
				{value.children.map((child: any) => child.text).join(" ")}
			</h2>
		),
		h3: ({ value }: any) => (
			<h3
				id={slugify(
					value.children.map((child: any) => child.text).join(" ")
				)}
				className="text-2xl font-bold mb-3"
			>
				{value.children.map((child: any) => child.text).join(" ")}
			</h3>
		),
		h4: ({ value }: any) => (
			<h4
				id={slugify(
					value.children.map((child: any) => child.text).join(" ")
				)}
				className="text-2xl font-bold mb-3"
			>
				{value.children.map((child: any) => child.text).join(" ")}
			</h4>
		),
		h5: ({ value }: any) => (
			<h5
				id={slugify(
					value.children.map((child: any) => child.text).join(" ")
				)}
				className="text-2xl font-bold mb-3"
			>
				{value.children.map((child: any) => child.text).join(" ")}
			</h5>
		),
		h6: ({ value }: any) => (
			<h6
				id={slugify(
					value.children.map((child: any) => child.text).join(" ")
				)}
				className="text-xl font-bold mb-3"
			>
				{value.children.map((child: any) => child.text).join(" ")}
			</h6>
		),
	},
};
