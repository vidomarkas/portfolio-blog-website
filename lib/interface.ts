/* eslint-disable @typescript-eslint/no-explicit-any */
export interface simpleBlogCard {
	title: string;
	excerpt: string;
	slug: { current: string };
	featuredImage: any;
	tags: Array<Tag>;
	_id: string;
}

export interface PostListProps {
	posts: simpleBlogCard[];
}

export interface Tags {
	name: string;
	slug: { current: string };
	_id: string;
}

export interface Tag {
	name: string;
	slug: { current: string };
	_id: string;
}
export interface TagListProps {
	tags: Tag[];
}

export interface fullBlog {
	slug: string;
	title: string;
	body: any;
	featuredImage: any;
	publishedAt: Date;
	headings?: Array<string>;
	timeToRead: number;
}
export interface fullWork {
	slug: string;
	title: string;
	body: any;
	featuredImage: any;
	headings?: HTMLHeadingElement | Array<string>;
}
