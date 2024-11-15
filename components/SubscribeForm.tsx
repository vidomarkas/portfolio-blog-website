import React from "react";
import { Bell } from "lucide-react";

const SubscribeForm = () => {
	return (
		<form
			action=""
			className="inline-flex justify-center border p-1 dark:border-gray-600 mx-auto rounded-2xl gap-x-2"
		>
			<input
				type="email"
				name="email"
				id="email"
				className="border dark:bg-[#18181a] dark:border-gray-600 rounded-xl px-4"
				required
				placeholder="email@example.com"
			/>
			<button
				type="submit"
				className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl flex gap-x-2 group"
			>
				<Bell className="group-hover:rotate-12 transition-all duration-75" />
				Subscribe
			</button>
		</form>
	);
};

export default SubscribeForm;
