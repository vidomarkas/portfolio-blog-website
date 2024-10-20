import React from "react";

const page = () => {
	return (
		<div className="mt-32">
			<section className="py-20 bg-green-200">
				<div className="container">
					<h2> featured work (possibly grid)</h2>
					<ul>
						<li className="py-4">1</li>
						<li className="py-4">2</li>
						<li className="py-4">3</li>
						<li className="py-4">4</li>
					</ul>
				</div>
			</section>

			<section className="py-20 bg-yellow-100">
				<div className="container">
					<h2 id="other_work">Other work</h2>
					<ul>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
						<li className="py-4 border-b border-black">bla bla</li>
					</ul>
				</div>
			</section>
		</div>
	);
};

export default page;
