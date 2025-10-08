"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowDown, ExternalLink, Github, Menu, X } from "lucide-react";
import CategoryNav from "@/components/category-nav";
import PortfolioCard from "@/components/portfolio-card";
import { portfolioItems } from "@/lib/portfolio-data";
import Image from "next/image";
import { sectionInfo } from "@/lib/portfolio-data";

export default function Home() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);



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
    setIsDrawerOpen(false); // Close drawer when category is selected
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
          
          {/* Title and Email - Center */}
          <div className="text-center flex-shrink min-w-0 flex-1">
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

          {/* Hamburger Menu - Right */}
          <div className="flex-shrink-0">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle categories menu"
            >
              {isDrawerOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Category Navigation - Hidden on Mobile, Visible on Desktop */}
      <div className="hidden md:block bg-white py-3 sm:py-4 md:py-6 px-2 sm:px-4 border-b-2 border-gray-100 sticky top-[48px] sm:top-[56px] md:top-[72px] z-40">
        <div className="flex justify-center mx-auto px-2">
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            categories={["all", ...categories]}
          />
        </div>
      </div>

      {/* Mobile Category Drawer */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-out ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ease-out ${isDrawerOpen ? 'opacity-50' : 'opacity-0'}`}
          onClick={() => setIsDrawerOpen(false)}
        />
        
        {/* Drawer */}
        <div className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-all duration-300 ease-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} className="text-gray-700" />
            </button>
          </div>
          
          {/* Drawer Content */}
          <div className="p-4 overflow-y-auto h-full">
            <div className="space-y-2">
              <CategoryNav
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                categories={["all", ...categories]}
                isVertical={true}
              />
            </div>
          </div>
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
