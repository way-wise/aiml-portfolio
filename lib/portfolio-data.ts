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
    title: "Predictive Maintenance System",
    description: "Predictive Maintenance System for manage users and products and analytics.",
    category: "machine-learning",
    highlightKeyword: "Machine Learning",
    image: "/ai/pd2.png",
    technologies: ["Python", "TensorFlow", "PostgreSQL"],
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


  {
    id: "dl-1",
    title: "SmartHelmet AI",
    description: "SmartHelmet AI – Real-time Safety Violation Detection Using Deep Learning",
    category: "deep-learning",
    highlightKeyword: "Deep Learning",
    image: "/ai/dl.png",
    technologies: ["Python", "TensorFlow", "PostgreSQL"],
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


  {
    id: "cv-1",
    title: "Computer Vision Face Login System",
    description: "Face Login System for manage users and products and analytics.",
    category: "computer-vision",
    highlightKeyword: "Computer Vision",
    image: "/ai/face_login System design.png",
    technologies: ["Python", "TensorFlow", "PostgreSQL"],
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

  
  {
    id: "nlp-1",
    title: "Sentimail",
    description: "A smart NLP tool that automatically analyzes incoming customer support emails and classifies them into Positive, Negative, or Neutral sentiment.",
    category: "nlp",
    highlightKeyword:"NLP",
    image: "/ai/nlp.png",
    technologies: ["Python", "TensorFlow", "PostgreSQL"],
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

  
  {
    id: "llm-1",
    title: "Deshboard",
    description: "Deshboard for manage users and products and analytics.",
    category: "llm",
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
