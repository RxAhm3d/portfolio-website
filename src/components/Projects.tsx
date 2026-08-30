import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Info, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { DeviceMockup } from './DeviceMockup';
import { trackChameleonEvent } from '../lib/chameleon';

interface Project {
  title: string;
  role: string;
  description: string;
  longDescription?: string[];
  securityFeatures?: string[];
  images?: string[];
  tags: string[];
  deviceType: 'mobile' | 'desktop';
  liveUrl: string | null;
  githubUrl: string | null;
}

export function Projects() {
  const projects: Project[] = [
    {
      title: 'FENNEQCM Mobile App',
      role: 'Lead Flutter Developer',
      description: 'Engineered a highly scalable Flutter codebase (+1k Downloads) using Clean Architecture and BLoC.',
      longDescription: [
        'Engineered a highly scalable Flutter codebase using feature-based Clean Architecture and BLoC, decoupling business logic across 15+ modules.',
        'Built a robust Dio Interceptor ecosystem featuring automated background JWT token refreshing and recursive request retries.',
        'Implemented flutter_quill for rich-text medical question authoring and custom FL Chart dashboards for real-time performance analytics.',
        'Established a multi-environment build pipeline (Dev/Prod flavors) using Kotlin DSL and Git-excluded signing keys.'
      ],
      securityFeatures: [
        'Flutter Secure Storage for encrypted credential management',
        'Automated JWT rotation & Zero-Trust interaction',
        'Secure multi-flavor build pipelines',
        'Input sanitization & Data integrity checks'
      ],
      tags: ['Flutter', 'Dart', 'Clean Architecture', 'BLoC', 'Dio', 'FL Chart'],
      deviceType: 'mobile' as const,
      liveUrl: 'https://play.google.com/store/apps/details?id=top.fenneqcm.app',
      githubUrl: null,
    },
    {
      title: 'FENNEQCM Backend Ecosystem',
      role: 'Backend Architect',
      description: 'Architected a NestJS Monorepo syncronizing Student API and Admin Content Manager on a single core engine.',
      longDescription: [
        'Architected a NestJS Monorepo that synchronized the Student API and Admin Content Manager, reducing maintenance overhead by 40%.',
        'Engineered a Zero-Trust identity system featuring Google OAuth 2.0 and JWT Access/Refresh rotation.',
        'Hardened persistence layer with custom Mongoose indexing for clinical case hierarchies.',
        'Automated transactional workflows using Nodemailer with Google OAuth2 to ensure 99.9% email deliverability.'
      ],
      securityFeatures: [
        'Google OAuth 2.0 Integration',
        'JWT Access/Refresh rotation system',
        'Strict RBAC decorators for 100+ specialties',
        'NoSQL Injection & XSS sanitization pipes'
      ],
      tags: ['NestJS', 'Node.js', 'MongoDB', 'Docker', 'Google OAuth', 'Cloudinary'],
      deviceType: 'desktop' as const,
      liveUrl: null,
      githubUrl: null,
    },
    {
      title: 'E-Commerce Core API',
      role: 'Security & Backend Engineer',
      description: 'Developed high-performance Generic Repository patterns with advanced security protocols.',
      longDescription: [
        'Developed a high-performance Generic Repository Pattern that abstracted complex Mongoose operations for high-speed pagination.',
        'Built a dual-channel MFA system using Twilio (SMS) and Nodemailer for account verification.',
        'Engineered a flexible discount engine and real-time inventory management logic to prevent stock race conditions.'
      ],
      securityFeatures: [
        'Dual-channel MFA (SMS & Email)',
        'One-way BCrypt password hashing',
        'Standardized global API response formatting',
        'Concurrency-safe inventory management'
      ],
      tags: ['Node.js', 'Express', 'Twilio MFA', 'MongoDB', 'Generic Repository'],
      deviceType: 'desktop' as const,
      liveUrl: null,
      githubUrl: 'https://github.com/RechidiAhmedAbdelaaziz/ECOMMERCE-BACKEND',
    },
    {
      title: 'Portfolio Website',
      role: 'Personal Project',
      description: 'Modern portfolio showcasing full-stack capabilities, security focus, and project history.',
      longDescription: [
        'Responsive React-based portfolio focusing on clean architecture and high-performance animations.',
        'Integrated dynamic project case studies with expanded security insights.',
        'Optimized for SEO and accessibility.'
      ],
      securityFeatures: [
        'Secure deployment with modern SSL/TLS',
        'Minimal external dependencies',
        'Environment variable protection'
      ],
      tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Motion'],
      deviceType: 'desktop' as const,
      liveUrl: 'https://rechidiahmed.me',
      githubUrl: 'https://github.com/RechidiAhmedAbdelaaziz/portfolio-website',
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-b from-background to-purple-500/5">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              My work
            </span>
            <h2 className="mb-4">Featured Projects</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project.images || [];
  const hasImages = images.length > 0;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full flex flex-col"
    >
      <Card className="flex-1 flex flex-col border-none bg-background/50 backdrop-blur-md shadow-xl hover:shadow-primary/20 transition-all duration-500 group overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-primary to-teal-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

        {hasImages && (
          <div className="shrink-0 relative overflow-hidden bg-muted/30 py-10 px-6 h-[300px] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative z-20 drop-shadow-2xl w-full max-w-[280px]">
              <DeviceMockup
                src={images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                type={project.deviceType}
                className="transition-all group-hover:scale-[1.05] group-hover:-rotate-1 duration-700"
              />
            </div>
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-background/80 blur-backdrop hover:bg-primary hover:text-white text-foreground p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-background/80 blur-backdrop hover:bg-primary hover:text-white text-foreground p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col p-8 pt-6 relative z-10 space-y-8">
          {/* Header Section */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              <p className="text-primary/70 font-semibold uppercase text-xs tracking-widest leading-none">
                {project.role}
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Impact Details */}
            {project.longDescription && (
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="h-[1px] w-4 bg-foreground/20"></span>
                  Key Achievements
                </h4>
                <ul className="space-y-3">
                  {project.longDescription.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed group/item">
                      <CheckCircle2 className="shrink-0 h-4 w-4 mt-0.5 text-teal-500/50 group-hover/item:text-teal-500 transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Security Architecture Overlay */}
            {project.securityFeatures && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/5 border border-cyan-500/20 shadow-inner group/security transition-all duration-500 hover:border-cyan-500/40">
                <h4 className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-4 w-4 animate-pulse" />
                  Security Protocol
                </h4>
                <ul className="grid grid-cols-1 gap-2.5">
                  {project.securityFeatures.map((feature, i) => (
                    <li key={i} className="text-xs font-medium text-foreground/70 flex items-center gap-2.5">
                      <div className="h-1 w-1 rounded-full bg-cyan-500/50 group-hover/security:bg-cyan-500 transition-colors" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer-aligned content */}
          <div className="mt-auto pt-4 space-y-6">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <Badge
                  key={tagIndex}
                  variant="outline"
                  className="bg-primary/5 hover:bg-primary hover:text-white transition-all duration-300 border-primary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 rounded-xl font-bold text-[10px] uppercase tracking-widest h-12" asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackChameleonEvent('project_live_opened', { project_title: project.title })}
                  >
                    Live Project <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" className="flex-1 border-primary/20 hover:bg-primary/5 backdrop-blur-sm rounded-xl font-bold text-[10px] uppercase tracking-widest h-12" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackChameleonEvent('project_source_opened', { project_title: project.title })}
                  >
                    View Source <Github className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
