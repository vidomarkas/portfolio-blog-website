"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
	const { setTheme, theme, systemTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Ensures the component is mounted before rendering the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	// Toggle between light and dark themes
	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	// If the component hasn't mounted yet, don't render anything to prevent hydration errors
	if (!mounted) {
		return null;
	}

	const currentTheme = theme === "system" ? systemTheme : theme;

	return (
		<div
			className="rounded-full w-6 h-6 cursor-pointer flex justify-center items-center mx-auto"
			onClick={toggleTheme}
		>
			<div>
				{currentTheme === "light" ? (
					<Sun className="h-[24px] w-[24px]" />
				) : (
					<Moon className="h-[24px] w-[24px]" />
				)}
				<span className="sr-only">Toggle theme</span>
			</div>
		</div>
	);
}
