"use client";

import React, { useState } from "react";

interface CopyEmailProps {
	email: string;
}

const CopyEmail: React.FC<CopyEmailProps> = ({ email }) => {
	const [displayText, setDisplayText] = useState(email);

	const copyText = () => {
		const range = document.createRange();
		const selection = window.getSelection();

		if (selection) {
			const emailDiv = document.getElementById("emailText");

			if (emailDiv) {
				range.selectNodeContents(emailDiv);
				selection.removeAllRanges();
				selection.addRange(range);

				navigator.clipboard.writeText(selection.toString());

				// Replace the email with "Email copied!" after copying
				setDisplayText("Email copied!");

				// Optionally reset back to the email after 2 seconds
				setTimeout(() => {
					setDisplayText(email);
				}, 750);

				selection.removeAllRanges();
			}
		}
	};

	return (
		<div>
			<div
				id="emailText"
				onClick={copyText}
				className="text-4xl lg:text-7xl font-semibold cursor-pointer"
			>
				{displayText}
			</div>
		</div>
	);
};

export default CopyEmail;
