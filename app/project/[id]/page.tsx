"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, ExternalLink, Github, Layers, Tag, Check } from "lucide-react"
import { portfolioItems, type PortfolioItem } from "@/lib/portfolio-data"

export default function ProjectDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<PortfolioItem | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Memoize related projects calculation
  const relatedProjects = useMemo(() => {
    if (!project) return []
    return portfolioItems
      .filter((item) => item.category === project.category && item.id !== project.id)
      .slice(0, 3)
  }, [project])

  useEffect(() => {
    const foundProject = portfolioItems.find((item) => item.id === params.id)

    if (foundProject) {
      setProject(foundProject)
      // Trigger entrance animation
      requestAnimationFrame(() => setIsLoaded(true))
    } else {
      router.push("/")
    }
  }, [params.id, router])

  const categoryConfig = useMemo(() => ({
    backend: {
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      accent: "emerald",
      textGlow: "text-emerald-100"
    },
    mobile: {
      gradient: "from-purple-500 via-violet-500 to-indigo-600",
      accent: "purple",
      textGlow: "text-purple-100"
    },
    frontend: {
      gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
      accent: "rose",
      textGlow: "text-rose-100"
    },
    nocode: {
      gradient: "from-amber-500 via-orange-500 to-red-600",
      accent: "amber",
      textGlow: "text-amber-100"
    },
    api: {
      gradient: "from-cyan-500 via-blue-500 to-indigo-600",
      accent: "cyan",
      textGlow: "text-cyan-100"
    }
  }), [])

  const config = project ? categoryConfig[project.category as keyof typeof categoryConfig] || categoryConfig.backend : categoryConfig.backend

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
          <p className="text-xl text-gray-600 font-medium">Loading project details...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Dynamic Hero Section */}
      <div className={`relative bg-gradient-to-br ${config.gradient} overflow-hidden`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Floating Gradient Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className={`flex flex-col md:flex-row items-start gap-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Content Section */}
            <div className="w-full md:w-1/2 space-y-6">
              <Link 
                href="/" 
                className="inline-flex items-center text-white/90 hover:text-white hover:gap-3 gap-2 transition-all duration-300 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Portfolio</span>
              </Link>

              <div>
                <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${config.textGlow} leading-tight`}>
                  {project.title}
                </h1>
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
                  <Tag className="mr-2 h-4 w-4" />
                  <span className="capitalize">{project.category}</span>
                </div>
              </div>

              <p className="text-lg md:text-xl text-white/95 leading-relaxed font-light">
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-white/15 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 hover:bg-white/25 transition-all duration-300 hover:scale-105 cursor-default shadow-lg"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-white text-gray-900 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group"
                  >
                    <ExternalLink className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Live Demo
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gray-900/90 backdrop-blur-sm text-white hover:bg-gray-900 px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border border-white/10 group"
                  >
                    <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Source Code
                  </a>
                )}
              </div>
            </div>

            {/* Image Section */}
            <div className={`w-full md:w-1/2 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group border-4 border-white/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Project Overview
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="text-lg">
                  This {project.category} project demonstrates expertise in <span className="font-semibold text-gray-900">{project.technologies.join(", ")}</span>.
                  {project.longDescription || ` The ${project.title} was designed to provide a robust solution that meets modern development standards and user expectations.`}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Check className={`h-6 w-6 text-${config.accent}-600`} />
                Key Features
              </h3>
              <ul className="space-y-4">
                {[
                  `Feature-rich ${project.category} implementation`,
                  `Built with ${project.technologies.slice(0, 2).join(" and ")}`,
                  "Responsive and user-friendly design",
                  "Optimized for performance and scalability",
                  ...(project.features || [])
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className={`mt-1 h-6 w-6 rounded-full bg-${config.accent}-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Check className={`h-4 w-4 text-${config.accent}-600`} />
                    </div>
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Development Process */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-6">Development Process</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                The development of this project involved careful planning and implementation to ensure that all
                requirements were met while maintaining code quality and performance.
                {project.process || ""}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Project Info
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className={`p-3 rounded-lg bg-${config.accent}-100`}>
                      <Calendar className={`h-6 w-6 text-${config.accent}-600`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">Completion Date</p>
                      <p className="text-gray-600">{project.completionDate || "2023"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className={`p-3 rounded-lg bg-${config.accent}-100`}>
                      <Layers className={`h-6 w-6 text-${config.accent}-600`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">Project Type</p>
                      <p className="text-gray-600 capitalize">{project.category}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className={`p-3 rounded-lg bg-${config.accent}-100`}>
                      <Tag className={`h-6 w-6 text-${config.accent}-600`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">Technologies</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{project.technologies.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Related Projects
              </h2>
              <p className="text-gray-600 text-lg">Explore more projects in the same category</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <Link
                  key={relatedProject.id}
                  href={`/project/${relatedProject.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={relatedProject.image || "/placeholder.svg"}
                      alt={relatedProject.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className={`absolute top-4 left-4 text-white px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${categoryConfig[relatedProject.category as keyof typeof categoryConfig]?.gradient || categoryConfig.backend.gradient} shadow-lg`}>
                      {relatedProject.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 group-hover:bg-clip-text transition-all">
                      {relatedProject.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 leading-relaxed">
                      {relatedProject.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </main>
  )
}