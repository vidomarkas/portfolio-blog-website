"use client";
// import Link from "next/link";
import { useEffect, useState } from "react";

export const Footer = () => {
	const [year, setYear] = useState(new Date().getFullYear());

	useEffect(() => {
		setYear(new Date().getFullYear());
	}, []);

	return (
		<footer className="border-t border-[#eaeaea] dark:border-[#333] py-8 px-4">
			<div className="container mx-auto flex justify-between dark:text-[#eaeaea] text-[#333]">
				<p>{year} Viktoras Domarkas</p>
				{/* <ul className="flex space-x-3">
					<li>
						<Link href="/cookies" className="hover:underline">
							Cookies
						</Link>
					</li>
					<li>
						<Link
							href="/privacy-policy"
							className="hover:underline"
						>
							Privacy policy
						</Link>
					</li>
				</ul> */}
			</div>
		</footer>
	);
};
