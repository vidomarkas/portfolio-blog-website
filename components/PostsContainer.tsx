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
		<div className="container flex flex-wrap lg:grid lg:grid-cols-12 lg:gap-6">
			<div className="lg:col-span-8 min-h-screen order-2 lg:order-1">
				<PostsList
					selectedTagIDs={selectedTagIDs}
					searchQuery={searchQuery}
				/>
			</div>
			<aside className=" lg:col-span-4 order-1 lg:order-2 w-full mb-10">
				<div className="lg:sticky top-32">
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
