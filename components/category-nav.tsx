"use client"

import { cn } from "@/lib/utils"

const defaultCategories = [
  { id: "deep-learning", label: "Deep Learning" },
  { id: "time-series", label: "Time Series Forecasting" },
  { id: "llm", label: "Multimodal Learning" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "reinforcement-learning", label: "Reinforcement Learning" },
  { id: "nlp", label: "Natural Language Processing" },
]

interface CategoryNavProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  categories?: string[]
  isVertical?: boolean
}

export default function CategoryNav({ activeCategory, onCategoryChange, categories, isVertical = false }: CategoryNavProps) {
  // Create category objects from the categories array or use defaults
  const categoryList = categories ? categories.map(id => {
    const defaultCategory = defaultCategories.find(cat => cat.id === id);
    return defaultCategory || { id, label: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ') };
  }) : defaultCategories;
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "machine-learning":
        return "from-emerald-500 via-teal-500 to-cyan-600"
      case "computer-vision":
        return "from-cyan-500 via-blue-500 to-indigo-600"
      case "deep-learning":
        return "from-indigo-500 via-purple-500 to-pink-600"
      case "nlp":
        return "from-amber-500 via-orange-500 to-red-500"
      case "llm":
        return "from-rose-500 via-pink-500 to-purple-600"
      case "time-series":
        return "from-violet-500 via-purple-500 to-fuchsia-600"
      case "reinforcement-learning":
        return "from-green-500 via-emerald-500 to-teal-600"
      case "all":
        return "from-gray-500 via-gray-600 to-gray-700"
      default:
        return "from-gray-600 to-gray-800"
    }
  }

  return (
    <div className={cn(
      "gap-2 sm:gap-3 md:gap-4",
      isVertical ? "flex flex-col" : "flex flex-wrap justify-center"
    )}>
      {categoryList.map((category, index) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          style={isVertical ? { animationDelay: `${index * 50}ms` } : {}}
          className={cn(
            "relative rounded-full font-semibold transition-all duration-300 overflow-hidden group border-2 backdrop-blur-sm",
            isVertical 
              ? "px-4 py-3 w-full text-left text-sm hover:scale-[1.02] active:scale-[0.98]"
              : "px-3 py-2 sm:px-5 sm:py-2.5 md:px-7 md:py-3.5 text-xs sm:text-sm md:text-base",
            activeCategory === category.id
              ? `bg-gradient-to-r ${getCategoryGradient(category.id)} text-white border-transparent shadow-xl scale-105`
              : "bg-white/80 text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-lg hover:scale-105 hover:bg-white"
          )}
        >
          <span className="relative z-10 flex items-center gap-1 sm:gap-2">
            {activeCategory === category.id && (
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
            )}
            <span className="whitespace-nowrap">{category.label}</span>
          </span>
          {activeCategory !== category.id && (
            <span 
              className={cn(
                "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                getCategoryGradient(category.id)
              )}
            />
          )}
        </button>
      ))}
    </div>
  )
}