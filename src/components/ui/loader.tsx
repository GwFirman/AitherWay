"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Loader = () => {
	const pathname = usePathname();
	const [progress, setProgress] = useState(0);
	const [hidden, setHidden] = useState(true);

	useEffect(() => {
		setProgress(60);
		setHidden(false);

		const timer = setTimeout(() => {
			setProgress(100);

			setTimeout(() => {
				setHidden(true);
				setProgress(0);
			}, 200);
		}, 500);

		return () => clearTimeout(timer);
	}, [pathname]);

	return (
		<div
			className={`fixed top-0 left-0 h-[2px] bg-blue-400 transition-all duration-300 ${hidden ? "w-0 opacity-0" : "z-[70] w-full opacity-100"}`}
			style={{
				width: `${progress}%`,
				transition: progress === 100 ? "none" : "width 0.3s ease-in-out",
			}}
		/>
	);
};

export default Loader;
