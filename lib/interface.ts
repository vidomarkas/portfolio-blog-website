/* eslint-disable @typescript-eslint/no-explicit-any */
export interface simpleBlogCard {
	title: string;
	slug: { current: string };
	featuredImage: any;
	tags: Array<Tag>;
	_id: string;
}

export interface Tag {
	name: string;
	slug: { current: string };
	_id: string;
}

export interface fullBlog {
	currentSlug: string;
	title: string;
	content: any;
	titleImage: any;
	headings: any;
}
