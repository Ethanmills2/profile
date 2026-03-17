import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Shield, 
  Code2, 
  Cpu, 
  Globe, 
  Mail, 
  Github, 
  Linkedin, 
  MessageSquare, 
  ExternalLink, 
  ChevronRight,
  Download,
  Award,
  BookOpen,
  Briefcase,
  User,
  Layers,
  Zap,
  Phone,
  MapPin,
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Components ---

const Reveal = ({ children, delay = 0, y = 30 }: { children: React.ReactNode, delay?: number, y?: number, key?: React.Key }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "glass py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-neon-green rounded-lg flex items-center justify-center text-black">
            <Shield size={20} />
          </div>
          <span className="hidden sm:block">ETHAN<span className="text-neon-green">.</span>MILLS</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-white/70 hover:text-neon-green transition-all duration-300 ease-in-out relative group hover:scale-110"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-green transition-all duration-300 ease-in-out group-hover:w-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            </motion.a>
          ))}
          <motion.a
            href="/resume.pdf"
            download="Ethan_Ebo_Mills_Resume.pdf"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-2 rounded-full bg-neon-green text-black font-bold text-sm hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out flex items-center gap-2"
          >
            <Download size={16} /> RESUME
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-4 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-lg font-medium text-white/70 hover:text-neon-green hover:translate-x-2 transition-all duration-300 ease-in-out"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="/resume.pdf" 
                download="Ethan_Ebo_Mills_Resume.pdf"
                className="mt-2 px-6 py-3 rounded-xl bg-neon-green text-black font-bold text-center flex items-center justify-center gap-2"
              >
                <Download size={18} /> DOWNLOAD RESUME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const TypingText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return (
    <span className="text-neon-green min-h-[1.5em] inline-block">
      {texts[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Hero = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-electric-blue/10 rounded-full blur-[120px] animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-neon-green/20 text-xs font-bold tracking-widest text-neon-green mb-6"
          >
            <Zap size={14} /> AVAILABLE FOR PROJECTS
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            I'm <span className="text-white">Ethan Ebo Mills</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-white/70">
            <TypingText texts={['Cybersecurity Analyst', 'Frontend Developer', 'Problem Solver']} />
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-lg leading-relaxed">
            I design and build secure, high-performance web applications with modern technologies. Specializing in creating visually stunning and resilient digital experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects" 
              onClick={(e) => scrollToSection(e, '#projects')}
              className="px-8 py-4 rounded-xl bg-neon-green text-black font-bold hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:scale-105 transition-all flex items-center gap-2 group"
            >
              View My Work <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="/resume.pdf" 
              download="Ethan_Ebo_Mills_Resume.pdf"
              className="px-8 py-4 rounded-xl glass font-bold hover:bg-white/10 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all flex items-center gap-2"
            >
              Download CV <Download size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-neon-green/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border-2 border-neon-green/50 animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-green/20 to-electric-blue/20 rounded-full blur-2xl" />
            <div className="relative w-full h-full rounded-full glass neon-border overflow-hidden flex items-center justify-center group">
              <img 
                src="/profile.jpg" 
                alt="Ethan Ebo Mills" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="fallback-icon hidden">
                <User size={120} className="text-neon-green/50 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-8">
                <span className="text-xs font-mono tracking-widest text-neon-green">SECURE_PROFILE.EXE</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const cards = [
    {
      icon: <BookOpen className="text-neon-green" />,
      title: "Education",
      desc: "Computer Science student at University of Cape Coast, focusing on software engineering and security."
    },
    {
      icon: <Briefcase className="text-electric-blue" />,
      title: "Experience",
      desc: "Network Administration Intern at The Honda Place, managing IT systems and network infrastructure."
    },
    {
      icon: <Cpu className="text-purple-500" />,
      title: "Tech Stack",
      desc: "Proficient in Python, TypeScript, and modern frontend frameworks with a security-first mindset."
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-[0.3em] text-neon-green uppercase mb-2">ABOUT ME</h2>
            <h3 className="text-4xl md:text-5xl font-bold">Passion Meets <span className="text-neon-green">Innovation</span></h3>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <div className="glass p-8 rounded-3xl hover:neon-border hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all group h-full">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{card.title}</h4>
                <p className="text-white/60 leading-relaxed">{card.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-16 glass p-10 rounded-3xl border-neon-green/10">
            <p className="text-xl md:text-2xl text-center font-medium text-white/80 leading-relaxed italic">
              "I am a dedicated professional with a strong foundation in Computer Science and IT systems. My passion lies at the intersection of <span className="text-neon-green">Cybersecurity</span> and <span className="text-electric-blue">Frontend Development</span>, where I strive to build secure, scalable, and visually stunning web experiences."
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillGroups = [
    {
      category: "Frontend",
      skills: [
        { name: "HTML5", level: 75, icon: <Globe size={16} /> },
        { name: "CSS3 / Tailwind", level: 50, icon: <Layers size={16} /> },
        { name: "JavaScript", level: 50, icon: <Zap size={16} /> },
        { name: "TypeScript", level: 40, icon: <Code2 size={16} /> },
        { name: "React", level: 40, icon: <Cpu size={16} /> },
      ]
    },
    {
      category: "Programming & Security",
      skills: [
        { name: "Python", level: 60, icon: <Terminal size={16} /> },
        { name: "Network Security", level: 10, icon: <Shield size={16} /> },
        { name: "System Security", level: 30, icon: <Shield size={16} /> },
        { name: "Linux Basics", level: 10, icon: <Terminal size={16} /> },
      ]
    },
    {
      category: "Soft Skills",
      skills: [
        { name: "Team Leadership", level: 95, icon: <User size={16} /> },
        { name: "Problem Solving", level: 90, icon: <Zap size={16} /> },
        { name: "Communication", level: 85, icon: <MessageSquare size={16} /> },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-cyber-navy/30">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-sm font-bold tracking-[0.3em] text-neon-green uppercase mb-2">MY ARSENAL</h2>
              <h3 className="text-4xl md:text-5xl font-bold">Tech Stack & <span className="text-neon-green">Expertise</span></h3>
            </div>
            <p className="text-white/50 max-w-md text-right hidden md:block">
              Constantly evolving and learning new technologies to stay at the forefront of the digital landscape.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.1}>
              <div>
                <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-1 bg-neon-green rounded-full" />
                  {group.category}
                </h4>
                <div className="space-y-8">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="flex items-center gap-2 font-medium text-white/80 group-hover:text-neon-green transition-colors">
                          {skill.icon} {skill.name}
                        </span>
                        <span className="text-xs font-mono text-neon-green">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-neon-green to-electric-blue rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Red Carpet Events Centre",
      desc: "A premium event venue website for Accra's premier celebrations, featuring service showcases and booking integrations.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
      link: "https://ethanmills2.github.io/redcarpet-site/",
      github: "https://github.com/Ethanmills2/redcarpet-site"
    },
    {
      title: "Simple Café",
      desc: "A modern and cozy cafe website designed to showcase menus, location, and a warm neighborhood atmosphere.",
      tags: ["HTML", "CSS", "UI/UX", "Web Design"],
      image: "/cafe-cover.jpg",
      link: "https://ethanmills2.github.io/cafe-site/",
      github: "https://github.com/Ethanmills2/cafe-site"
    }
  ];

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-[0.3em] text-neon-green uppercase mb-2">Showcase Featured Projects</h2>
            <h3 className="text-4xl md:text-5xl font-bold">Featured <span className="text-neon-green">Projects</span></h3>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.1}>
              <div className="group relative glass rounded-3xl overflow-hidden hover:shadow-[0_0_40px_rgba(34,197,94,0.25)] transition-all h-full">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-neon-green text-black hover:scale-110 transition-transform"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-md bg-white/5 text-white/60 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-2xl font-bold mb-3 group-hover:text-neon-green transition-colors">{project.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{project.desc}</p>
                  <div className="flex gap-4">
                    <a href={project.link} className="text-sm font-bold flex items-center gap-1 text-neon-green hover:underline">
                      Live Demo <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      role: "Network Administration Intern",
      company: "The Honda Place",
      period: "Sep 2025 - Nov 2025",
      desc: "Supporting IT systems, managing network infrastructure, and ensuring seamless digital operations for a major automotive dealer."
    },
    {
      role: "President",
      company: "Debate Club",
      period: "Jan 2024 - Oct 2024",
      desc: "Coordinated team activities, organized competitions, and fostered a culture of critical thinking and public speaking."
    },
    {
      role: "Vice President",
      company: "CorpNation Foundation",
      period: "Jul 2023 - Oct 2024",
      desc: "Led sustainability projects and coordinated team efforts to drive community impact and environmental awareness."
    },
    {
      role: "Sergeant",
      company: "Infantry Cadet Corps",
      period: "Oct 2023 - Oct 2024",
      desc: "Demonstrated exceptional discipline and leadership, managing a platoon and coordinating training exercises."
    }
  ];

  return (
    <section id="experience" className="py-24 bg-cyber-navy/20">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-[0.3em] text-neon-green uppercase mb-2">JOURNEY</h2>
            <h3 className="text-4xl md:text-5xl font-bold">Work & <span className="text-neon-green">Leadership</span></h3>
          </div>
        </Reveal>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-green/30 to-transparent hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <Reveal key={exp.role} delay={i * 0.1}>
                <div className={cn(
                  "relative flex flex-col md:flex-row gap-8 items-center",
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                )}>
                  {/* Dot */}
                  <div className="absolute left-[-4px] md:left-1/2 md:ml-[-6px] w-3 h-3 rounded-full bg-neon-green shadow-[0_0_10px_rgba(34,197,94,1)] z-10 hidden md:block" />

                  <div className="w-full md:w-1/2">
                    <div className={cn(
                      "glass p-8 rounded-3xl hover:neon-border hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all",
                      i % 2 === 0 ? "md:text-left" : "md:text-right"
                    )}>
                      <span className="text-xs font-mono text-neon-green mb-2 block">{exp.period}</span>
                      <h4 className="text-xl font-bold mb-1">{exp.role}</h4>
                      <h5 className="text-sm font-medium text-white/50 mb-4">{exp.company}</h5>
                      <p className="text-white/60 text-sm leading-relaxed">{exp.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Globe className="text-neon-green" />,
      title: "Web Development",
      desc: "Building high-performance, responsive, and secure web applications using modern frameworks."
    },
    {
      icon: <Layers className="text-electric-blue" />,
      title: "Frontend UI Design",
      desc: "Creating visually stunning and intuitive user interfaces with a focus on user experience."
    },
    {
      icon: <Zap className="text-yellow-500" />,
      title: "Website Optimization",
      desc: "Improving site speed, SEO, and overall performance for a better digital presence."
    },
    {
      icon: <Shield className="text-red-500" />,
      title: "Cybersecurity Consulting",
      desc: "Providing basic security audits and implementing best practices for web systems."
    }
  ];

  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-[0.3em] text-neon-green uppercase mb-2">My Services</h2>
            <h3 className="text-4xl md:text-5xl font-bold">What I Can <span className="text-neon-green">Do For You</span></h3>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1}>
              <div className="glass p-8 rounded-3xl hover:neon-border hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all group h-full">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{service.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const education = [
    {
      degree: "BSc Computer Science",
      school: "University of Cape Coast",
      period: "2025 - Present",
      icon: <BookOpen className="text-neon-green" />
    },
    {
      degree: "High School Diploma",
      school: "Ghana Secondary Technical School",
      period: "2021 - 2024",
      icon: <Award className="text-electric-blue" />
    }
  ];

  const certifications = [
    {
      name: "Python for Beginners",
      issuer: "Udemy",
      icon: <Award className="text-yellow-500" />,
      link: "https://www.udemy.com/certificate/UC-5dedf61e-5481-4855-9404-fe7332a4464d/"
    },
    {
      name: "HTML & CSS Course",
      issuer: "Udemy",
      icon: <Award className="text-neon-green" />,
      link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-bc2a531f-64fe-4b69-8747-de688d67ab21.pdf"
    }
  ];

  return (
    <section id="education" className="py-24 bg-cyber-navy/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <Reveal>
              <h2 className="text-sm font-bold tracking-[0.3em] text-neon-green uppercase mb-2">Learning Path</h2>
              <h3 className="text-4xl font-bold mb-12">Education</h3>
            </Reveal>
            <div className="space-y-8">
              {education.map((edu, i) => (
                <Reveal key={edu.degree} delay={i * 0.1}>
                  <div className="flex gap-6 items-start glass p-6 rounded-2xl hover:neon-border hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all">
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center shrink-0">
                      {edu.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{edu.degree}</h4>
                      <p className="text-white/60">{edu.school}</p>
                      <p className="text-xs font-mono text-neon-green mt-2">{edu.period}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <h2 className="text-sm font-bold tracking-[0.3em] text-neon-green uppercase mb-2">Credentials</h2>
              <h3 className="text-4xl font-bold mb-12">Certifications</h3>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {certifications.map((cert, i) => (
                <Reveal key={cert.name} delay={i * 0.1}>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-6 rounded-2xl flex items-center gap-4 hover:neon-border hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] transition-all h-full"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      {cert.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{cert.name}</h4>
                      <p className="text-xs text-white/40">{cert.issuer}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    
    // WhatsApp link
    const whatsappMsg = `Hello Ethan, my name is ${name} (${email}). ${message}`;
    const whatsappUrl = `https://wa.me/233559329955?text=${encodeURIComponent(whatsappMsg)}`;
    
    // Mailto link
    const mailtoUrl = `mailto:ermills577@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;

    // Open both (browsers might block one, but we try)
    window.open(whatsappUrl, '_blank');
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green/5 rounded-full blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal>
            <div>
              <h2 className="text-sm font-bold tracking-[0.3em] text-neon-green uppercase mb-2">GET IN TOUCH</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8">Let's Build Something <span className="text-neon-green">Secure</span></h3>
              <p className="text-lg text-white/60 mb-12 leading-relaxed">
                Whether you have a question, a project idea, or just want to connect, feel free to reach out. I'm always open to discussing new opportunities.
              </p>

              <div className="space-y-6">
                <a href="mailto:ermills577@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:neon-border transition-all">
                    <Mail className="text-neon-green" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Email Me</p>
                    <p className="text-lg font-medium">ermills577@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:neon-border transition-all">
                    <MapPin className="text-neon-green" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Location</p>
                    <p className="text-lg font-medium">Ghana, Greater Accra, West Hills City</p>
                  </div>
                </div>
                <a href="https://wa.me/233559329955" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:neon-border transition-all">
                    <Phone className="text-neon-green" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold">WhatsApp</p>
                    <p className="text-lg font-medium">+233 55 932 9955</p>
                  </div>
                </a>
              </div>

              <div className="flex gap-4 mt-12">
                <a href="https://github.com/Ethanmills2" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-neon-green hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:scale-110 hover:-rotate-6 transition-all duration-500 ease-in-out">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/ethan-mills-475467326" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-neon-green hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:scale-110 hover:rotate-6 transition-all duration-500 ease-in-out">
                  <Linkedin size={20} />
                </a>
                <a href="https://wa.me/233559329955" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-neon-green hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:scale-110 hover:-rotate-6 transition-all duration-500 ease-in-out">
                  <MessageSquare size={20} />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} y={50}>
            <div className="glass p-10 rounded-3xl neon-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-green outline-none transition-all" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-green outline-none transition-all" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Message</label>
                  <textarea 
                    rows={5} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-green outline-none transition-all" 
                    placeholder="Tell me about your project..." 
                  />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl bg-neon-green text-black font-bold hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:scale-[1.02] transition-all">
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <Reveal>
          <div>
            <div className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-neon-green rounded flex items-center justify-center text-black">
                <Shield size={14} />
              </div>
              <span>ETHAN<span className="text-neon-green">.</span>MILLS</span>
            </div>
            <p className="text-sm text-white/40">Building secure and stunning web experiences, and Always Your Best Option</p>
          </div>
        </Reveal>
        
        <Reveal delay={0.1}>
          <div className="flex gap-8 text-sm font-medium text-white/40">
            <a href="#" className="hover:text-neon-green transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neon-green transition-colors">Terms of Service</a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Ethan Ebo Mills. All rights reserved.
          </p>
        </Reveal>
      </div>
    </footer>
  );
};

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setProgress((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60]">
      <div 
        className="h-full bg-neon-green shadow-[0_0_10px_rgba(34,197,94,1)] transition-all duration-100" 
        style={{ width: `${progress}%` }} 
      />
    </div>
  );
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 6 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] bg-cyber-black flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        <div className="w-24 h-24 border-4 border-neon-green/20 rounded-full animate-ping" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className="text-neon-green animate-pulse" size={40} />
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col items-center gap-4"
      >
        <div className="font-mono text-neon-green tracking-[0.5em] text-xs">
          INITIALIZING SECURE_PORTFOLIO...
        </div>
        <div className="text-white/60 text-sm font-medium animate-pulse">
          Welcome To My Portfolio Website
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isLoading]);

  return (
    <div className="relative font-sans selection:bg-neon-green selection:text-black">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <ScrollProgress />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />

      {/* Custom Cursor Glow Effect */}
      <motion.div 
        className="fixed top-0 left-0 w-64 h-64 bg-neon-green/10 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"
        animate={{
          x: cursorPos.x - 128,
          y: cursorPos.y - 128,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      />
    </div>
  );
}
