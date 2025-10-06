"use client"

import { cn } from "@/lib/utils"

const categories = [
  { id: "machine-learning", label: "Machine Learning" },
  { id: "computer-vision", label: "Computer Vision" },
  { id: "nlp", label: "NLP" },
  { id: "llm", label: "LLM" },
  { id: "llm", label: "Time Series Forecasting" },
]

interface CategoryNavProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "machine-learning":
        return "from-emerald-400 to-teal-600"
      case "deep-learning":
        return "from-purple-400 to-indigo-600"
      case "computer-vision":
        return "from-cyan-400 to-blue-600"
      case "nlp":
        return "from-amber-400 to-orange-600"
      case "llm":
        return "from-rose-400 to-pink-600"
      default:
        return "from-gray-700 to-gray-900"
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-6 py-3 rounded-full font-medium transition-all",
            activeCategory === category.id
              ? "text-white shadow-lg bg-gradient-to-r"
              : "bg-white text-gray-700 hover:bg-gray-100",
            activeCategory === category.id && getCategoryGradient(category.id),
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
