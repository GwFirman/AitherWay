"use client";

import Footer from "@/components/Footer";
import React, { ReactNode } from "react";
import { SearchProvider } from "../../contexts/SearchContext";
import NavBar from "./NavBar";

export default function layout(props: { children: ReactNode }) {
	return (
		<SearchProvider>
			<div className="flex min-h-screen flex-col">
				<NavBar />
				{props.children}
				<Footer />
			</div>
		</SearchProvider>
	);
}
