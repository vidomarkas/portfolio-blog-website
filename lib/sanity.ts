import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
	apiVersion: "2023-05-03",
	dataset: "production",
	projectId: "6kn6mndv",
	useCdn: false,
});

const builder = ImageUrlBuilder(client);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
	return builder.image(source);
}
