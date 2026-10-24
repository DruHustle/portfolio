import { assetUrl } from "@/lib/urls";
/**
 * Image Path Hook
 * Provides consistent image path resolution across the application
 * Resolves images relative to the configured application base.
 */

export function useImagePath(imagePath: string): string {
  return assetUrl(imagePath);
}

/**
 * Get profile image path
 */
export function useProfileImagePath(): string {
  return useImagePath('images/profile.jpg');
}
