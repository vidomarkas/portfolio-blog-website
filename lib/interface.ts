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
	slug: string;
	title: string;
	body: any;
	featuredImage: any;
	headings?: HTMLHeadingElement | Array<string>;
}
export interface fullWork {
	slug: string;
	title: string;
	body: any;
	featuredImage: any;
	headings?: HTMLHeadingElement | Array<string>;
}
