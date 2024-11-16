"use client";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

export default function Subscribed() {
	const [confettiTrigger, setConfettiTrigger] = useState(false);

	useEffect(() => {
		setTimeout(() => setConfettiTrigger(true), 300);
		// eslint-disable-next-line
	}, []);

	const config = {
		angle: 360,
		spread: 360,
		startVelocity: 87,
		elementCount: 187,
		dragFriction: 0.17,
		duration: 4290,
		stagger: 0,
		width: "10px",
		height: "23px",
		perspective: "10000px",
		colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
	};

	return (
		<>
			<section className="container py-24 mt-40">
				<div className="flex justify-center">
					<Confetti active={confettiTrigger} config={config} />
				</div>
				<h2 className="text-7xl text-center">
					Thank you for subscribing!
				</h2>
			</section>
		</>
	);
}
