import { ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { ReactNode } from 'react';

/**
 * ProjectCard Component
 * Reusable card component for displaying project information
 * Follows Single Responsibility Principle - only handles card presentation
 */

export interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  link: string;
  color: string;
  icon?: ReactNode;
}

export function ProjectCard({
  title,
  subtitle,
  description,
  technologies,
  link,
  color,
  icon,
}: ProjectCardProps) {
  return (
    <Link href={link}>
      <a
        className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-blue-100 hover:border-teal-500/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer will-change-transform"
        aria-label={`View ${title} project details`}
      >
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${color}`}></div>
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">
              Project
            </span>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm font-semibold text-teal-600 mb-4">{subtitle}</p>
          <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
}

export default ProjectCard;
