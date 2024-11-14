import { client } from "@/lib/sanity";
import { Tags } from "@/lib/interface";

async function getData() {
	const query = `
    *[_type == "tag"] {
        name,
        slug
    }`;

	const data = client.fetch(query);

	return data;
}

export default async function TagList() {
	const tags: Tags[] = await getData();
	return (
		<div className="flex my-2 font-medium gap-4 flex-wrap">
			{tags?.map((tag, id) => (
				<span
					key={id}
					className="px-4 py-1 bg-gray-100 dark:bg-[#363636] rounded-full whitespace-nowrap"
				>
					{tag.name}
				</span>
			))}
		</div>
	);
}
