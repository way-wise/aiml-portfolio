export interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  highlightKeyword?: string
  image: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  completionDate?: string
  longDescription?: string
  features?: string[]
  process?: string
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "ml-1",
    title: "Deshboard",
    description: "Deshboard for manage users and products and analytics.",
    category: "machine-learning",
    highlightKeyword: "Laravel Dashboard",
    image: "/web/web-6.webp",
    technologies: ["Node.js", "Socket.io", "PostgreSQL"],
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/example/project",
    completionDate: "August 2023",
    features: [
      "Real-time message delivery",
      "User presence detection",
      "Message history storage",
      "End-to-end encryption",
    ],
  },
  
  
]


export const sectionInfo = {
  "machine-learning": {
    "title": "Machine Learning",
    "description": "Explore my Machine Learning projects with a focus on scalability and performance."
  },
  "deep-learning": {
    "title": "Deep Learning",
    "description": "Explore my Deep Learning projects with a focus on scalability and performance."
  },
  "computer-vision": {
    "title": "Computer Vision",
    "description": "Discover my Computer Vision projects with a range of features and capabilities."
  },
  "nlp": {
    "title": "NLP",
    "description": "Check out my NLP projects with a focus on user experience and design."
  },
  "llm": {
    "title": "LLM",
    "description": "Explore my LLM projects with a range of features and capabilities."
  },
  "api": {
    "title": "API Projects",
    "description": "Discover my API projects with a focus on scalability and performance."
  }

}
