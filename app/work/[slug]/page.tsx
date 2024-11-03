import { client, urlFor } from "@/lib/sanity";
import { fullWork } from "@/lib/interface";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { slugify } from "@/lib/utils";
import { TextParallaxContent } from "@/components/BlogHeader";
import Toc from "@/components/Toc";

export const revalidate = 3600;

async function getData(slug: string) {
	const query = `
    *[_type == "work" && slug.current == '${slug}']{
  "slug": slug.current,
    title,
    body,
    featuredImage,
    "headings": body[style in ["h2", "h3", "h4", "h5", "h6"]],

}[0]`;

	const data = await client.fetch(query);

	return data;
}

export default async function BlogArticle({
	params,
}: {
	params: { slug: string };
}) {
	const { featuredImage, title, body, headings }: fullWork = await getData(
		params.slug
	);
	// console.log("data", data);

	return (
		<TextParallaxContent
			imgUrl={urlFor(featuredImage).url()}
			heading={title}
		>
			<div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-6 pt-10 relative">
				<aside className="lg:col-start-2 lg:col-span-3">
					<div>
						<div> Viktoras Domarkas</div>
						<div> web developer</div>
						<div>date published ...</div>
					</div>
					<Toc headings={headings} />
				</aside>
				<div className="lg:col-span-7 pb-12">
					<article className="prose max-w-prose dark:prose-invert mx-auto">
						<PortableText
							value={body}
							components={myPortableTextComponents}
						/>
					</article>
				</div>
			</div>
		</TextParallaxContent>
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
