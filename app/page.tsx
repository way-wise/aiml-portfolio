"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowDown, ExternalLink, Github } from "lucide-react";
import CategoryNav from "@/components/category-nav";
import PortfolioCard from "@/components/portfolio-card";
import { portfolioItems } from "@/lib/portfolio-data";
import Image from "next/image";
import { sectionInfo } from "@/lib/portfolio-data";

type SectionKey = keyof typeof sectionInfo;

export default function Home() {
	const searchParams = useSearchParams();
	const [activeCategory, setActiveCategory] = useState<string>("backend");
	const [highlightedIds, setHighlightedIds] = useState<string[]>([]);
	const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({
		backend: null,
		mobile: null,
		frontend: null,
		nocode: null,
		api: null,
	});

	// Handle URL parameters for highlighting specific cards
	useEffect(() => {
		const idParam = searchParams.get("id");
		if (idParam) {
			// Support multiple IDs separated by commas
			const ids = idParam.split(",");
			setHighlightedIds(ids);

			// If there's at least one ID, set the active category to the first highlighted item's category
			if (ids.length > 0) {
				const firstItem = portfolioItems.find((item) => item.id === ids[0]);
				if (firstItem) {
					setActiveCategory(firstItem.category);

					// Use a ref to track if we've already scrolled to avoid infinite loops
					const timer = setTimeout(() => {
						if (sectionRefs.current[firstItem.category]) {
							sectionRefs.current[firstItem.category]?.scrollIntoView({
								behavior: "smooth",
							});
						}
					}, 500);

					return () => clearTimeout(timer);
				}
			}
		}
	}, [searchParams]); // Only depend on searchParams

	const scrollToCategory = (category: string) => {
		// Don't update state here, just scroll
		if (sectionRefs.current[category]) {
			sectionRefs.current[category]?.scrollIntoView({ behavior: "smooth" });
		}
	};

	const handleCategoryChange = (category: string) => {
		setActiveCategory(category);
		// Use setTimeout to ensure the state update completes before scrolling
		setTimeout(() => {
			scrollToCategory(category);
		}, 0);
	};

	// Group portfolio items by category
	const itemsByCategory = portfolioItems.reduce((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = [];
		}
		acc[item.category].push(item);
		return acc;
	}, {} as Record<string, typeof portfolioItems>);

	// Get unique categories
	const categories = Object.keys(itemsByCategory);

	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			{/* Hero Section */}
			<header className="sticky top-0 bg-gray-50 z-50 px-4 sm:px-8 lg:px-[100px] py-4">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-6">
					{/* Logo Section */}
					<div className="flex flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-5">
						<Image 
							src="/wwt_logo.png" 
							alt="Logo" 
							width={250} 
							height={200}
							className="w-40 sm:w-52 lg:w-[250px] h-auto"
						/>
						<p className="text-xs sm:text-sm -mb-0.5 font-bold text-gray-900 text-center sm:text-left">
							A California Innovation Company
						</p>
					</div>
					
					{/* Title Section */}
					<div className="text-center">
						<h2 className="text-2xl sm:text-3xl text-orange-600 font-bold">
							Our Dynamic Portfolio
						</h2>
						<a
							href="mailto:support@waywisetech.com"
							className="text-orange-600 font-bold text-xs sm:text-sm mt-2 block hover:underline"
						>
							support@waywisetech.com
						</a>
					</div>
					
					{/* Navigation Section */}
					<div className="w-full lg:w-auto lg:max-w-4xl py-2 lg:py-5">
						<CategoryNav
							activeCategory={activeCategory}
							onCategoryChange={handleCategoryChange}
						/>
					</div>
				</div>
			</header>

			{/* Portfolio Sections - One for each category */}
			{categories.map((category) => (
				<section
					key={category}
					ref={(el) => {
						sectionRefs.current[category] = el as HTMLDivElement | null;
					}}
					className="py-[120px] px-4 bg-white border-b-4 border-gray-200 last:border-0"
					id={`section-${category}`}
				>
					<div className="px-16">
						<div className="flex flex-col items-center gap-1 pb-[70px]">
							<h2 className="text-5xl font-semibold text-center capitalize">
								{sectionInfo[category as SectionKey]?.title ||
									`${category} Projects`}
							</h2>
							<p className="text-2xl text-gray-300">
								{sectionInfo[category as SectionKey]?.description ||
									"Explore my work in this category."}
							</p>
						</div>
						<div className="flex flex-wrap justify-center gap-8">
							{itemsByCategory[category].map((item, index) => (
								<PortfolioCard
									key={item.id + index}
									item={item}
									isHighlighted={highlightedIds.includes(item.id)}
								/>
							))}
						</div>
					</div>
				</section>
			))}

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12 px-4">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
					<div className="mb-6 md:mb-0">
						<h3 className="text-xl font-bold">Our Portfolio</h3>
						<p className="text-gray-400 mt-2">
							Showcasing my development journey
						</p>
					</div>
					<div className="flex space-x-6">
						<a
							href="https://github.com"
							className="hover:text-gray-300 transition-colors"
						>
							<Github size={24} />
						</a>
						<a
							href="https://linkedin.com"
							className="hover:text-gray-300 transition-colors"
						>
							<ExternalLink size={24} />
						</a>
					</div>
				</div>
			</footer>
		</main>
	);
}
