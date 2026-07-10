import Link from "next/link";

export default function NotFound() {
	return (
		<div className="container my-40 py-8">
			<h1 className="text-4xl font-semibold mb-4">Not Found</h1>
			<p className="mb-8">Could not find requested resource</p>
			<Link href="/">Return Home</Link>
		</div>
	);
}
