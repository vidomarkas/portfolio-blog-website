"use client";
import { useState } from "react";
import TagList from "@/components/TagList";
import PostsList from "@/components/PostsList";
import { TagListProps, PostListProps } from "@/lib/interface";

interface PostsContainerProps {
	tags: TagListProps["tags"];
}

const PostsContainer = ({ tags }: PostsContainerProps) => {
	const [selectedTagIDs, setSelectedTagIDs] = useState<string[]>([]);
	return (
		<div className="container grid grid-cols-12 gap-6">
			<div className="col-span-8 min-h-screen">
				<PostsList selectedTagIDs={selectedTagIDs} />
			</div>
			<aside className=" col-span-4">
				<div className="sticky top-32">
					<div>
						<h2>Recommended topics</h2>
						<TagList
							tags={tags}
							selectedTagIDs={selectedTagIDs}
							setSelectedTagIDs={setSelectedTagIDs}
						/>
					</div>
					<div>search</div>
				</div>
			</aside>
		</div>
	);
};

export default PostsContainer;
