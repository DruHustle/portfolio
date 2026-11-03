/**
 * Custom Hook: useNavigationState
 * Manages navigation state for conditional UI elements
 * Follows Single Responsibility Principle
 */

import { useState, useEffect } from 'react';
import { NavigationService } from '@/services/navigationService';

export interface UseNavigationStateReturn {
  showBackButton: boolean;
}

/**
 * Hook to determine if "Back to Projects" button should be shown
 * @returns Object containing showBackButton boolean
 */
export function useNavigationState(): UseNavigationStateReturn {
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    // Initialize from referrer on mount
    NavigationService.initializeFromReferrer();
    
    // Check if user came from Featured Projects
    const fromFeaturedProjects = NavigationService.isFromFeaturedProjects();
    setShowBackButton(fromFeaturedProjects);
  }, []);

  return { showBackButton };
}
