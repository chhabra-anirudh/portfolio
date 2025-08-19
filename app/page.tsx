"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Award,
  Code,
  Briefcase,
  GraduationCap,
  User,
  ArrowUp,
  ChevronDown,
  Sparkles,
} from "lucide-react"
import { useEffect, useState } from "react"

import { ThemeToggle } from "@/components/theme-toggle"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "education", "skills", "experience", "projects", "leadership", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }

      setShowScrollTop(window.scrollY > 400)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)] animate-pulse" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(34,197,94,0.05),transparent_50%)]"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="font-bold text-xl text-primary cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => scrollToTop()}
            >
              Anirudh Chhabra
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: "about", label: "About" },
                { id: "education", label: "Education" },
                { id: "skills", label: "Skills" },
                { id: "experience", label: "Experience" },
                { id: "projects", label: "Projects" },
                { id: "leadership", label: "Leadership" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-all duration-300 hover:text-primary relative group ${
                    activeSection === item.id ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full animate-in slide-in-from-left duration-300" />
                  )}
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </button>
              ))}
              <ThemeToggle />
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {[
                  { id: "about", label: "About" },
                  { id: "education", label: "Education" },
                  { id: "skills", label: "Skills" },
                  { id: "experience", label: "Experience" },
                  { id: "projects", label: "Projects" },
                  { id: "leadership", label: "Leadership" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 relative ${
                      activeSection === item.id
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-accent/50"
                    }`}
                  >
                    {activeSection === item.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                    )}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/3 rounded-full blur-2xl animate-pulse delay-1000" />

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center">
            <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Sparkles className="w-8 h-8 mx-auto text-primary mb-4 animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Hi, I'm{" "}
              <span className="text-primary bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent animate-pulse">
                Anirudh
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Computer Science student at University of Waterloo specializing in{" "}
              <span className="text-primary font-medium">AI/ML research</span>, diffusion models, and full-stack
              development
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
              <Badge
                variant="secondary"
                className="text-sm px-4 py-2 hover:scale-105 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                2A Term - UWaterloo CS
              </Badge>
              <Badge
                variant="secondary"
                className="text-sm px-4 py-2 hover:scale-105 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Code className="w-4 h-4 mr-2" />
                AI/ML Research
              </Badge>
              <Badge
                variant="secondary"
                className="text-sm px-4 py-2 hover:scale-105 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Co-op Experience
              </Badge>
              <Badge
                variant="secondary"
                className="text-sm px-4 py-2 hover:scale-105 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Award className="w-4 h-4 mr-2" />
                Multiple Scholarships
              </Badge>
            </div>
            <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600">
              <Button
                asChild
                size="lg"
                className="hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <button onClick={() => scrollToSection("contact")}>
                  <Mail className="w-4 h-4 mr-2" />
                  Get In Touch
                </button>
              </Button>
              <Button
                variant="secondary"
                asChild
                size="lg"
                className="hover:scale-105 transition-all duration-300 hover:bg-emerald-600 hover:text-white shadow-lg hover:shadow-xl"
              >
                <a href="https://github.com/chhabra-anirudh" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="secondary"
                asChild
                size="lg"
                className="hover:scale-105 transition-all duration-300 hover:bg-emerald-600 hover:text-white shadow-lg hover:shadow-xl"
              >
                <a href="https://linkedin.com/in/anirudh-chhabra-cs" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>
            <div className="mt-16 animate-bounce">
              <ChevronDown
                className="w-6 h-6 mx-auto text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={() => scrollToSection("about")}
                aria-label="Scroll down to About section"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_49%,rgba(34,197,94,0.1)_50%,transparent_51%)] bg-[length:20px_20px]" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I'm a passionate Computer Science student with a focus on AI/ML research and practical software
              development. Currently pursuing my Bachelor's degree at the University of Waterloo with hands-on co-op
              experience and active involvement in cutting-edge research projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-l-primary group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                  <User className="w-5 h-5 text-primary" />
                  Personal Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>Waterloo, Ontario</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:anirudhbuilds@gmail.com" className="hover:text-primary transition-colors">
                    anirudhbuilds@gmail.com
                  </a>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    asChild
                    className="hover:bg-emerald-600 hover:text-white transition-all duration-300 hover:scale-105"
                  >
                    <a href="https://linkedin.com/in/anirudh-chhabra-cs" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-1" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    asChild
                    className="hover:bg-emerald-600 hover:text-white transition-all duration-300 hover:scale-105"
                  >
                    <a href="https://github.com/chhabra-anirudh" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-1" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-l-primary group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Award className="w-5 h-5 text-primary" />
                  Key Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-3 text-base">
                  {[
                    "Governor General's Academic Bronze Medal",
                    "UW President's Scholarship of Distinction",
                    "Selected for competitive UR2PhD Research Program",
                    "Multiple merit-based scholarships and awards",
                    "Active contributor to UW Computer Science Club",
                  ].map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2 group/item">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 group-hover/item:bg-primary/80 transition-all duration-300"></div>
                      <span className="group-hover/item:text-primary transition-colors duration-300">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Education</h2>
            <p className="text-lg text-muted-foreground">
              Academic foundation in Computer Science with focus on algorithms and mathematics
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-l-primary group">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src="/uw-seal.png"
                        alt="University of Waterloo"
                        className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        Bachelor's degree, Computer Science (Honours with Co-op)
                      </CardTitle>
                      <CardDescription className="text-base mt-2 text-muted-foreground group-hover:text-primary transition-colors">
                        University of Waterloo
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-sm self-start sm:self-auto">
                    Sep 2024 – Apr 2029
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Current Standing</h4>
                    <p className="text-muted-foreground">2A Term (Fall 2025)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Selected Coursework</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors hover:scale-105"
                      >
                        Data Structures & Algorithms
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors hover:scale-105"
                      >
                        Object-Oriented Programming
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors hover:scale-105"
                      >
                        Probability
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors hover:scale-105"
                      >
                        Calculus II
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors hover:scale-105"
                      >
                        Linear Algebra
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors hover:scale-105"
                      >
                        Mechanics
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Technical Skills</h2>
            <p className="text-lg text-muted-foreground">Technologies and tools I work with</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Languages",
                skills: ["Python", "C/C++", "Java", "JavaScript", "Dart", "HTML", "CSS", "Bash"],
              },
              {
                title: "Frameworks & Libraries",
                skills: ["React", "Flutter", "Django", "Express", "Bootstrap", "Firebase"],
              },
              {
                title: "Developer Tools",
                skills: ["Git", "VS Code", "IntelliJ", "PyCharm", "Docker", "Niagara Workbench"],
              },
              {
                title: "Databases & Design",
                skills: ["PostgreSQL", "MongoDB", "Firebase Firestore", "REST APIs", "Figma", "Canva"],
              },
            ].map((category, index) => (
              <Card
                key={category.title}
                className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-l-primary group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${index * 100 + skillIndex * 50}ms` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Experience</h2>
            <p className="text-lg text-muted-foreground">
              Research, co-op positions, and professional roles that have shaped my journey
            </p>
          </div>

          <div className="space-y-8">
            {/* Research Experience */}
            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-l-primary group">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src="/uw-seal-neutral.png"
                        alt="University of Waterloo"
                        className="h-16 w-auto group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        Undergraduate Researcher - UR2PhD Program
                      </CardTitle>
                      <CardDescription className="text-base mt-1 text-muted-foreground group-hover:text-primary transition-colors">
                        University of Waterloo - Early Research Experience (CS 399)
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="self-start sm:self-auto">
                    Sep 2025 – Dec 2025
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2 group/item">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                    <span>
                      Selected for competitive research on diffusion acceleration for image/video generation models
                    </span>
                  </li>
                  <li className="flex items-start gap-2 group/item">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                    <span>
                      Prototyping system optimizations to reduce generative model inference time via caching and sparse
                      computation
                    </span>
                  </li>
                  <li className="flex items-start gap-2 group/item">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                    <span>
                      Conducting benchmarking and literature review to evaluate scalability across multimodal datasets
                    </span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-6">
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    AI/ML
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Diffusion Models
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Computer Vision
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Research
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Performance Optimization
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Co-op Experience */}
            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-l-primary group">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src="/uw-seal-neutral.png"
                        alt="University of Waterloo"
                        className="h-16 w-auto group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        Frontend Graphics Designer - Co-op
                      </CardTitle>
                      <CardDescription className="text-base mt-1 text-muted-foreground group-hover:text-primary transition-colors">
                        University of Waterloo - Plant Operations
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="self-start sm:self-auto">
                    May 2025 – August 2025
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2 group/item">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                    <span>
                      Modernized BAS graphics for 20+ buildings using Niagara Tridium, BQL, and NEQL for real-time data integration
                    </span>
                  </li>
                  <li className="flex items-start gap-2 group/item">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                    <span>
                      Created interactive, UX-optimized dashboards for HVAC, AHU, and Chiller systems, improving
                      operator efficiency
                    </span>
                  </li>
                  <li className="flex items-start gap-2 group/item">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                    <span>Researched and proposed automation workflows to cut deployment time by 30%</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-6">
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Niagara Tridium
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    BQL/NEQL
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    UX Design
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Building Automation
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Data Visualization
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Web Designer */}
            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-l-primary group">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src="/uw-cs-club-logo.webp"
                        alt="UW Computer Science Club"
                        className="h-16 w-auto group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">Web Designer</CardTitle>
                      <CardDescription className="text-base mt-1 text-muted-foreground group-hover:text-primary transition-colors">
                        UW Computer Science Club
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="self-start sm:self-auto">
                    May 2025 – Present
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2 group/item">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                    <span>
                      Designed Class Profile website for 2025 graduates with responsive layouts and accessible UI via
                      Figma
                    </span>
                  </li>
                  <li className="flex items-start gap-2 group/item">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                    <span>
                      Improved accessibility and branding consistency for a high-traffic student-facing resource
                    </span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-6">
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Figma
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Web Design
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Accessibility
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    UI/UX
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Featured Projects</h2>
            <p className="text-lg text-muted-foreground">A showcase of my technical projects and development work</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AlgoPlayground",
                description:
                  "Interactive platform for visualizing and testing sorting, graph, and search algorithms with real-time animations.",
                tech: ["React", "Node.js", "Express", "MongoDB"],
                status: "in-progress",
                highlights: ["Sub-200ms render times", "Real-time animations", "Algorithm execution API"],
                github: "#",
              },
              {
                title: "TaskFlow",
                description: "Full-stack task management app with JWT authentication, tagging, and deadline reminders.",
                tech: ["Django", "PostgreSQL", "Docker"],
                status: "in-progress",
                highlights: ["CI/CD pipeline", "95% unit test coverage", "Containerized deployment"],
                github: "#",
              },
              {
                title: "Portfolio Website",
                description:
                  "Modern, responsive portfolio website built with Next.js featuring dark/light themes, smooth animations, and mobile-optimized navigation.",
                tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
                status: "live",
                highlights: ["Dark/light theme toggle", "Mobile-responsive design", "Smooth scroll animations"],
                github: "https://github.com/chhabra-anirudh/portfolio",
              },
              {
                title: "Space Game",
                description:
                  "Interactive arcade game with directional shooting, health tracking, and collision mechanics.",
                tech: ["Python", "Turtle"],
                status: "completed",
                highlights: ["Projectile logic", "Collision detection", "Real-time UI updates"],
                github: "https://github.com/chhabra-anirudh/Space-Game-Python",
              },
              {
                title: "Snake Game",
                description:
                  "Classic Snake game with increasing difficulty, speed progression, and real-time scoreboard.",
                tech: ["Python", "Turtle"],
                status: "completed",
                highlights: ["Game loops", "Collision detection", "High score tracking"],
                github: "https://github.com/chhabra-anirudh/Snake-Game-Python",
              },
              {
                title: "AccessTray",
                description:
                  "Community impact project designing custom removable tray for wheelchair-bound user workplace access.",
                tech: ["Design", "Prototyping"],
                status: "completed",
                highlights: ["Community impact", "Collaborative design", "Accessibility focus"],
                github: "#",
              },
            ].map((project, index) => (
              <Card
                key={project.title}
                className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-l-primary group relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.title}
                        <div
                          className={`w-2 h-2 rounded-full ${
                            project.status === "live"
                              ? "bg-green-500"
                              : project.status === "in-progress"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                      </CardTitle>
                      <CardDescription className="text-sm mt-2 leading-relaxed">{project.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-primary">Key Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project.github !== "#" && (
                      <Button
                        variant="secondary"
                        size="sm"
                        asChild
                        className="w-full hover:bg-emerald-600 hover:text-white transition-all duration-300 hover:scale-105"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Volunteerism Section */}
      <section id="leadership" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Leadership & Volunteerism</h2>
            <p className="text-lg text-muted-foreground">
              Community involvement and leadership roles that drive positive impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-l-primary group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      Faculty of Mathematics Ambassador
                    </CardTitle>
                    <CardDescription className="text-base mt-1 text-muted-foreground group-hover:text-primary transition-colors">
                      University of Waterloo
                    </CardDescription>
                  </div>
                  <Badge variant="outline">Sep 2025 – Aug 2026</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2 group/item">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                    <span>Mentoring incoming students and assisting with faculty outreach initiatives</span>
                  </li>
                  <li className="flex items-start gap-2 group/item">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                    <span>Supporting campus events and student engagement programs</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-6">
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Leadership
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Mentoring
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Student Engagement
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-l-primary group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      Hospital Volunteer
                    </CardTitle>
                    <CardDescription className="text-base mt-1 text-muted-foreground group-hover:text-primary transition-colors">
                      Thompson General Hospital - Auxiliary/Gift Shop
                    </CardDescription>
                  </div>
                  <Badge variant="outline">Jun 2023 – Aug 2024</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2 group/item">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                    <span>
                      Managed shop operations and assisted diverse visitors, including individuals with disabilities
                    </span>
                  </li>
                  <li className="flex items-start gap-2 group/item">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                    <span>Contributed to raising $35K+ for hospital and community projects</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-6">
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Community Service
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Healthcare Support
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">
                    Fundraising
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">Let's connect and explore opportunities together</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-l-primary group">
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <a
                  href="mailto:anirudhbuilds@gmail.com"
                  className="flex items-center gap-4 group/item hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary group-hover/item:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground group-hover/item:text-primary transition-colors">
                      anirudhbuilds@gmail.com
                    </p>
                  </div>
                </a>
                <a
                  href="https://github.com/chhabra-anirudh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group/item hover:text-primary transition-colors"
                >
                  <Github className="w-5 h-5 text-primary group-hover/item:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-muted-foreground group-hover/item:text-primary transition-colors">
                      github.com/chhabra-anirudh
                    </p>
                  </div>
                </a>
                <a
                  href="https://linkedin.com/in/anirudh-chhabra-cs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group/item hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-primary group-hover/item:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-muted-foreground group-hover/item:text-primary transition-colors">
                      linkedin.com/in/anirudh-chhabra-cs
                    </p>
                  </div>
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-l-primary group">
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">Let's Connect</CardTitle>
                <CardDescription className="text-muted-foreground group-hover:text-primary transition-colors">
                  I'm interested in co-op opportunities, research collaborations, and tech discussions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                    <h4 className="font-medium mb-3 text-primary">Currently Looking For:</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Summer 2026 Co-op opportunities
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        AI/ML research collaborations
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Full-stack development projects
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Open source contributions
                      </li>
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild className="flex-1 hover:scale-105 transition-transform shadow-lg hover:shadow-xl">
                      <a href="mailto:anirudhbuilds@gmail.com">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </a>
                    </Button>
                    <Button
                      variant="secondary"
                      asChild
                      className="hover:scale-105 transition-transform hover:bg-emerald-600 hover:text-white shadow-lg hover:shadow-xl"
                    >
                      <a href="https://linkedin.com/in/anirudh-chhabra-cs" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 animate-in slide-in-from-bottom duration-500"
          size="icon"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}

      {/* Footer */}
      <footer className="bg-muted/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">© 2025 Anirudh Chhabra. Built with Next.js and Tailwind CSS.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a
              href="https://github.com/chhabra-anirudh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/anirudh-chhabra-cs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:anirudhbuilds@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
