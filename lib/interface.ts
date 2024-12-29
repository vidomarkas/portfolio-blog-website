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
	slug?: { current: string };
	_id: string;
}
export interface TagListProps {
	tags: Tag[];
}

export interface Heading {
	_key: string;
	style: string;
	children: { text: string }[];
	id: string;
}

export interface fullBlog {
	slug: string;
	title: string;
	excerpt: string;

	body: any;
	featuredImage: any;
	publishedAt: Date;
	headings?: Array<Heading>;
	timeToRead: number;
}

export interface PortableTextImage {
	asset?: {
		_ref: string;
		_type: string;
	};
	alt?: string;
	height?: number;
	width?: number;
}

// ==========

export interface Technology {
	_id: string;
	slug: { _type: string; current: string };
	name: string;
}
export interface Service {
	_id: string;
	slug: { _type: string; current: string };
	name: string;
}
export interface GalleryImage {
	_type: string;
	_key: string;
	asset: {
		_ref: string;
		_type: string;
	};
	alt?: string;
}
export interface fullWork {
	slug: string;
	title: string;
	excerpt: string;
	industry: string;
	year: number;
	type: string;
	liveUrl: string;
	sourceUrl: string;
	body: any;
	gallery: Array<GalleryImage>;
	services: Array<Service>;
	technologies: Array<Technology>;
}

// ===
export interface FeaturedProject {
	title: string;
	slug: { current: string };
	featuredImage: any;
	excerpt: string;
	industry: string;
	year: number;
	services: { _id: string; slug: string; name: string }[];
	technologies: { _id: string; slug: string; name: string }[];
}

export interface Post {
	title: string;
	slug: string;
	excerpt?: string;
	featuredImage: any;
	tags: { _id: string; name: string }[];
}

// export interface Tag {
// 	_id: string;
// 	name: string;
// 	// slug: { _type: string; current: string };
// }
