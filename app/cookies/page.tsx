import React from "react";

const CookiePolicyPage: React.FC = () => {
	return (
		<div className="container mt-40">
			<h1 className="text-3xl font-semibold">Cookie Policy</h1>
			<p>
				This Cookie Policy explains how our website uses cookies and
				similar technologies to provide, improve, protect, and promote
				our services. By continuing to use our website, you agree to the
				use of cookies as described in this policy.
			</p>
			<h2>What are cookies?</h2>
			<p>
				Cookies are small text files that are placed on your device by
				websites that you visit. They are widely used to make websites
				work, or work more efficiently, as well as to provide
				information to the owners of the site.
			</p>
			<h2>How we use cookies</h2>
			<p>We use cookies to:</p>
			<ul>
				<li>Remember your preferences and settings.</li>
				<li>
					Understand how you use our website and improve your
					experience.
				</li>
				<li>Analyze traffic to our website.</li>
				<li>Provide social media features.</li>
			</ul>
			<h2>Your choices</h2>
			<p>
				You can choose to accept or decline cookies. Most web browsers
				automatically accept cookies, but you can usually modify your
				browser setting to decline cookies if you prefer. However, this
				may prevent you from taking full advantage of the website.
			</p>
			<h2>Changes to this policy</h2>
			<p>
				We may update this Cookie Policy from time to time. We encourage
				you to review this policy periodically to stay informed about
				how we are using cookies.
			</p>
			<h2>Contact us</h2>
			<p>
				If you have any questions about this Cookie Policy, please
				contact us at{" "}
				<a
					href="mailto:hey@domarkas.co"
					className="text-blue-600 hover:underline"
				>
					hey@domarkas.co
				</a>
				.
			</p>
		</div>
	);
};

export default CookiePolicyPage;
