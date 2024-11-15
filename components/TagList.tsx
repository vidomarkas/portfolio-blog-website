import clsx from "clsx";
import { Tag } from "@/lib/interface";

interface TagListProps {
	tags: Tag[];
	setSelectedTagIDs: (tagIDs: string[]) => void;
	selectedTagIDs: string[];
}

export default function TagList({
	tags,
	setSelectedTagIDs,
	selectedTagIDs,
}: TagListProps) {
	const onToggleTag = (tagID: string) => {
		if (selectedTagIDs.includes(tagID)) {
			setSelectedTagIDs(selectedTagIDs.filter((id) => id !== tagID));
		} else {
			setSelectedTagIDs([...selectedTagIDs, tagID]);
		}
	};
	return (
		<div className="flex my-2 font-medium gap-4 flex-wrap">
			{tags?.map((tag, id) => {
				// console.log("tag", tag);

				return (
					<span
						onClick={() => onToggleTag(tag.slug.current)}
						key={id}
						className={clsx(
							"px-4 py-1  rounded-full whitespace-nowrap select-none cursor-pointer",
							{
								"bg-gray-100 dark:bg-[#363636]":
									!selectedTagIDs.includes(tag.slug.current),
								"bg-black text-white dark:bg-white dark:text-black":
									selectedTagIDs.includes(tag.slug.current),
							}
						)}
					>
						{tag.name}
					</span>
				);
			})}
		</div>
	);
}
