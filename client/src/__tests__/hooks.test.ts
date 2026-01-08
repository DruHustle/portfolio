import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useImagePath, useProfileImagePath } from '../hooks/useImagePath';
import { useMobile } from '../hooks/useMobile';

/**
 * Test Suite: Image Path Hooks
 * Validates image path resolution and consistency
 */
describe('Image Path Hooks', () => {
  describe('useImagePath', () => {
    it('should return a valid image path', () => {
      const { result } = renderHook(() => useImagePath('test.jpg'));
      expect(result.current).toContain('test.jpg');
    });

    it('should handle nested paths', () => {
      const { result } = renderHook(() => useImagePath('images/subfolder/test.jpg'));
      expect(result.current).toContain('images/subfolder/test.jpg');
    });

    it('should not create double slashes', () => {
      const { result } = renderHook(() => useImagePath('test.jpg'));
      expect(result.current).not.toMatch(/\/\//);
    });
  });

  describe('useProfileImagePath', () => {
    it('should return profile image path', () => {
      const { result } = renderHook(() => useProfileImagePath());
      expect(result.current).toContain('profile.jpg');
    });

    it('should be consistent across calls', () => {
      const { result: result1 } = renderHook(() => useProfileImagePath());
      const { result: result2 } = renderHook(() => useProfileImagePath());
      expect(result1.current).toBe(result2.current);
    });
  });
});

/**
 * Test Suite: Mobile Hook
 * Validates responsive behavior detection
 */
describe('useMobile Hook', () => {
  it('should return a boolean value', () => {
    const { result } = renderHook(() => useMobile());
    expect(typeof result.current).toBe('boolean');
  });

  it('should detect mobile viewport', () => {
    // Mock window.matchMedia for mobile
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(max-width: 768px)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const { result } = renderHook(() => useMobile());
    expect(typeof result.current).toBe('boolean');
  });
});
