"use client";
import { useState } from "react";
import TagList from "@/components/TagList";
import PostsList from "@/components/PostsList";
import { TagListProps } from "@/lib/interface";
import PostSearch from "./PostSearch";

interface PostsContainerProps {
	tags: TagListProps["tags"];
}

const PostsContainer = ({ tags }: PostsContainerProps) => {
	const [selectedTagIDs, setSelectedTagIDs] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	return (
		<div className="container grid grid-cols-12 gap-6">
			<div className="col-span-8 min-h-screen">
				<PostsList
					selectedTagIDs={selectedTagIDs}
					searchQuery={searchQuery}
				/>
			</div>
			<aside className=" col-span-4">
				<div className="sticky top-32">
					<PostSearch
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
					<div className="mt-6">
						<h2>Recommended topics</h2>
						<TagList
							tags={tags}
							selectedTagIDs={selectedTagIDs}
							setSelectedTagIDs={setSelectedTagIDs}
						/>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default PostsContainer;
