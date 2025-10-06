import React, { useState, useMemo } from 'react';
import { Search, Github, ExternalLink, Calendar, Filter, X } from 'lucide-react';

// Portfolio data structure
const portfolioItems = [
  {
    id: "ml-1",
    title: "Advanced Sentiment Analysis System",
    description: "Revolutionized customer feedback analysis with multi-domain sentiment classification, sarcasm detection, and real-time analytics.",
    category: "machine-learning",
    highlightKeyword: "Machine Learning",
    image: "/ai/ml1.png",
    technologies: ["Python", "PyTorch", "FastAPI", "Hugging Face", "PostgreSQL", "Docker"],
    completionDate: "June 2023",
    features: ["Multi-domain sentiment classification (92% accuracy)", "Sarcasm detection (85% accuracy)", "Real-time processing pipeline"],
  },
  {
    id: "cv-2",
    title: "Real-time Object Detection System",
    description: "Developed a cutting-edge real-time object detection system for autonomous vehicles with sub-millisecond latency.",
    category: "computer-vision",
    highlightKeyword: "Computer Vision",
    image: "/ml/real-time.png",
    technologies: ["Python", "PyTorch", "OpenCV", "TensorRT", "CUDA", "FastAPI"],
    completionDate: "August 2023",
    features: ["Real-time object detection (30+ FPS)", "Multi-camera synchronization", "Custom object classification (100+ classes)"],
  },
  {
    id: "nlp-2",
    title: "Advanced Sentiment Analysis System",
    description: "A state-of-the-art sentiment analysis system processing 1M+ customer reviews daily with 95% accuracy.",
    category: "nlp",
    highlightKeyword: "NLP",
    image: "/ai/nlp1.png",
    technologies: ["Python", "PyTorch", "Transformers", "FastAPI", "Redis", "Docker"],
    completionDate: "May 2023",
    features: ["Real-time sentiment analysis with 200ms response time", "Multi-language support", "Aspect-based sentiment analysis"],
  },
  {
    id: "llm-2",
    title: "Custom LLM Development",
    description: "Developed a custom large language model from scratch, optimized for enterprise applications.",
    category: "llm",
    highlightKeyword: "LLM",
    image: "/ai/llm1.png",
    technologies: ["Python", "PyTorch", "DeepSpeed", "PEFT", "LoRA", "FastAPI"],
    completionDate: "April 2023",
    features: ["Custom architecture with 7B parameters", "Domain-specific pre-training", "Multi-task learning capabilities"],
  },
];

const categories = {
  all: { name: "All Projects", color: "from-purple-500 to-pink-500" },
  "machine-learning": { name: "Machine Learning", color: "from-blue-500 to-cyan-500" },
  "computer-vision": { name: "Computer Vision", color: "from-green-500 to-emerald-500" },
  nlp: { name: "NLP", color: "from-orange-500 to-red-500" },
  llm: { name: "LLM", color: "from-indigo-500 to-purple-500" },
};

export default function InteractivePortfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredProjects = useMemo(() => {
    return portfolioItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryStats = useMemo(() => {
    const stats = {};
    portfolioItems.forEach(item => {
      stats[item.category] = (stats[item.category] || 0) + 1;
    });
    return stats;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl top-0 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl bottom-0 -right-48 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
            AI Portfolio Showcase
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Exploring the frontiers of artificial intelligence through innovative projects
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects, technologies, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(categories).map(([key, { name, color }]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  selectedCategory === key
                    ? `bg-gradient-to-r ${color} text-white shadow-lg shadow-purple-500/30`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
                }`}
              >
                {name}
                {key !== 'all' && categoryStats[key] && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {categoryStats[key]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-slate-400">
            Showing <span className="text-purple-400 font-semibold">{filteredProjects.length}</span> projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${categories[project.category]?.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                {/* Category Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${categories[project.category]?.color} shadow-lg`}>
                  {project.highlightKeyword}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-sm line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-lg">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    {project.completionDate}
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-800 hover:bg-purple-500 rounded-lg transition-colors group/btn">
                      <Github className="w-4 h-4 text-slate-400 group-hover/btn:text-white transition-colors" />
                    </button>
                    <button className="p-2 bg-slate-800 hover:bg-purple-500 rounded-lg transition-colors group/btn">
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover/btn:text-white transition-colors" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              {hoveredCard === project.id && (
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
              <Filter className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-300 mb-2">No projects found</h3>
            <p className="text-slate-400 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {selectedProject.title}
                  </h2>
                  <p className={`mt-2 inline-block px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${categories[selectedProject.category]?.color}`}>
                    {selectedProject.highlightKeyword}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-slate-300 text-lg">{selectedProject.description}</p>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-purple-400">Key Features</h3>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></span>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-purple-400">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg border border-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                  <Github className="w-5 h-5" />
                  View Code
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-medium transition-all">
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}