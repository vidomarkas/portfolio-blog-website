import { client, urlFor } from "@/lib/sanity";
import { fullBlog } from "@/lib/interface";
import Image from "next/image";
import { PortableText } from "next-sanity";
import ProgressBar from "@/components/ProgressBar";
import { TextParallaxContent } from "@/components/BlogHeader";
import Toc from "@/components/Toc";

async function getData(slug: string) {
	const query = `
    *[_type == "blog" && slug.current == '${slug}']{
  "currentSlug": slug.current,
    title,
    content,
    titleImage,
    "headings": content[style in ["h2", "h3", "h4", "h5", "h6"]],

}[0]`;

	const data = await client.fetch(query);

	return data;
}

export default async function BlogArticle({
	params,
}: {
	params: { slug: string };
}) {
	const { titleImage, title, content, headings }: fullBlog = await getData(
		params.slug
	);
	// console.log("data", data);

	return (
		<>
			<ProgressBar />

			<article className="">
				<TextParallaxContent
					imgUrl={urlFor(titleImage).url()}
					heading={title}
				>
					<div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-6 pt-10 relative">
						<div className="lg:col-span-3 order-2 ">
							<Toc headings={headings} />
						</div>
						<div className="lg:col-span-6 lg:max-w-[46rem] pb-12 xl:pl-11 xl:pr-16 order-3 ">
							<div className="prose dark:prose-invert mx-auto">
								<PortableText value={content} />
							</div>
						</div>
						<div className="lg:col-span-3 order-4 ">
							<Toc headings={headings} />
						</div>
					</div>
				</TextParallaxContent>
			</article>
		</>
	);
}
