import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '../components/ProjectCard';
import { BrowserRouter } from 'react-router-dom';

/**
 * Test Suite: ProjectCard Component
 * Validates card rendering and accessibility
 */
describe('ProjectCard Component', () => {
  const mockProps = {
    title: 'Test Project',
    subtitle: 'Test Subtitle',
    description: 'This is a test project description',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    link: '/projects/test',
    color: 'from-cyan-500 to-teal-500',
  };

  it('should render project card with title', () => {
    render(<ProjectCard {...mockProps} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('should render subtitle', () => {
    render(<ProjectCard {...mockProps} />);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('should render description', () => {
    render(<ProjectCard {...mockProps} />);
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
  });

  it('should render all technologies', () => {
    render(<ProjectCard {...mockProps} />);
    mockProps.technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('should have proper accessibility attributes', () => {
    render(<ProjectCard {...mockProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'View Test Project project details');
  });

  it('should have correct link href', () => {
    render(<ProjectCard {...mockProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockProps.link);
  });

  it('should render with correct styling classes', () => {
    const { container } = render(<ProjectCard {...mockProps} />);
    const card = container.querySelector('a');
    expect(card).toHaveClass('rounded-2xl', 'bg-white', 'border');
  });

  it('should handle empty technologies array', () => {
    render(<ProjectCard {...mockProps} technologies={[]} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('should render project label', () => {
    render(<ProjectCard {...mockProps} />);
    expect(screen.getByText('Project')).toBeInTheDocument();
  });
});
