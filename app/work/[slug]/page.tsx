import { client, urlFor } from "@/lib/sanity";
import { fullWork, PortableTextImage } from "@/lib/interface";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { Code, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

async function getData(slug: string) {
	const query = `
    *[_type == "work" && slug.current == '${slug}']{
  "slug": slug.current,
    title,
    industry,
    excerpt,
    sourceUrl,
    liveUrl,
    type,
    year,
    services[]-> {_id, slug, name},
    technologies[]-> {_id, slug, name},
    body,
    gallery,

}[0]`;

	const data = await client.fetch(query);

	// console.log("Fetched data:", data);

	return data;
}

const ptComponents = {
	types: {
		image: ({ value }: { value: PortableTextImage }) => {
			if (!value?.asset?._ref) {
				return null;
			}

			return (
				<Image
					alt={value.alt || " "}
					loading="lazy"
					height={value.height || 500}
					width={value.width || 500}
					src={urlFor(value).url()}
					style={{
						width: "100%",
						marginBottom: "24px",
					}}
				/>
			);
		},
		//   code: ({ value }: any) => {
		//     return <CodeBlock value={value} />
		//   },
	},
};

export default async function WorkDetailsPage({
	params,
}: {
	params: { slug: string };
}) {
	const data: fullWork | null = await getData(params.slug);

	if (!data) {
		return (
			<div className="mt-40">
				<header className="container pb-6">
					<h1 className="text-6xl font-semibold mb-4">
						Article Not Found
					</h1>
					<p>
						The article you&apos;re looking for doesn&apos;t exist.
					</p>
				</header>
			</div>
		);
	}

	const {
		title,
		industry,
		excerpt,
		sourceUrl,
		liveUrl,
		year,
		type,
		services,
		technologies,
		body,
		gallery,
	} = data;

	return (
		<div className=" mt-40">
			<header className="container pb-6">
				<div>
					<h1 className="text-4xl md:text-6xl font-semibold mb-4">
						{title}
					</h1>
					<div className="grid md:grid-cols-2 f-full">
						<div className="">
							<p className="max-w-2xl">{excerpt}</p>
						</div>
						<div className="flex gap-6 justify-end mt-4 md:mt-0">
							{liveUrl && (
								<Link
									target="_blank"
									href={liveUrl}
									className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl flex gap-x-2 group h-fit"
								>
									View Live
									<ArrowUpRight />
								</Link>
							)}
							{sourceUrl && (
								<Link
									href="/work"
									className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl flex gap-x-2 group h-fit"
									title="See more of Viktoras Domarkas work"
								>
									<Code />
									Source Code
								</Link>
							)}
						</div>
					</div>
				</div>
			</header>
			<section className="container my-6">
				<div className="flex justify-between items-start border rounded-xl px-4 py-1 dark:border-[#363636]">
					<div className="flex-1 ">
						<div className="font-semibold mb-2">Industry</div>
						<div className="text-xs">{industry}</div>
					</div>
					<div className="flex-1 text-center">
						<div className="font-semibold mb-2">Project Type</div>

						<div className="text-xs">{type}</div>
					</div>
					<div className="flex-1 text-right">
						<div className="font-semibold mb-2">Year</div>
						<div className="text-xs">{year}</div>
					</div>
				</div>
			</section>
			{/* featured images */}
			<section className="grid grid-cols-2 grid-rows-2 gap-4 p-4">
				{gallery &&
					gallery.map((image, i: number) => (
						<div
							key={i}
							className="w-full rounded-xl overflow-hidden"
						>
							<Image
								src={urlFor(image).url()}
								alt={image.alt || `Gallery Image ${i + 1}`}
								width={800}
								height={400}
								className="object-cover object-center w-full h-full aspect-video"
							/>
						</div>
					))}
			</section>

			<div className="container ">
				<div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-6 pt-10 mt-8 relative ">
					<div className="lg:col-span-9 pb-12 order-2 lg:order-1">
						<article
							className={`prose max-w-prose dark:prose-invert source-serif`}
						>
							<PortableText
								value={body}
								components={ptComponents}
							/>
						</article>
					</div>
					<aside className="lg:col-span-3 order-1 lg:order-2">
						<div className="lg:sticky top-20">
							<div>
								<h2 className="text-xl font-semibold mb-2">
									Services
								</h2>
								<ul className="flex gap-x-4 gap-y-2 flex-wrap">
									{services &&
										services.map((service, i) => (
											<li
												key={i}
												className="rounded-full border dark:border-[#363636] px-2.5 text-sm"
											>
												{service.name}
											</li>
										))}
								</ul>
							</div>
							<div className="mt-4 pb-12">
								<h2 className="text-xl font-semibold mb-2">
									Technologies
								</h2>
								<ul className="flex gap-x-4 gap-y-2 flex-wrap">
									{technologies &&
										technologies.map((tech, i) => (
											<li
												key={i}
												className="rounded-full border dark:border-[#363636] px-2.5 text-sm"
											>
												{tech.name}
											</li>
										))}
								</ul>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}
