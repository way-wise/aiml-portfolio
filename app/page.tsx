"use client";
import { useEffect, useState } from "react";
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
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);



  // Group portfolio items by category
  const itemsByCategory = portfolioItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof portfolioItems>);
//  console.log(itemsByCategory)
  // Get unique categories
  const categories = Object.keys(itemsByCategory);

  // Handle URL parameters for highlighting specific cards
  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      const ids = idParam.split(",");
      setHighlightedIds(ids);
    }
  }, [searchParams]);

  // Toggle category visibility
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Thin Header */}
      <header className="sticky top-0 bg-white z-50 px-3 sm:px-6 md:px-8 lg:px-[100px] py-2 sm:py-3 border-b border-gray-200">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Image
              src="/wwt_logo.png"
              alt="Logo"
              width={180}
              height={60}
              className="w-24 sm:w-32 md:w-40 lg:w-[180px] h-auto"
            />
          </div>
          {/* Title and Email - Upper Right */}
          <div className="text-right flex-shrink min-w-0">
            <h1 className="text-sm sm:text-xl md:text-2xl text-orange-600 font-bold leading-tight">
              Our Dynamic Portfolio
            </h1>
            <a
              href="mailto:support@waywisetech.com"
              className="text-orange-600 text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1 block hover:underline truncate"
            >
              support@waywisetech.com
            </a>
          </div>
        </div>
      </header>

      {/* Category Navigation - Centered Below Header */}
      <div className="bg-white py-3 sm:py-4 md:py-2 px-2 sm:px-4 border-b-2 border-gray-100 sticky top-[56px] sm:top-[64px] md:top-[72px] z-40 overflow-x-auto scrollbar-hide">
        <div className="flex justify-center min-w-max mx-auto px-2">
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            categories={["all", ...categories]}
          />
        </div>
      </div>

      {/* Portfolio Cards List */}
      <div className="py-12 sm:py-16 md:py-24 lg:py-[120px] px-3 sm:px-4 md:px-6 bg-white">
        <div className="px-2 sm:px-4 md:px-8 lg:px-16 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center">
            {(activeCategory === "all"
              ? portfolioItems
              : itemsByCategory[activeCategory] || []
            ).map((item) => (
              <div
                key={item.id}
                className="w-full max-w-sm transition-all duration-500 opacity-100 translate-y-0"
              >
                <PortfolioCard
                  item={item}
                  isHighlighted={highlightedIds.includes(item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold">Our Portfolio</h3>
            <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
              Showcasing my development journey
            </p>
          </div>
          <div className="flex space-x-4 sm:space-x-6">
            <a
              href="https://github.com"
              className="hover:text-gray-300 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-gray-300 transition-colors"
              aria-label="LinkedIn"
            >
              <ExternalLink size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
