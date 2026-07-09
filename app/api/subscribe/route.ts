import { NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

export async function POST(request: Request) {
	try {
		const { email } = await request.json();

		if (!email) {
			return NextResponse.json(
				{ error: "Email is required" },
				{ status: 400 }
			);
		}

		const response = await fetch("https://api.brevo.com/v3/contacts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"api-key": BREVO_API_KEY!,
			},
			body: JSON.stringify({
				email,
				listIds: [parseInt(BREVO_LIST_ID!)],
				updateEnabled: true, // Update contact if already exists
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			return NextResponse.json(errorData, { status: response.status });
		}

		return NextResponse.json({ message: "Subscription successful" });
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
