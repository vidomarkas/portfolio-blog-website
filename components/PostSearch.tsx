import { Search } from "lucide-react";

interface PostSearchProps {
	setSearchQuery: (searchQuery: string) => void;
	searchQuery: string;
}

const PostSearch = ({ searchQuery, setSearchQuery }: PostSearchProps) => {
	const onEnterSearchQuery = (query: string) => {
		setSearchQuery(query);
	};
	return (
		<div className="relative">
			<input
				className="block bg-gray-100 dark:bg-[#363636] pl-8 px-3 py-2 w-full rounded-full"
				value={searchQuery}
				type="text"
				onChange={(e) => onEnterSearchQuery(e.target.value)}
				placeholder="Search"
			/>
			<Search className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4" />
		</div>
	);
};

export default PostSearch;
