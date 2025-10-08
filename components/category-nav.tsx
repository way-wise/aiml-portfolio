"use client"

import { cn } from "@/lib/utils"

const categories = [
  { id: "deep-learning", label: "Deep Learning" },
  { id: "time-series", label: "Time Series Forecasting" },
  { id: "multi-modal", label: "Multimodal Learning" },
  { id: "distillation", label: "Distillation" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "reinforcement-learning", label: "Reinforcement Learning" },
  { id: "federated-learning", label: "Federated Learning" },
  { id: "natural-language-processing", label: "Natural Language Processing" },
]

interface CategoryNavProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "machine-learning":
        return "from-emerald-500 via-teal-500 to-cyan-600"
      case "deep-learning":
        return "from-cyan-500 via-blue-500 to-indigo-600"
      case "natural-language-processing":
        return "from-amber-500 via-orange-500 to-red-500"
      case "multi-modal":
        return "from-rose-500 via-pink-500 to-purple-600"
      case "time-series":
        return "from-violet-500 via-purple-500 to-fuchsia-600"
      case "distillation":
        return "from-emerald-500 via-teal-500 to-cyan-600"
      case "reinforcement-learning":
        return "from-amber-500 via-orange-500 to-red-500"
      case "federated-learning":
        return "from-cyan-500 via-blue-500 to-indigo-600"
      default:
        return "from-gray-600 to-gray-800"
    }
  }

  return (
    <div className="max-w-5xl flex flex-wrap justify-center gap-3 p-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "relative px-3 py-2.5 rounded-full font-semibold transition-all duration-300 overflow-hidden group",
            "border-2 backdrop-blur-sm",
            activeCategory === category.id
              ? `bg-gradient-to-r ${getCategoryGradient(category.id)} text-white border-transparent shadow-xl scale-105`
              : "bg-white/80 text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-lg hover:scale-105 hover:bg-white"
          )}
        >
          <span className="relative z-10 flex items-center gap-2 text-md">
            {activeCategory === category.id && (
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            )}
            {category.label}
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