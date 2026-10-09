import React, { useState, useEffect } from 'react';
import PortraitCanvas from './components/PortraitCanvas';
import { 
  ArrowRight, 
  ArrowUpRight, 
  GraduationCap, 
  Code2, 
  Briefcase, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  ExternalLink,
  Sparkles,
  Smartphone,
  Globe,
  Cpu,
  Wrench,
  CheckCircle2,
  Linkedin,
  Github,
  Brain,
  Zap,
  Users,
  Clock,
  Lightbulb,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clean 6-item Menu Bar
  const navItems = [
    { id: 'hero', label: 'Hero' },
    { id: 'objective', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'internships', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  const linkedinUrl = "https://www.linkedin.com/in/sridhar-babu-865160357/?isSelfProfile=true";
  const githubUrl = "https://github.com/Sridhar052";

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('bsridhar052@gmail.com');
    setCopied(true);
    triggerToast('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    triggerToast(`Thank you ${formData.name}! Your message has been sent.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#EAE4D7] font-sans selection:bg-[#EAE4D7] selection:text-black scroll-smooth overflow-x-hidden">
      
      {/* Top Header Navigation (Responsive with Mobile Drawer) */}
      <header className="fixed top-0 left-0 w-full h-[70px] px-4 sm:px-8 md:px-12 flex items-center justify-between z-50 bg-[#121212]/95 backdrop-blur-md border-b border-white/5">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <span className="w-2.5 h-2.5 bg-[#EAE4D7] rounded-full shadow-[0_0_10px_rgba(234,228,215,0.4)]" />
          <span className="font-bebas text-2xl tracking-wider text-[#EAE4D7]">SRIDHAR</span>
        </div>

        {/* Desktop Menu Bar (Pill Container) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3.5 lg:px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === item.id 
                  ? 'bg-[#EAE4D7] text-black font-semibold shadow-md' 
                  : 'text-[#AAA498] hover:text-[#EAE4D7] hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons & Mobile Hamburger Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-white/15 text-[#EAE4D7] hover:bg-white/10 transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full border border-white/15 text-[#EAE4D7] hover:bg-white/10 transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden sm:flex items-center gap-1.5 bg-[#EAE4D7] text-black px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-white hover:shadow-lg transition-all"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-[#EAE4D7]"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed top-[70px] left-0 w-full bg-[#1A1918] border-b border-white/10 shadow-2xl p-6 z-40 md:hidden flex flex-col gap-3 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeSection === item.id 
                  ? 'bg-[#EAE4D7] text-black font-semibold' 
                  : 'text-[#AAA498] hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full mt-2 flex items-center justify-center gap-2 bg-[#EAE4D7] text-black py-2.5 rounded-xl text-xs font-semibold"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="pt-[70px] px-3 sm:px-6 md:px-10 max-w-[1400px] mx-auto space-y-12 sm:space-y-16 py-8 sm:py-12">

        {/* SECTION 1: HERO */}
        <section id="hero" className="min-h-[calc(100vh-100px)] flex items-center">
          <div className="w-full deck-card-frame rounded-2xl sm:rounded-[28px] p-5 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden relative">
            <div className="flex flex-wrap items-center justify-between z-10 mb-4 gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#AAA498]">Creative Presentation</span>
              <div className="flex items-center gap-3">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#EAE4D7] hover:underline flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" /> Github
                </a>
                <span className="text-xs text-[#AAA498]">•</span>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#EAE4D7] hover:underline flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 my-auto">
              <div className="lg:col-span-7 flex flex-col justify-center gap-4 sm:gap-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-max text-xs text-[#EAE4D7]">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Fresher • B.Tech IT (2023-2027)</span>
                </div>

                <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl leading-none tracking-wider text-[#EAE4D7]">
                  B SRIDHAR <br />
                  <span className="text-[#EAE4D7]/90">PORTFOLIO</span>
                </h1>

                <p className="text-[#AAA498] text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
                  Aspiring Information Technology graduate specializing in React, Tailwind CSS, Java, and Flutter. Passionate about crafting user-friendly mobile and web applications with clean architecture and modern aesthetic.
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-[#AAA498] pt-1">
                  <span className="text-[#EAE4D7] font-semibold text-sm">B. Sridhar</span>
                  <span>•</span>
                  <span>CGPA: 8.27</span>
                  <span>•</span>
                  <span className="hidden sm:inline">Adhiparasakthi Eng. College</span>
                  <span className="sm:hidden">APEC</span>
                </div>
              </div>

              <div className="lg:col-span-5 flex items-end justify-center relative min-h-[300px] sm:min-h-[380px]">
                <PortraitCanvas />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: OBJECTIVE / ABOUT */}
        <section id="objective" className="scroll-mt-24">
          <div className="w-full deck-card-frame rounded-2xl sm:rounded-[28px] p-5 sm:p-8 md:p-12">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#AAA498]">01 / Career Objective</span>
              <span className="text-xs font-mono text-[#AAA498] hidden sm:inline">Professional Summary</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl leading-tight mb-4">
                  BUILDING THE FUTURE WITH <br />
                  <span className="text-[#AAA498]">CODE & PASSION</span>
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-[#AAA498] leading-relaxed mb-6">
                  Aspiring Information Technology graduate with a passion for software development and modern web technologies. Seeking an opportunity to apply my technical knowledge, develop innovative and user-friendly applications, continuously enhance my skills and grow as a software developer while contributing to the company's success.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">React + Tailwind</span>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">Java Spring Boot</span>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">Flutter & Dart</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <Code2 className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-semibold text-sm sm:text-base">Full Stack Ambition</h3>
                  </div>
                  <p className="text-xs text-[#AAA498]">Building scalable Java backends and modern responsive front-end interfaces with React and Tailwind CSS.</p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone className="w-5 h-5 text-blue-400" />
                    <h3 className="font-semibold text-sm sm:text-base">Mobile UI Engineering</h3>
                  </div>
                  <p className="text-xs text-[#AAA498]">Crafting sleek cross-platform mobile apps for admission systems using Flutter & Dart.</p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <Cpu className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-semibold text-sm sm:text-base">Continuous Learning</h3>
                  </div>
                  <p className="text-xs text-[#AAA498]">Exploring Oracle Cloud Infrastructure (OCI) and AI developer tooling to boost workflow speed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: EDUCATION */}
        <section id="education" className="scroll-mt-24">
          <div className="w-full deck-card-frame rounded-2xl sm:rounded-[28px] p-5 sm:p-8 md:p-12">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#AAA498]">02 / Academic Background</span>
              <span className="text-xs font-mono text-[#AAA498] hidden sm:inline">Qualifications</span>
            </div>

            <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8">EDUCATIONAL MILESTONES</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* B.Tech */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group hover:border-[#EAE4D7]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-[#EAE4D7]" />
                    <span className="px-3 py-1 rounded-full bg-[#EAE4D7]/10 text-xs text-[#EAE4D7] font-mono">2023 - 2027</span>
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1">B.Tech - Information Technology</h3>
                  <p className="text-xs text-[#AAA498] mb-4">Adhiparasakthi Engineering College (APEC)</p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#6E685E]">Grade Performance</span>
                  <span className="font-bebas text-xl sm:text-2xl text-[#EAE4D7]">CGPA 8.27</span>
                </div>
              </div>

              {/* 12th Grade */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group hover:border-[#EAE4D7]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <Award className="w-7 h-7 sm:w-8 sm:h-8 text-[#AAA498]" />
                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-[#AAA498] font-mono">2022 - 2023</span>
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1">HSC / 12th Grade</h3>
                  <p className="text-xs text-[#AAA498] mb-4">Govt High School Thozhupedu</p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#6E685E]">Percentage</span>
                  <span className="font-bebas text-xl sm:text-2xl text-[#EAE4D7]">76% Marks</span>
                </div>
              </div>

              {/* 10th Grade */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group hover:border-[#EAE4D7]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <Award className="w-7 h-7 sm:w-8 sm:h-8 text-[#AAA498]" />
                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-[#AAA498] font-mono">2020 - 2021</span>
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1">SSLC / 10th Grade</h3>
                  <p className="text-xs text-[#AAA498] mb-4">Govt Higher Secondary School Sirumailur</p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#6E685E]">Percentage</span>
                  <span className="font-bebas text-xl sm:text-2xl text-[#EAE4D7]">75% Marks</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: PROJECTS */}
        <section id="projects" className="scroll-mt-24">
          <div className="w-full deck-card-frame rounded-2xl sm:rounded-[28px] p-5 sm:p-8 md:p-12">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#AAA498]">03 / Featured Projects</span>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#EAE4D7] hover:underline flex items-center gap-1">
                GitHub <Github className="w-3.5 h-3.5" />
              </a>
            </div>

            <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8">BUILD & SHOWCASE</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Project 1 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono">Mobile App</span>
                    <Smartphone className="w-5 h-5 text-[#AAA498]" />
                  </div>
                  <h3 className="font-semibold text-lg sm:text-xl mb-2">Admission Management System</h3>
                  <p className="text-xs text-[#AAA498] leading-relaxed mb-4">
                    Designed and developed mobile application UI screens for the student admission process. Created registration forms, course selection pages, and validation screens using Flutter & Dart.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10 flex-wrap gap-2">
                  <div className="flex gap-1.5 text-xs text-[#6E685E]">
                    <span className="bg-white/5 px-2 py-0.5 rounded">Flutter</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded">Dart</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded">UI/UX</span>
                  </div>
                  <button
                    onClick={() => setSelectedProject({
                      title: "Mobile App Front-End - Admission Management System",
                      tech: ["Flutter", "Dart", "VS Code", "UI/UX"],
                      github: githubUrl,
                      details: [
                        "Designed mobile application UI screens for student admission workflow.",
                        "Created student registration forms, course selection pages, and form validation logic.",
                        "Developed responsive mobile layouts using Visual Studio Code."
                      ]
                    })}
                    className="text-xs text-[#EAE4D7] hover:underline flex items-center gap-1 font-semibold"
                  >
                    View Details <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Project 2 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">Web Application</span>
                    <Globe className="w-5 h-5 text-[#AAA498]" />
                  </div>
                  <h3 className="font-semibold text-lg sm:text-xl mb-2">Student Management Web App</h3>
                  <p className="text-xs text-[#AAA498] leading-relaxed mb-4">
                    Developed a modern web application to manage student information efficiently. Built with React and Tailwind CSS featuring clean responsive UI and intuitive user navigation.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10 flex-wrap gap-2">
                  <div className="flex gap-1.5 text-xs text-[#6E685E]">
                    <span className="bg-white/5 px-2 py-0.5 rounded">React</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded">Tailwind</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded">JS</span>
                  </div>
                  <button
                    onClick={() => setSelectedProject({
                      title: "Student Management Web Application",
                      tech: ["React", "Tailwind CSS", "JavaScript", "HTML5"],
                      github: githubUrl,
                      details: [
                        "Developed a web application to manage student information efficiently.",
                        "Designed responsive user interfaces for enhanced usability.",
                        "Focused on clean UI aesthetics and smooth state management."
                      ]
                    })}
                    className="text-xs text-[#EAE4D7] hover:underline flex items-center gap-1 font-semibold"
                  >
                    View Details <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: SKILLS */}
        <section id="skills" className="scroll-mt-24">
          <div className="w-full deck-card-frame rounded-2xl sm:rounded-[28px] p-5 sm:p-8 md:p-12">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#AAA498]">04 / Technical & Soft Skills</span>
              <span className="text-xs font-mono text-[#AAA498] hidden sm:inline">Core Capabilities</span>
            </div>

            <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8">SKILLS & COMPETENCIES</h2>

            {/* Technical Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {/* Category 1 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4 text-yellow-400">
                    <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    <h3 className="font-semibold text-base sm:text-lg text-[#EAE4D7]">Languages & Frameworks</h3>
                  </div>
                  <ul className="space-y-2.5 text-xs text-[#AAA498]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>React & Tailwind CSS</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Java (Spring Boot)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Flutter & Dart</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>HTML5, CSS3, JavaScript (ES6+)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Category 2 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4 text-blue-400">
                    <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
                    <h3 className="font-semibold text-base sm:text-lg text-[#EAE4D7]">UI/UX Designing</h3>
                  </div>
                  <ul className="space-y-2.5 text-xs text-[#AAA498]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Figma Design Systems</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Canva Visual Assets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Mobile App Wireframing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>User-Centric Prototyping</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Category 3 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
                <div>
                  <div className="flex items-center gap-3 mb-4 text-emerald-400">
                    <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />
                    <h3 className="font-semibold text-base sm:text-lg text-[#EAE4D7]">Tools & Environment</h3>
                  </div>
                  <ul className="space-y-2.5 text-xs text-[#AAA498]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>AI Tools & Developer Agents</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>VS Code & IntelliJ IDEA</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Git & GitHub Workflows</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>RESTful API Integration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Soft Skills Section */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="font-bebas text-xl sm:text-2xl text-[#EAE4D7] mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                SOFT SKILLS & PERSONAL ATTRIBUTES
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center hover:border-purple-400/40 transition-all">
                  <Brain className="w-6 h-6 text-purple-400 mb-2" />
                  <span className="font-semibold text-xs text-[#EAE4D7] mb-1">Problem Solving</span>
                  <span className="text-[11px] text-[#AAA498]">Analytical mindset for resolving complex logic</span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center hover:border-yellow-400/40 transition-all">
                  <Zap className="w-6 h-6 text-yellow-400 mb-2" />
                  <span className="font-semibold text-xs text-[#EAE4D7] mb-1">Quick Learner</span>
                  <span className="text-[11px] text-[#AAA498]">Fast adaptation to new stacks & frameworks</span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center hover:border-blue-400/40 transition-all">
                  <Users className="w-6 h-6 text-blue-400 mb-2" />
                  <span className="font-semibold text-xs text-[#EAE4D7] mb-1">Team Collaboration</span>
                  <span className="text-[11px] text-[#AAA498]">Effective communication & Git team workflows</span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center hover:border-emerald-400/40 transition-all">
                  <Lightbulb className="w-6 h-6 text-emerald-400 mb-2" />
                  <span className="font-semibold text-xs text-[#EAE4D7] mb-1">Adaptability</span>
                  <span className="text-[11px] text-[#AAA498]">Thrives in fast-paced software environments</span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center sm:col-span-2 md:col-span-1 hover:border-red-400/40 transition-all">
                  <Clock className="w-6 h-6 text-red-400 mb-2" />
                  <span className="font-semibold text-xs text-[#EAE4D7] mb-1">Time Management</span>
                  <span className="text-[11px] text-[#AAA498]">Detail-oriented & deadline driven</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: INTERNSHIPS / EXPERIENCE */}
        <section id="internships" className="scroll-mt-24">
          <div className="w-full deck-card-frame rounded-2xl sm:rounded-[28px] p-5 sm:p-8 md:p-12">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#AAA498]">05 / Practical Experience</span>
              <span className="text-xs font-mono text-[#AAA498] hidden sm:inline">Work Experience</span>
            </div>

            <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8">INTERNSHIP EXPERIENCE</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
              {/* Internship 1 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl mb-1">Java Full Stack Intern</h3>
                    <span className="text-xs font-mono text-yellow-400">TVK Technologies</span>
                  </div>
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[#AAA498]" />
                </div>
                <ul className="text-xs text-[#AAA498] space-y-2 list-disc list-inside leading-relaxed">
                  <li>Gained hands-on practical experience in Java-based web application development.</li>
                  <li>Improved understanding of full stack application architecture and database integration.</li>
                  <li>Collaborated with team members to deliver clean, efficient code implementations.</li>
                </ul>
              </div>

              {/* Internship 2 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl mb-1">Full Stack Intern</h3>
                    <span className="text-xs font-mono text-blue-400">INEX AI</span>
                  </div>
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[#AAA498]" />
                </div>
                <ul className="text-xs text-[#AAA498] space-y-2 list-disc list-inside leading-relaxed">
                  <li>Developed responsive web applications using modern front-end and back-end technologies.</li>
                  <li>Built cross-platform mobile application prototypes using Flutter and Dart.</li>
                  <li>Designed intuitive user interface components for seamless mobile user experience.</li>
                </ul>
              </div>
            </div>

            {/* Certifications Sub-Section */}
            <div className="pt-6 sm:pt-8 border-t border-white/10">
              <h3 className="font-bebas text-2xl sm:text-3xl mb-4 sm:mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                VERIFIED CERTIFICATIONS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-yellow-400/10 text-yellow-400 shrink-0">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base mb-1">Java Certification</h4>
                    <span className="text-xs font-mono text-[#EAE4D7] block mb-1 sm:mb-2">HCL Career Craft Academy</span>
                    <p className="text-xs text-[#AAA498] leading-relaxed mb-2">Mastered Core Java concepts, OOP principles, and data structures problem solving.</p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Completion
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-red-400/10 text-red-400 shrink-0">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base mb-1">Oracle Cloud Infrastructure (OCI)</h4>
                    <span className="text-xs font-mono text-[#EAE4D7] block mb-1 sm:mb-2">Oracle Cloud Certification</span>
                    <p className="text-xs text-[#AAA498] leading-relaxed mb-2">Comprehensive knowledge of OCI cloud fundamentals, architecture & security.</p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Completion
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CONTACT */}
        <section id="contact" className="scroll-mt-24">
          <div className="w-full deck-card-frame rounded-2xl sm:rounded-[28px] p-5 sm:p-8 md:p-12">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#AAA498]">06 / Get In Touch</span>
              <span className="text-xs font-mono text-[#AAA498] hidden sm:inline">Reach Out</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Contact Info Left */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div>
                  <h2 className="font-bebas text-4xl sm:text-5xl mb-3">LET'S WORK <br /><span className="text-[#AAA498]">TOGETHER</span></h2>
                  <p className="text-xs sm:text-sm text-[#AAA498] leading-relaxed">
                    Have a position opening, a freelance project, or an opportunity for a passionate fresher software developer? Feel free to contact me directly!
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4 text-xs text-[#AAA498]">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <Phone className="w-5 h-5 text-[#EAE4D7] shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#6E685E] block uppercase font-mono">Phone</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#EAE4D7]">+91 8056524534</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                    <Mail className="w-5 h-5 text-[#EAE4D7] shrink-0" />
                    <div className="flex-grow min-w-0">
                      <span className="text-[10px] text-[#6E685E] block uppercase font-mono">Email</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#EAE4D7] truncate block">bsridhar052@gmail.com</span>
                    </div>
                    <button onClick={copyEmail} className="p-2 hover:text-white shrink-0" title="Copy Email">
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#AAA498]" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <MapPin className="w-5 h-5 text-[#EAE4D7] shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#6E685E] block uppercase font-mono">Location</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#EAE4D7]">Chengalpattu, Tamil Nadu, India</span>
                    </div>
                  </div>

                  {/* Social Profiles */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#EAE4D7] hover:bg-white/10 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <span>LinkedIn Profile</span>
                    </a>
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#EAE4D7] hover:bg-white/10 transition-colors"
                    >
                      <Github className="w-4 h-4 text-white" />
                      <span>GitHub Profile</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form Right */}
              <div className="lg:col-span-7 w-full">
                <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-bebas text-2xl sm:text-3xl mb-4">SEND A MESSAGE</h3>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs text-[#AAA498] block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-[#EAE4D7] focus:outline-none focus:border-[#EAE4D7]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#AAA498] block mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-[#EAE4D7] focus:outline-none focus:border-[#EAE4D7]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#AAA498] block mb-1">Message</label>
                      <textarea
                        rows="4"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project or opportunity..."
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-[#EAE4D7] focus:outline-none focus:border-[#EAE4D7]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#EAE4D7] text-black rounded-lg font-semibold text-sm hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-xs text-[#6E685E] flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-4 text-[#AAA498]">
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn
          </a>
          <span>•</span>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
            <Github className="w-3.5 h-3.5" /> GitHub
          </a>
        </div>
        <p>© 2026 B. Sridhar. Built with React & Tailwind CSS.</p>
      </footer>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1918] border border-white/15 rounded-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-[#AAA498] hover:text-white text-sm"
            >
              ✕
            </button>
            <h3 className="font-bebas text-3xl mb-2">{selectedProject.title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.tech.map((t, i) => (
                <span key={i} className="text-xs bg-white/10 px-2 py-0.5 rounded text-[#EAE4D7]">{t}</span>
              ))}
            </div>
            <ul className="text-xs text-[#AAA498] space-y-2 mb-6 list-disc list-inside">
              {selectedProject.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
            <div className="flex gap-3">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-[#EAE4D7] text-center font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="flex-1 py-2 bg-[#EAE4D7] text-black font-semibold text-xs rounded-lg"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 right-6 bg-[#1A1918] border border-[#EAE4D7] text-[#EAE4D7] px-4 py-2.5 rounded-lg text-xs shadow-2xl flex items-center gap-2 z-50 animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
