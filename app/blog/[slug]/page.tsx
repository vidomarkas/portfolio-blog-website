/* eslint-disable @typescript-eslint/no-explicit-any */
import { client, urlFor } from "@/lib/sanity";
import { fullBlog } from "@/lib/interface";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { slugify } from "@/lib/utils";
import { TextParallaxContent } from "@/components/BlogHeader";
import { Toc } from "@/components/Toc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;

// export const metadata: Metadata = {
//     title:
// }

async function getData(slug: string) {
	const query = `
    *[_type == "post" && slug.current == '${slug}']{
  "slug": slug.current,
    title,
    excerpt,
    body,
    featuredImage,
    publishedAt,
    "headings": body[style in ["h2", "h3", "h4", "h5", "h6"]],
    "timeToRead": round(length(pt::text(body)) / 5 / 180 )
}[0]`;

	const data = await client.fetch(query);

	return data;
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const metadata = await getData(params.slug);
	// const previousImages = (await parent).openGraph?.images || [];

	if (!metadata) {
		return {
			title: "Article Not Found",
			description: "The article you are looking for doesn't exist.",
		};
	}

	// console.log("excerpt", metadata.excerpt);
	return {
		title: metadata.title,
		description: metadata.excerpt,
		openGraph: {
			images: [{ url: urlFor(metadata.featuredImage).url() }],
		},
	};
}

export default async function BlogArticle({
	params,
}: {
	params: { slug: string };
}) {
	const data: fullBlog | null = await getData(params.slug);

	if (!data) {
		notFound();
	}

	const {
		featuredImage,
		title,
		body,
		headings = [],
		publishedAt,
		timeToRead,
	} = data;

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
						{headings?.length > 0 && <Toc headings={headings} />}
					</aside>
					<div className="lg:col-span-7 pb-12">
						<article
							id="blogPostBody"
							className="prose max-w-prose dark:prose-invert mx-auto mb-40 source-serif"
						>
							<PortableText
								value={body}
								components={myPortableTextComponents}
							/>
						</article>
						<div className="flex justify-center">
							<Link
								href="/blog"
								className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl flex gap-x-2 group h-fit hover:brightness-75	transition-all duration-100"
								title="Back to blog"
							>
								<ArrowLeft />
								Back to Blog
							</Link>
						</div>
					</div>
				</div>
			</TextParallaxContent>
			{/* <section className="container">
				<div>
					actions
					<Link href="/blog">Back to the Blog</Link>
				</div>
			</section> */}
			{/* <section className="bg-[#f9f9f9] p-40">more to read</section> */}
		</>
	);
}

const myPortableTextComponents = {
	types: {
		image: ({ value }: any) => {
			if (!value.asset) {
				return null; // Handle cases where the image data is missing
			}

			return (
				<Image
					src={urlFor(value).url()}
					alt={value.alt || "Post image"}
					width={700}
					height={700}
				/>
			);
		},
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
