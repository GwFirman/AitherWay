"use client";

import { useState, useCallback, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { Search, Loader2 } from "lucide-react";

interface SearchBarProps {
	onSearch: (query: string) => void;
	onChange?: (value: string) => void; // ← ✅ Tambahan
	placeholder?: string;
	className?: string;
	loading?: boolean;
	value?: string; // ← Controlled input opsional
}

const SearchBot = ({
	onSearch,
	onChange, // ← ✅ Tambahan
	placeholder = "Search destinations, activities...",
	className = "",
	loading: externalLoading = false,
	value,
}: SearchBarProps) => {
	const [searchValue, setSearchValue] = useState(value ?? "");

	// Sinkronisasi jika controlled value berubah
	useEffect(() => {
		if (value !== undefined) {
			setSearchValue(value);
		}
	}, [value]);

	const handleInputChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const val = e.target.value;

			// Controlled: tidak update state lokal
			if (value === undefined) {
				setSearchValue(val);
			}

			// Beritahu parent
			if (onChange) {
				onChange(val);
			}
		},
		[value, onChange],
	);

	const handleSearch = useCallback(() => {
		const trimmed = (value ?? searchValue).trim();
		if (trimmed) {
			onSearch(trimmed);
		}
	}, [value, searchValue, onSearch]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				handleSearch();
			}
		},
		[handleSearch],
	);

	const isLoading = externalLoading;

	return (
		<div className={`relative w-full max-w-lg ${className}`}>
			<div className="flex items-center">
				<input
					type="search"
					value={value ?? searchValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					autoComplete="off"
					aria-label="Search"
					className="w-full rounded-full border border-transparent bg-slate-100 py-4 pr-12 pl-5 text-sm font-medium transition-all duration-300 ease-in-out outline-none placeholder:text-slate-500 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500"
				/>
				<button onClick={handleSearch} className="absolute top-1/2 right-0 mr-2 -translate-y-1/2 transform rounded-full bg-pink-600 p-3 text-white transition-colors duration-200 hover:bg-pink-700 focus:ring-2 focus:ring-pink-400 focus:outline-none" aria-label="Search" disabled={isLoading}>
					{isLoading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
				</button>
			</div>
		</div>
	);
};

export default SearchBot;
