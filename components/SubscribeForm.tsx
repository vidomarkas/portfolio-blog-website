"use client";
import React, { useState, FormEvent } from "react";
import { Bell, CircleCheck, CircleAlert } from "lucide-react";

const SubscribeForm = () => {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<
		"success" | "error" | "loading" | "idle"
	>("idle");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("loading");

		const response = await fetch("/api/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		if (response.ok) {
			console.log("response", response);
			setStatus("success");
			setEmail("");
		} else {
			setStatus("error");
		}
	};
	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="inline-flex justify-center border p-1 dark:border-gray-600 mx-auto rounded-2xl gap-x-2 mb-6"
			>
				<input
					type="email"
					name="email"
					id="email"
					className="border dark:bg-[#18181a] dark:border-gray-600 rounded-xl px-4"
					required
					placeholder="email@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={status === "loading"}
				/>
				<button
					type="submit"
					className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl flex gap-x-2 group"
				>
					<Bell className="group-hover:rotate-12 transition-all duration-75" />
					{status === "loading" ? "Submitting..." : "Subscribe"}
				</button>
			</form>

			{status === "success" && (
				<div>
					<p className="bg-[#adfa1b] inline-block dark:text-black px-4 py-2 rounded-full">
						<CircleCheck className="inline mr-2" /> Check your inbox
						to confirm your subscription!
					</p>
				</div>
			)}
			{status === "error" && (
				<div>
					<p className="bg-[#d83056] inline-block text-white dark:text-black px-4 py-2 rounded-full leading-none">
						<CircleAlert className="inline mr-2" />
						Something went wrong. Please try again.
					</p>
				</div>
			)}
		</>
	);
};

export default SubscribeForm;
