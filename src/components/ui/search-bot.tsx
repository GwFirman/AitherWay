"use client";

import { useState, useCallback, useEffect, useMemo, KeyboardEvent, ChangeEvent } from "react";
import { Search, Loader2 } from "lucide-react";

interface SearchBarProps {
	onSearch: (query: string) => void;
	onChange?: (value: string) => void;
	placeholder?: string;
	className?: string;
	loading?: boolean;
	value?: string;
}

const SearchBot = ({
	onSearch,
	onChange,
	placeholder = "Search destinations, activities...",
	className = "",
	loading: externalLoading = false,
	value,
}: SearchBarProps) => {
	const [searchValue, setSearchValue] = useState(value ?? "");

	useEffect(() => {
		if (value !== undefined) {
			setSearchValue(value);
		}
	}, [value]);

	const handleInputChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const val = e.target.value;

			if (value === undefined) {
				setSearchValue(val);
			}

			// Notify parent
			if (onChange) {
				onChange(val);
			}
		},
		[value, onChange]
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
		[handleSearch]
	);

	const isLoading = useMemo(() => externalLoading, [externalLoading]);
	const currentValue = useMemo(() => value ?? searchValue, [value, searchValue]);

	const inputStyles = useMemo(
		() =>
			"w-full rounded-full border border-transparent bg-slate-100 py-3 pr-12 pl-4 text-sm font-medium transition-all duration-300 ease-in-out outline-none placeholder:text-slate-500 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500 " +
			"sm:py-4 sm:pr-14 sm:pl-5 sm:text-base " +
			"md:py-4 md:pr-16 md:pl-6 " +
			"placeholder:opacity-0 sm:placeholder:opacity-100 " +
			"disabled:opacity-50 disabled:cursor-not-allowed",
		[]
	);

	const buttonStyles = useMemo(
		() =>
			"absolute top-1/2 right-1 -translate-y-1/2 transform rounded-full bg-pink-600 p-2 text-white transition-all duration-200 hover:bg-pink-700 focus:ring-2 focus:ring-pink-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed " +
			"sm:right-2 sm:p-3 " +
			"md:right-2 md:p-3 " +
			"active:scale-95",
		[]
	);

	const containerStyles = useMemo(
		() =>
			`relative w-full max-w-xs mx-auto ${className} ` +
			"sm:max-w-sm " +
			"md:max-w-md " +
			"lg:max-w-lg " +
			"xl:max-w-xl",
		[className]
	);

	const iconSize = useMemo(() => {
		return 18;
	}, []);

	return (
		<div className={containerStyles}>
			<div className="flex items-center relative">
				<input
					value={currentValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					autoComplete="off"
					aria-label="Search"
					className={inputStyles}
					disabled={isLoading}
				/>
				<button
					onClick={handleSearch}
					className={buttonStyles}
					aria-label="Search"
					disabled={isLoading || !currentValue.trim()}
					type="button"
				>
					{isLoading ? (
						<Loader2
							size={iconSize}
							className="animate-spin sm:w-5 sm:h-5 md:w-5 md:h-5"
						/>
					) : (
						<Search
							size={iconSize}
							className="sm:w-5 sm:h-5 md:w-5 md:h-5"
						/>
					)}
				</button>
			</div>

			{currentValue && !isLoading && (
				<div className="absolute top-full left-0 right-0 mt-1 opacity-0 pointer-events-none transition-opacity duration-200">
				</div>
			)}
		</div>
	);
};

export default SearchBot;