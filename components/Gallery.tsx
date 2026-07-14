"use client";
// import React from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { PortableTextImage } from "@/lib/interface";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Gallery = ({ gallery }: { gallery: PortableTextImage[] }) => {
	return (
		<div className="border rounded-xl">
			<Swiper spaceBetween={50} slidesPerView={3}>
				{gallery.map((image, i: number) => (
					<SwiperSlide key={i} className="">
						<Image
							src={urlFor(image).url()}
							alt={image.alt || `Gallery Image ${i + 1}`}
							width={800}
							height={400}
							sizes="(min-width: 1200px) 390px, 33vw"
							className=""
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Gallery;

{
	/* <section className="grid grid-cols-2 grid-rows-2 gap-4 p-4">
				{gallery.map((image, i: number) => (
					<div key={i} className="w-full rounded-xl overflow-hidden">
						<Image
							src={urlFor(image).url()}
							alt={image.alt || `Gallery Image ${i + 1}`}
							width={800}
							height={400}
							className="object-cover object-center w-full h-full aspect-video"
						/>
					</div>
				))}
			</section> */
}
