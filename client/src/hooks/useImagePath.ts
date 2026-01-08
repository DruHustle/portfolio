/**
 * Image Path Hook
 * Provides consistent image path resolution across the application
 * Implements DRY principle and handles GitHub Pages base path
 */

export function useImagePath(imagePath: string): string {
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl}${imagePath}`;
}

/**
 * Get profile image path
 */
export function useProfileImagePath(): string {
  return useImagePath('images/profile.jpg');
}
